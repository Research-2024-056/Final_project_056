from flask import Flask, request, jsonify
import pandas as pd
import joblib
from sklearn.preprocessing import OneHotEncoder
from flask_cors import CORS

# Load the trained model
model = joblib.load('ridge_regression_model.pkl')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the dataset
dataset_path = 'Durability-predictionDatset.xlsx'
df = pd.read_excel(dataset_path)

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

if __name__ == '__main__':
    app.run(debug=True)
