import datetime
import os, pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import requests
import pytz  # For timezone handling
from datetime import datetime, timedelta
from bson import ObjectId  # Import ObjectId


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


with open('data/standard scalar.pkl', 'rb') as f:
    sc = pickle.load(f)

with open('data/xgb.pickle', 'rb') as f:
    xgbr = pickle.load(f)

# MongoDB configuration
client = MongoClient("mongodb+srv://jmyasiru:yasi23292T@cluster0.hcsf2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")  # Replace with your MongoDB URI
db = client["Garment"]  # Replace with your database name
collection = db["Inventory"]  # Replace with your collection name

def inference(
            sample_json,
            fabric_type_dict = {
                        'Heavy' : 1,
                        'Medium' : 0,
                        },
            output_columns = [
                        'Take up Spring', 'Take up Rubber', 'Bobbin Case', 'Feed Dog',
                        'Presser Foot', 'Tension Assembly', 'Hook Assembly',
                        'Timing Components','Oil Filling','Dust Remove'
                        ]
            ):
        sample = np.array([[
                        fabric_type_dict[sample_json['Fabric_Type']],
                        sample_json['M_Year']
                        ]])
        sample = sc.transform(sample)
        sample = sample.astype(np.float32)
        prediction = xgbr.predict(sample)
        prediction = prediction.squeeze()
        prediction = prediction.astype(np.int32)
        
        res_dict = {}
        usageDict = sample_json['usageDict']
        for i in range(len(output_columns)):
                used_hours = usageDict[output_columns[i]]
                pred_hours = prediction[i] - used_hours 
                res_dict[output_columns[i]] = int(pred_hours)
        return res_dict
                
@app.route('/predict/<Inventory>', methods=['POST'])
def predict(Inventory):
    content = request.json
    res = inference(content)
     # Merge input data with prediction results
    merged_res = {**content, **res}

    # Remove usageDict from the response
    if 'usageDict' in merged_res:
        del merged_res['usageDict']
    
    collection = db[Inventory]
    result = collection.insert_one(merged_res)
    merged_res["_id"] = str(result.inserted_id)  # Convert ObjectId to string
    
    return jsonify(merged_res)

@app.route('/predictupdate/<Inventory>', methods=['POST'])
def predictandupdate(Inventory):
    content = request.json
    res = inference(content)
     # Merge input data with prediction results
    merged_res = {**content, **res}

    # Remove usageDict from the response
    if 'usageDict' in merged_res:
        del merged_res['usageDict']
    print(merged_res)
    return jsonify(merged_res)


@app.route('/collection/<Inventory>', methods=['POST'])
def create_document(Inventory):
    content = request.json
    collection = db[Inventory]
    result = collection.insert_one(content)
    return jsonify({"_id": str(result.inserted_id)})

@app.route('/collection/<Inventory>/working', methods=['GET'])
def get_non_empty_serials(Inventory):
    collection = db[Inventory]
    # Query to find documents where 'serial_no' is not empty
    results = collection.find({"status": "On"})
    # Convert the results to a list of dictionaries
    data = []
    for result in results:
        result["_id"] = str(result["_id"])  # Convert ObjectId to string
        data.append(result)
    return jsonify(data)

@app.route('/collection/<Inventory>/update', methods=['POST'])
def update_document(Inventory):
    collection = db[Inventory]

    # Get the values passed from the frontend in the request body
    data = request.json  # assuming JSON data is sent in the request
    serial_no = data.get('serial_no')  # serial_no for identifying the document
    column_name = data.get('column_name')  # column to be updated
    column_value = data.get('column_value')  # new value for the column

    print(serial_no,column_name,column_value)

    if not serial_no or not column_name or column_value is None:
        return jsonify({"error": "serial_no, column_name, and column_value are required"}), 400

    # Query to find the document to update using the serial_no
    result = collection.find_one({"Serial_No": serial_no})

    if result:
        # Update the specified column with the new value
        update_result = collection.update_one(
            {"Serial_No": serial_no},  # Filter to find the document
            {"$set": {column_name: column_value}}  # Update operation
        )

        if update_result.modified_count > 0:
            # Fetch the updated document to return it in the response
            updated_document = collection.find_one({"Serial_No": serial_no})
            updated_document["_id"] = str(updated_document["_id"])  # Convert ObjectId to string
            return jsonify(updated_document)
        else:
            return jsonify({"error": "Document was not updated. Please check your data."}), 400
    else:
        return jsonify({"error": "No matching document found"}), 404

@app.route('/collection/<Inventory>/maintenance-check', methods=['GET'])
def maintenance_check(Inventory):
    collection = db[Inventory]
    # Query to retrieve all documents
    results = collection.find()
    # List of output columns to check
    output_columns = [
        'Take up Spring', 'Take up Rubber', 'Bobbin Case', 'Feed Dog',
        'Presser Foot', 'Tension Assembly', 'Hook Assembly',
        'Timing Components', 'Oil Filling', 'Dust Remove'
    ]
    # Filtered results
    filtered_data = []
    for result in results:
        if any(result.get(col, 101) < 24 for col in output_columns):
            result["_id"] = str(result["_id"])  # Convert ObjectId to string
            filtered_data.append(result)
    return jsonify(filtered_data)

@app.route('/collection/<inventory>/all', methods=['GET'])
def all_machine(inventory):
    collection = db[inventory]
    # Query to retrieve all documents
    results = collection.find()
    data = []
    
    for result in results:
        # Flatten the data by merging usageDict into the main dictionary
        formatted_result = {
            "Brand": result.get("Brand", "Unknown"),
            "Type": result.get("Type", "Unknown"),
            "Fabric_Type": result.get("Fabric_Type", "Unknown"),
            "Serial_No": result.get("Serial_No", "Unknown"),
            "M_Year": result.get("M_Year", "Unknown"),
            "Take up Spring": result.get("Take up Spring", 0),
            "Take up Rubber": result.get("Take up Rubber", 0),
            "Bobbin Case": result.get("Bobbin Case", 0),
            "Feed Dog": result.get("Feed Dog", 0),
            "Presser Foot": result.get("Presser Foot", 0),
            "Tension Assembly": result.get("Tension Assembly", 0),
            "Hook Assembly": result.get("Hook Assembly", 0),
            "Timing Components": result.get("Timing Components", 0),
            "Oil Filling": result.get("Oil Filling", 0),
            "Dust Remove": result.get("Dust Remove", 0)
        }
        data.append(formatted_result)
    
    return jsonify(data)

# @app.route('/thingspeak/data', methods=['GET'])
# def get_thingspeak_data():
#     try:
#         # Define the API endpoint
#         url = "https://api.thingspeak.com/channels/2610806/feeds.json"
#         params = {
#             'api_key': 'S569XKBNZQF2J873',  # API key
#             'results': 1  # Number of results to retrieve
#         }

#         # Make a GET request to the API
#         response = requests.get(url, params=params)

#         # Check if the request was successful
#         if response.status_code == 200:
#             data = response.json()  # Convert the response to JSON format
#             return jsonify(data)  # Return the JSON response
#         else:
#             return jsonify({"error": "Failed to fetch data from ThingSpeak API"}), response.status_code

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route('/thingspeak/data', methods=['GET'])
# def get_thingspeak_data():
#     try:
#         # Define the API endpoint
#         url = "https://api.thingspeak.com/channels/2610806/feeds.json"
#         params = {
#             'api_key': 'S569XKBNZQF2J873',  # API key
#             'results': 1  # Number of results to retrieve
#         }

#         # Make a GET request to the API
#         response = requests.get(url, params=params)

#         # Check if the request was successful
#         if response.status_code == 200:
#             data = response.json()  # Convert the response to JSON format
            
#             # Extract the 'name' field from ThingSpeak data
#             name = data.get('channel', {}).get('name', None)
            
#             # Query MongoDB using the 'name' as Serial_No
#             if name:
#                 collection = db["Inventory"]  # Replace with your collection name
#                 mongo_results = list(collection.find({"Serial_No": name}))  # Find documents with matching Serial_No

#                 # Convert MongoDB ObjectId to string
#                 for result in mongo_results:
#                     result["_id"] = str(result["_id"])
                
#                 # Combine ThingSpeak data and MongoDB results
#                 result_data = {
#                     "thingspeak": data,
#                     "mongodb": mongo_results
#                 }
                
#                 return jsonify(result_data)  # Return the combined data as JSON response
#             else:
#                 return jsonify({"error": "No 'name' field found in ThingSpeak data"}), 400

#         else:
#             return jsonify({"error": "Failed to fetch data from ThingSpeak API"}), response.status_code

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

def serialize_mongodb_doc(doc):
    """Convert MongoDB document to JSON serializable format."""
    doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
    return doc

@app.route('/thingspeak/data', methods=['GET'])
def get_thingspeak_data():
    try:
        # Define the API endpoint
        url = "https://api.thingspeak.com/channels/2610806/feeds.json"
        params = {
            'api_key': 'S569XKBNZQF2J873',  # API key
            'results': 1  # Number of results to retrieve
        }
        print("done")
        # Make a GET request to the API
        response = requests.get(url, params=params)
        print(response)
        # Check if the request was successful
        if response.status_code == 200:
            data = response.json()  # Convert the response to JSON format
            print(data)
            # Extract the latest timestamp and field1 value from the ThingSpeak data
            latest_feed = data['feeds'][0]
            latest_time = datetime.strptime(latest_feed['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            field1_value = float(latest_feed['field1'])
            print(latest_time)
            # Determine the current time and calculate time difference
            now = datetime.utcnow()
            time_difference = now - latest_time
            print(time_difference)
            # Determine status based on the time difference and field1 value
            if time_difference <= timedelta(minutes=1) and field1_value > 220:
                status = "On"
                # Find the corresponding item in MongoDB based on the Serial_No
                serial_no = data['channel']['name']
                print(serial_no) 
                collection = db['Inventory']  # Replace with your collection name
                mongodb_result = collection.find_one({"Serial_No": serial_no})

                if mongodb_result:
                    # Convert all numeric fields to floats for safe arithmetic operations
                    updated_fields = {}
                    for field, value in mongodb_result.items():
                        if field not in ['_id', 'Serial_No', 'status', 'M_Year']:
                            try:
                                # Convert the value to float if possible
                                numeric_value = float(value)  # Convert to float
                                updated_fields[field] = numeric_value - (1 / 60)  # Subtract 1 minute in hours

                            except ValueError:
                                updated_fields[field] = value  # Keep the original value if conversion fails

                    # Update the status field and the reduced values in MongoDB
                    collection.update_one(
                        {"Serial_No": serial_no},
                        {"$set": {"status": status, **updated_fields}}
                    )

                    # Prepare the response with serialized MongoDB data
                    response_data = {
                        "mongodb": [serialize_mongodb_doc(mongodb_result)],
                        "thingspeak": data
                    }

                    return jsonify(response_data)

                else:
                    return jsonify({"error": "Serial number not found in MongoDB"}), 404
            else:
                # Handle the case where status is "Off"
                status = "Off"
                serial_no = data['channel']['name']
                print(serial_no) 
                collection = db['Inventory']  # Replace with your collection name
                mongodb_result = collection.find_one({"Serial_No": serial_no})
                 # Update the status field and the reduced values in MongoDB
                collection.update_one(
                        {"Serial_No": serial_no},
                        {"$set": {"status": status}}
                    )
                # Return a response indicating that the status is off
                return jsonify({"status": status, "message": "No recent data or value below threshold"}), 200
            

        else:
            return jsonify({"error": "Failed to fetch data from ThingSpeak API"}), response.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/collection/<Inventory>/delete', methods=['POST'])
def delete_serial_no(Inventory):
    #serial_no = request.args.get('serial_no')  # Get serial_no from query parameters
    data = request.json  # assuming JSON data is sent in the request
    serial_no = data.get('serial_no')  # serial_no for identifying the document
    print(serial_no)
    if not serial_no:
        return jsonify({"error": "serial_no parameter is required"}), 400
 
    collection = db[Inventory]
    result = collection.delete_many({"Serial_No": serial_no})
    print(result,serial_no)
 
    if result.deleted_count > 0:
        return jsonify({"message": f"Deleted {result.deleted_count} document(s) with serial_no: {serial_no}"}), 200
    else:
        return jsonify({"message": "No documents found with the specified serial_no"}), 404
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005, debug=True)