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
client = MongoClient("mongodb+srv://sajindu:saji1234@cluster0.bx77a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")  # Replace with your MongoDB URI
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
        if any(result.get(col, 101) < 100 for col in output_columns):
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
    
    print(data)  # Check the final flattened data
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

        # Make a GET request to the API
        response = requests.get(url, params=params)

        # Check if the request was successful
        if response.status_code == 200:
            data = response.json()  # Convert the response to JSON format
            
            # Extract the latest timestamp and field1 value from the ThingSpeak data
            latest_feed = data['feeds'][0]
            latest_time = datetime.strptime(latest_feed['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            field1_value = float(latest_feed['field1'])

            # Determine the current time and calculate time difference
            now = datetime.utcnow()
            time_difference = now - latest_time

            # Determine status based on the time difference and field1 value
            if time_difference <= timedelta(minutes=1) and field1_value > 220:
                status = "On"
                # Find the corresponding item in MongoDB based on the Serial_No
                serial_no = data['channel']['name']
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
                # Return a response indicating that the status is off
                return jsonify({"status": status, "message": "No recent data or value below threshold"}), 200

        else:
            return jsonify({"error": "Failed to fetch data from ThingSpeak API"}), response.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)