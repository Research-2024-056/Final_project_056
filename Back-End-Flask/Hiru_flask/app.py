from flask import Flask, request, jsonify
import pandas as pd
import joblib
from sklearn.preprocessing import OneHotEncoder
from flask_cors import CORS
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
import pickle

# Load the trained model
model = joblib.load('ridge_regression_model.pkl')

# Load the polynomial regression model

# Load the pre-trained polynomial regression model
with open('poly_reg_model1.pkl', 'rb') as file:
    poly, polymodel = pickle.load(file) 


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the dataset
dataset_path = 'Durability-predictionDatset.xlsx'
df = pd.read_excel(dataset_path)
file_path = 'Cost_Prediction_Fabric_Price_Dataset (1).xlsx'
fabric_df = pd.read_excel(file_path)

file_path_data = 'Cost_For_Threads (1).xlsx'
thread_df = pd.read_excel(file_path_data)
# Define the route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Get data from the request
    data = request.get_json()
    
    # Preprocess the input data
    input_data = pd.DataFrame(data)
    
    # Create a new OneHotEncoder and fit it to the categorical columns
    encoder = OneHotEncoder()
    encoder.fit(df[['Fiber Content', 'End Use']])
    
    # Encode the input data
    encoded_input = encoder.transform(input_data[['Fiber Content', 'End Use']]).toarray()
    
    # Make predictions
    predictions = model.predict(encoded_input)
    
    # Return the predictions
    return jsonify({'predictions': predictions.tolist()})

# Define endpoint to get all unique 'End Use'
@app.route('/get_end_use', methods=['GET'])
def get_end_use():
    end_use_values = df['End Use'].unique().tolist()
    return jsonify({'end_use_values': end_use_values})

# Define endpoint to get all unique 'Fiber Content'
@app.route('/get_fiber_content', methods=['GET'])
def get_fiber_content():
    fiber_content_values = df['Fiber Content'].unique().tolist()
    return jsonify({'fiber_content_values': fiber_content_values})

# Define a route to get fabrics and their durabilities for a given end use
@app.route('/get_fabrics_for_end_use', methods=['POST'])
def get_fabrics_for_end_use():
    # Get the end use from the request
    data = request.get_json()
    end_use = data.get('end_use')  # Extract end use from the JSON data
    
    # Filter the dataset for the given end use
    filtered_df = df[df['End Use'].isin([end_use])]  # Pass end use as a list
    
    # Return fabrics and their durabilities for the given end use
    fabrics_durabilities = filtered_df[['Fiber Content', 'Durability','Thread 1','Thread 2','Thread 3']].to_dict(orient='records')
    return jsonify({'fabrics_durabilities': fabrics_durabilities})

def parse_user_input(user_input):
    try:
        data = [item.split(':') for item in user_input.split(',')]
        years = np.array([int(year) for year, _ in data]).reshape(-1, 1)
        prices = np.array([float(price) for _, price in data])
        return years, prices
    except ValueError as e:
        raise ValueError("Invalid input format. Please provide input in 'year:price' format separated by commas.")
@app.route('/predict_futurePrice', methods=['POST'])
def predict_future_price():
    try:
        # Get data from POST request
        data = request.json
        user_input = data['input']

        # Parse user input
        years, prices = parse_user_input(user_input)

        # Transform and predict
        years_poly = poly.transform(years)
        polymodel.fit(years_poly, prices)  # Fit the model on the input data

        future_years = np.array([2025, 2026, 2027]).reshape(-1, 1)
        future_years_poly = poly.transform(future_years)
        future_prices = polymodel.predict(future_years_poly)

        # Prepare response
        predictions = {f'Y{year}': price for year, price in zip([2025, 2026, 2027], future_prices)}
        return jsonify(predictions), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400

    except Exception as e:
        return jsonify({"error": "An error occurred: " + str(e)}), 400

@app.route('/get_fabric_prices', methods=['GET'])
def get_fabric_prices():
    fabric_name = request.args.get('Fabric')
    
    # Find the row corresponding to the fabric name
    result = fabric_df[fabric_df['Fabric'] == fabric_name]
    
    # If the fabric is found, return the prices as a dictionary
    if not result.empty:
        prices = result.iloc[0, 1:].to_dict()
        return jsonify(prices)
    else:
        return jsonify({"error": "Fabric not found"}), 404

@app.route('/get_thread_prices', methods=['GET'])
def get_thread_prices():
    thread_name = request.args.get('Thread')
    
    # Find the row corresponding to the fabric name
    result = thread_df[thread_df['Thread'] == thread_name]
    
    # If the fabric is found, return the prices as a dictionary
    if not result.empty:
        prices = result.iloc[0, 1:].to_dict()
        return jsonify(prices)
    else:
        return jsonify({"error": "Thread not found"}), 404

@app.route('/load_all_fabric_data', methods=['GET'])
def load_all_fabric_data():
    # Convert the DataFrame to a dictionary and return it
    data = fabric_df.to_dict(orient='records')
    return jsonify(data)

@app.route('/load_all_thread_data', methods=['GET'])
def load_all_thread_data():
    # Convert the DataFrame to a dictionary and return it
    data = thread_df.to_dict(orient='records')
    return jsonify(data)



if __name__ == '__main__':
   app.run(host='0.0.0.0', port=5001, debug=True)
