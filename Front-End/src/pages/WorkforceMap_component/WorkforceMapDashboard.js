import React, { useState, useEffect } from 'react';
import PageMain from '../../components/PageMain';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid, Box, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function WorkforceMapDashboard() {
  const [evolutionData, setEvolutionData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    // Fetch average evolution data
    axios.get('http://localhost:5000/evolution_averages')
      .then(response => {
        const data = response.data;
        const formattedData = Object.keys(data).map(key => ({
          evolution: key,
          average: data[key]
        }));
        setEvolutionData(formattedData);
      })
      .catch(error => {
        console.error('There was an error fetching the evolution data!', error);
      });

    // Fetch employees for the dropdown
    axios.get('http://localhost:5000/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employee data!', error);
      });
  }, []);

  // Handle employee selection
  const handleEmployeeChange = (event) => {
    const emp_no = event.target.value;
    setSelectedEmployee(emp_no);

    if (emp_no) {
      axios.get(`http://localhost:5000/employee_performance/${emp_no}`)
        .then(response => {
          const data = response.data;
          const formattedData = Object.keys(data).map(key => ({
            evolution: key,
            average: data[key]
          }));
          setEvolutionData(formattedData);
        })
        .catch(error => {
          console.error('There was an error fetching the employee evolution data!', error);
        });
    } else {
      // Re-fetch the average evolution data if no employee is selected
      axios.get('http://localhost:5000/evolution_averages')
        .then(response => {
          const data = response.data;
          const formattedData = Object.keys(data).map(key => ({
            evolution: key,
            average: data[key]
          }));
          setEvolutionData(formattedData);
        })
        .catch(error => {
          console.error('There was an error fetching the evolution data!', error);
        });
    }
  };

  return (
    <PageMain>
      <Typography
        sx={{
          lineHeight: 1,
          fontWeight: "500",
          fontSize: "1.625rem",
          fontFamily: "Poppins",
          color: '#3f51b5',
          marginBottom: '20px'
        }}
      >
        Workforce-Map Dashboard
      </Typography>

      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginBottom: "30px" }}>
          <Grid item xs={12} sm={4}>
            <Button
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: '12px',
                backgroundColor: '#e3f2fd',
                '&:hover': {
                  backgroundColor: '#bbdefb'
                },
                color: '#3f51b5',
                fontWeight: 'bold'
              }}
              variant="outlined"
              href='/LaborEfficiencyAnalysis'
              endIcon={<ArrowOutwardIcon />}
            >
              Labor Efficiency Analysis
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: '12px',
                backgroundColor: '#e8f5e9',
                '&:hover': {
                  backgroundColor: '#c8e6c9'
                },
                color: '#4caf50',
                fontWeight: 'bold'
              }}
              variant="outlined"
              href='/LookUpPerformance'
              endIcon={<ArrowOutwardIcon />}
            >
              Lookup Performance
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: '12px',
                backgroundColor: '#f3e5f5',
                '&:hover': {
                  backgroundColor: '#e1bee7'
                },
                color: '#9c27b0',
                fontWeight: 'bold'
              }}
              variant="outlined"
              href='/DynamicSeatPlanner'
              endIcon={<ArrowOutwardIcon />}
            >
              Dynamic Seat Planner
            </Button>
          </Grid>
        </Grid>

        {/* Employee Selection Dropdown */}
        <FormControl fullWidth sx={{ marginBottom: '30px' }}>
          <InputLabel id="employee-select-label">Select Employee</InputLabel>
          <Select
            labelId="employee-select-label"
            value={selectedEmployee}
            label="Select Employee"
            onChange={handleEmployeeChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {employees.map(employee => (
              <MenuItem key={employee.Emp_No} value={employee.Emp_No}>
                {employee.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ width: '100%', marginTop: '30px' }}>
          <Typography
            sx={{
              lineHeight: 1,
              fontWeight: "500",
              fontSize: "1.25rem",
              fontFamily: "Poppins",
              color: '#424242',
              marginBottom: '20px'
            }}
          >
            {selectedEmployee ? `Performance for Employee - ${selectedEmployee}` : 'Average Performance per Evolution'}
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={evolutionData}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                dataKey="evolution"
                label={{ value: 'Evolution Stages', position: 'insideBottomRight', offset: -10, fill: '#424242' }}
                tick={{ fill: '#424242' }}
              />
              <YAxis
                label={{ value: 'Performance', angle: -90, position: 'insideLeft', fill: '#424242' }}
                tick={{ fill: '#424242' }}
              />
              <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '10px', border: 'none' }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="average"
                stroke="#3f51b5"
                strokeWidth={3}
                dot={{ r: 6, fill: '#3f51b5' }}
                activeDot={{ r: 8 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </PageMain>
  );
}

export default WorkforceMapDashboard;
