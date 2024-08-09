from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS, cross_origin
import csv

app = Flask(__name__)
CORS(app)

# Load the saved model
model = joblib.load('random_forest_model.pkl')

# Load the dataset
data = pd.read_csv('Employee_Evolution.csv')

# Prediction
@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    data = request.get_json()
    try:
        input_df = pd.DataFrame({
            'Evolution_01': [data['Evolution_01']],
            'Evolution_02': [data['Evolution_02']],
            'Evolution_03': [data['Evolution_03']],
            'Evolution_04': [data['Evolution_04']],
            'Evolution_05': [data['Evolution_05']]
        })
        app.logger.info(f'Parsed DataFrame: {input_df}')
        predicted_next_performance = model.predict(input_df)
        return jsonify({'predicted_next_performance': predicted_next_performance[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Pass csv data
@app.route('/data')
def get_data():
    data = []
    with open('Employee_Evolution.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            data.append(row)
    return jsonify(data)

# Get ID's
@app.route('/get_emp_no', methods=['GET'])
def get_emp_no():
    emp_nos = data['Emp_No'].unique().tolist()
    return jsonify({'Emp_No': emp_nos})

# Get employee name by Emp_No
def get_employee_name(Emp_No):
    employee = data[data['Emp_No'] == Emp_No]
    if not employee.empty:
        return employee.iloc[0]['Name']
    else:
        return None

@app.route('/get_employee_name', methods=['POST'])
def get_employee_name_endpoint():
    Emp_No = request.json['Emp_No']
    Name = get_employee_name(Emp_No)
    if Name:
        return jsonify({'Name': Name})
    else:
        return jsonify({'error': 'Employee not found'}), 404


@app.route('/insert', methods=['POST'])
def insert():
    emp_no = request.json['Emp_No']
    new_evolution = request.json['Last_Evolution']
    
    # Find the employee row
    employee = data[data['Emp_No'] == emp_no]

    if not employee.empty:
        employee_index = employee.index[0]

       # Shift evolution columns to the left
        data.at[employee_index, 'Evolution_01'] = data.at[employee_index, 'Evolution_02']
        data.at[employee_index, 'Evolution_02'] = data.at[employee_index, 'Evolution_03']
        data.at[employee_index, 'Evolution_03'] = data.at[employee_index, 'Evolution_04']
        data.at[employee_index, 'Evolution_04'] = data.at[employee_index, 'Evolution_05']
        data.at[employee_index, 'Evolution_05'] = data.at[employee_index, 'Last_Evolution']
        
        # Insert the new value into Last_Evolution
        data.at[employee_index, 'Last_Evolution'] = new_evolution
        
        # Save the updated DataFrame back to the CSV
        data.to_csv('Employee_Evolution.csv', index=False)
        return jsonify({'message': 'Data inserted and evolutions shifted successfully!'})
    else:
        return jsonify({'error': 'Employee not found'}), 404



if __name__ == '__main__':
    app.run(debug=True)
