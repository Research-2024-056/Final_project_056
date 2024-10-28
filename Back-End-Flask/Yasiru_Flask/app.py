import datetime
import os
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import requests
from datetime import datetime, timedelta
from bson import ObjectId
from apscheduler.schedulers.background import BackgroundScheduler
import logging
import atexit

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Load models
with open('data/standard scalar.pkl', 'rb') as f:
    sc = pickle.load(f)

with open('data/xgb.pickle', 'rb') as f:
    xgbr = pickle.load(f)

# MongoDB configuration
# It's recommended to use environment variables for sensitive information
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb+srv://jmyasiru:yasi23292T@cluster0.hcsf2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
client = MongoClient(MONGODB_URI)
db = client["Garment"]

OUTPUT_COLUMNS = [
    'Take up Spring', 'Take up Rubber', 'Bobbin Case', 'Feed Dog',
    'Presser Foot', 'Tension Assembly', 'Hook Assembly',
    'Timing Components', 'Oil Filling', 'Dust Remove'
]

# Utility functions
def convert_hours_to_hours_minutes(hours_value):
    negative = hours_value < 0
    abs_hours_value = abs(hours_value)
    hours = int(abs_hours_value)
    minutes = int(round((abs_hours_value - hours) * 60))
    if minutes >= 60:
        hours += 1
        minutes -= 60
    formatted_time = f"{hours}.{minutes:02d}"
    return f"-{formatted_time}" if negative else formatted_time

def convert_hours_minutes_to_float(hours_minutes_str):
    try:
        if isinstance(hours_minutes_str, (int, float)):
            return float(hours_minutes_str)
        negative = hours_minutes_str.startswith('-')
        if negative:
            hours_minutes_str = hours_minutes_str[1:]
        hours_part, minutes_part = hours_minutes_str.split('.')
        hours = int(hours_part)
        minutes = int(minutes_part)
        total_hours = hours + minutes / 60.0
        return -total_hours if negative else total_hours
    except (ValueError, AttributeError):
        return 0.0

def process_hours_minutes(data, fields):
    if isinstance(data, dict):
        new_data = {}
        for k, v in data.items():
            if k in fields:
                if isinstance(v, (float, int)):
                    new_data[k] = convert_hours_to_hours_minutes(v)
                elif isinstance(v, str):
                    try:
                        float(v)
                        new_data[k] = v
                    except ValueError:
                        new_data[k] = '0.00'
                else:
                    new_data[k] = '0.00'
            else:
                new_data[k] = process_hours_minutes(v, fields)
        return new_data
    elif isinstance(data, list):
        return [process_hours_minutes(element, fields) for element in data]
    else:
        return data

def inference(sample_json, fabric_type_dict={'Heavy': 1, 'Medium': 0}, output_columns=OUTPUT_COLUMNS):
    sample = np.array([[fabric_type_dict.get(sample_json.get('Fabric_Type', 'Medium'), 0), sample_json.get('M_Year', 0)]])
    sample = sc.transform(sample).astype(np.float32)
    prediction = xgbr.predict(sample).squeeze()

    res_dict = {}
    usageDict = sample_json.get('usageDict', {})
    for i in range(len(output_columns)):
        used_hours = usageDict.get(output_columns[i], 0)
        pred_hours = prediction[i] - used_hours 
        res_dict[output_columns[i]] = convert_hours_to_hours_minutes(pred_hours)
    return res_dict

def adjust_numeric_value(doc):
    for field in OUTPUT_COLUMNS:
        numeric_value = convert_hours_minutes_to_float(doc.get(field, "0.00"))
        # Subtract exactly 1 minute (1/60 hours)
        adjusted_value = numeric_value - (1 / 60)
        # **Allow negative values by removing the clamp to zero**
        # adjusted_value = max(adjusted_value, 0)  # This line has been removed/commented out
        doc[field] = convert_hours_to_hours_minutes(adjusted_value)
    return doc

def serialize_mongodb_doc(doc):
    serialized_doc = {}
    for key, value in doc.items():
        if isinstance(value, ObjectId):
            serialized_doc[key] = str(value)
        elif isinstance(value, datetime):
            serialized_doc[key] = value.isoformat() + 'Z'  # ISO format with UTC timezone
        else:
            serialized_doc[key] = value
    return serialized_doc

# Routes
@app.route('/predict/<Inventory>', methods=['POST'])
def predict(Inventory):
    content = request.json
    res = inference(content)
    merged_res = {**content, **res}

    if 'usageDict' in merged_res:
        del merged_res['usageDict']

    for field in OUTPUT_COLUMNS:
        if field not in merged_res:
            merged_res[field] = '0.00'

    # Initialize 'last_updated' field
    merged_res["last_updated"] = datetime.utcnow()

    collection = db[Inventory]
    result = collection.insert_one(merged_res)
    merged_res["_id"] = str(result.inserted_id)
    merged_res = process_hours_minutes(merged_res, OUTPUT_COLUMNS)

    return jsonify(merged_res)

@app.route('/predictupdate/<Inventory>', methods=['POST'])
def predictandupdate(Inventory):
    content = request.json
    res = inference(content)
    merged_res = {**content, **res}

    if 'usageDict' in merged_res:
        del merged_res['usageDict']

    merged_res = process_hours_minutes(merged_res, OUTPUT_COLUMNS)

    # Note: This route does not save to the database. If needed, implement saving logic here.
    return jsonify(merged_res)

@app.route('/collection/<Inventory>', methods=['POST'])
def create_document(Inventory):
    content = request.json

    for field in OUTPUT_COLUMNS:
        if field not in content:
            content[field] = '0.00'

    # Initialize 'last_updated' field
    content["last_updated"] = datetime.utcnow()

    collection = db[Inventory]
    result = collection.insert_one(content)
    response = {"_id": str(result.inserted_id)}
    return jsonify(response)

@app.route('/collection/<Inventory>/working', methods=['GET'])
def get_non_empty_serials(Inventory):
    collection = db[Inventory]
    results = collection.find({"status": "On"})
    data = []

    for result in results:
        # Removed the update operation to keep this route read-only
        result["_id"] = str(result["_id"])
        result = process_hours_minutes(result, OUTPUT_COLUMNS)
        data.append(result)

    return jsonify(data)

@app.route('/collection/<Inventory>/maintenance-check', methods=['GET'])
def maintenance_check(Inventory):
    collection = db[Inventory]
    results = collection.find()
    filtered_data = []
    for result in results:
        for col in OUTPUT_COLUMNS:
            value_str = result.get(col, '101.00')
            total_hours = convert_hours_minutes_to_float(value_str)
            if total_hours < 24:
                result["_id"] = str(result["_id"])
                result = process_hours_minutes(result, OUTPUT_COLUMNS)
                filtered_data.append(result)
                break
    return jsonify(filtered_data)

@app.route('/collection/<inventory>/all', methods=['GET'])
def all_machine(inventory):
    collection = db[inventory]
    results = collection.find()
    data = []
    
    for result in results:
        formatted_result = {
            "Brand": result.get("Brand", "Unknown"),
            "Type": result.get("Type", "Unknown"),
            "Fabric_Type": result.get("Fabric_Type", "Unknown"),
            "Serial_No": result.get("Serial_No", "Unknown"),
            "M_Year": result.get("M_Year", "Unknown"),
            **{field: result.get(field, "0.00") for field in OUTPUT_COLUMNS},
            "status": result.get("status", "Off")
        }
        formatted_result = process_hours_minutes(formatted_result, OUTPUT_COLUMNS)
        data.append(formatted_result)
    
    return jsonify(data)

@app.route('/collection/<Inventory>/delete', methods=['POST'])
def delete_serial_no(Inventory):
    data = request.json
    serial_no = data.get('serial_no')
    if not serial_no:
        return jsonify({"error": "serial_no parameter is required"}), 400
 
    collection = db[Inventory]
    result = collection.delete_many({"Serial_No": serial_no})
 
    if result.deleted_count > 0:
        return jsonify({"message": f"Deleted {result.deleted_count} document(s) with serial_no: {serial_no}"}), 200
    else:
        return jsonify({"message": "No documents found with the specified serial_no"}), 404

@app.route('/collection/<Inventory>/update', methods=['POST'])
@cross_origin()  # Handles CORS preflight requests
def update_document(Inventory):
    collection = db[Inventory]
    data = request.json
    serial_no = data.get('serial_no')
    column_name = data.get('column_name')
    column_value = data.get('column_value')

    if not serial_no or not column_name or column_value is None:
        return jsonify({"error": "serial_no, column_name, and column_value are required"}), 400

    result = collection.find_one({"Serial_No": serial_no})

    if result:
        update_result = collection.update_one(
            {"Serial_No": serial_no},
            {"$set": {column_name: column_value}}
        )

        if update_result.modified_count > 0:
            updated_document = collection.find_one({"Serial_No": serial_no})
            updated_document["_id"] = str(updated_document["_id"])
            updated_document = process_hours_minutes(updated_document, OUTPUT_COLUMNS)
            return jsonify(updated_document)
        else:
            return jsonify({"error": "Document was not updated. Please check your data."}), 400
    else:
        return jsonify({"error": "No matching document found"}), 404

# Removed the '/thingspeak/data' GET route to prevent unintended data updates on page refresh

# Background Tasks
def update_last_updated():
    try:
        logging.info("Starting 'last_updated' update task.")
        # Iterate through all collections in the 'Garment' database
        for inventory_collection_name in db.list_collection_names():
            collection = db[inventory_collection_name]
            results = collection.find({"status": "On"})
            for result in results:
                last_updated = result.get("last_updated", datetime.utcnow())
                time_diff = datetime.utcnow() - last_updated
                minutes_passed = time_diff.total_seconds() / 60

                # Ensure that at least 1 minute has passed to prevent multiple subtractions
                if minutes_passed >= 1:
                    logging.info(f"Updating document ID: {result['_id']}, Minutes Passed: {minutes_passed:.2f}")

                    # Adjust numeric values by exactly 1 minute
                    adjusted_doc = adjust_numeric_value(result)

                    # Update 'last_updated' field and adjusted fields
                    update_fields = {"last_updated": datetime.utcnow()}
                    for field in OUTPUT_COLUMNS:
                        update_fields[field] = adjusted_doc[field]

                    update_result = collection.update_one(
                        {"_id": result["_id"]},
                        {"$set": update_fields}
                    )

                    if update_result.modified_count > 0:
                        logging.info(f"Successfully updated document ID: {result['_id']}")
                    else:
                        logging.warning(f"No changes made to document ID: {result['_id']}")
        logging.info("Successfully completed 'last_updated' update task.")
    except Exception as e:
        logging.error(f"Error updating 'last_updated': {e}")

def fetch_and_update_thingspeak_data():
    try:
        logging.info("Starting ThingSpeak data fetch and update task.")
        url = "https://api.thingspeak.com/channels/2610806/feeds.json"
        params = {'api_key': 'S569XKBNZQF2J873', 'results': 1}
        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()
            latest_feed = data['feeds'][0]
            latest_time = datetime.strptime(latest_feed['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            field1_value = float(latest_feed['field1'])
            now = datetime.utcnow()
            time_difference = now - latest_time

            serial_no = data['channel']['name']
            collection = db['Inventory']
            mongodb_result = collection.find_one({"Serial_No": serial_no})

            if time_difference <= timedelta(minutes=1) and field1_value > 220:
                status = "On"
                if mongodb_result:
                    # Subtract exactly 1 minute from each relevant field
                    mongodb_result = adjust_numeric_value(mongodb_result)

                    # Update status and last_updated
                    mongodb_result["status"] = status
                    mongodb_result["last_updated"] = datetime.utcnow()

                    collection.update_one(
                        {"_id": mongodb_result["_id"]},
                        {"$set": mongodb_result}
                    )

                    logging.info(f"Updated ThingSpeak data for Serial_No: {serial_no}")
                else:
                    logging.warning("Serial number not found in MongoDB")
            else:
                # Handle the case where status is "Off"
                status = "Off"
                if mongodb_result:
                    collection.update_one(
                        {"Serial_No": serial_no},
                        {"$set": {"status": status}}
                    )
                logging.info("ThingSpeak data indicates status 'Off' or data is outdated.")
        else:
            logging.error("Failed to fetch data from ThingSpeak API")
    except Exception as e:
        logging.error(f"Exception in fetch_and_update_thingspeak_data: {e}")

# Background task to update 'last_updated' every minute and fetch ThingSpeak data every minute
def start_scheduler():
    scheduler = BackgroundScheduler()
    # Schedule 'update_last_updated' to run every minute
    scheduler.add_job(func=update_last_updated, trigger="interval", minutes=1, next_run_time=datetime.utcnow())
    # Schedule 'fetch_and_update_thingspeak_data' to run every minute
    scheduler.add_job(func=fetch_and_update_thingspeak_data, trigger="interval", minutes=1, next_run_time=datetime.utcnow())
    scheduler.start()
    logging.info("APScheduler started and scheduled to run 'update_last_updated' and 'fetch_and_update_thingspeak_data' every minute.")

    # Ensure scheduler shuts down when the application exits
    atexit.register(lambda: scheduler.shutdown())
    logging.info("APScheduler shutdown will be handled on application exit.")

if __name__ == '__main__':
    # Only initialize the scheduler in the child process (actual running app)
    if os.environ.get("WERKZEUG_RUN_MAIN") == "true":
        start_scheduler()

    app.run(host='0.0.0.0', port=5005, debug=True)
