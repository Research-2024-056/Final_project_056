import React, { useState, useEffect } from "react";
import PageMain from "../../components/PageMain";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

function WorkforceMapDashboard() {
  const [evolutionData, setEvolutionData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employeePerformanceData, setEmployeePerformanceData] = useState([]);
  const [gap, setGap] = useState(null);
  const [employeeEvolutionData, setEmployeeEvolutionData] = useState([]);

  useEffect(() => {
    // Fetch average evolution data
    axios
      .get("http://localhost:5010/evolution_averages")
      .then((response) => {
        const data = response.data;
        const formattedData = Object.keys(data).map((key) => ({
          evolution: key,
          average: parseFloat(data[key]).toFixed(5), 
        }));
        setEvolutionData(formattedData);
      })
      .catch((error) => {
        console.error("There was an error fetching the evolution data!", error);
      });

    // Fetch employees for the dropdown
    axios
      .get("http://localhost:5010/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the employee data!", error);
      });
  }, []);

  const handleEmployeeChange = (event) => {
    const emp_no = event.target.value;
    setSelectedEmployee(emp_no);

    if (emp_no) {
      // Fetch employee's specific evolution data
      axios
        .get(`http://localhost:5010/employee_performance/${emp_no}`)
        .then((response) => {
          const data = response.data;
          const formattedData = Object.keys(data).map((key) => ({
            evolution: key,
            value: data[key],
          }));
          setEmployeeEvolutionData(formattedData);
        })
        .catch((error) => {
          console.error("Error fetching employee evolution data!", error);
        });

      // Fetch employee's performance data for the second chart
      axios
        .get(`http://localhost:5010/predict_performance/${emp_no}`)
        .then((response) => {
          let { predicted_performance, Actual_performance } = response.data;

          predicted_performance = parseFloat(predicted_performance).toFixed(3);
          const gapValue = (Actual_performance - predicted_performance).toFixed(
            3
          );
          setGap(gapValue);
          const formattedData = [
            {
              name: "Performance",
              predicted_performance: parseFloat(predicted_performance),
              Actual_performance,
            },
          ];
          setEmployeePerformanceData(formattedData); // Update the second graph's data
        })
        .catch((error) => {
          console.error("Error fetching employee performance data!", error);
        });
    } else {
      setEmployeeEvolutionData([]);
      setEmployeePerformanceData([]);
      setGap(null);
    }
  };

  return (
    <PageMain>
      <Typography
        sx={{
          lineHeight: 1,
          fontWeight: "500",
          fontSize: { xs: "1.25rem", sm: "1.625rem" }, // Adjust font size for small screens
          fontFamily: "Poppins",
          color: "#3f51b5",
          marginBottom: "40px",
          marginTop: "20px",
          textAlign: "center", // Center the text on small screens
        }}
      >
        Workforce-Map Dashboard
      </Typography>

      <Box sx={{ width: "100%", margin: "0 auto" }}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ marginBottom: "30px" }}
        >
          <Grid item xs={12} sm={4}>
            <Button
              sx={{ width: "100%", height: "100%" }}
              variant="outlined"
              href="/LaborEfficiencyAnalysis"
              endIcon={<ArrowOutwardIcon />}
            >
              Labor Efficiency Analysis
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              sx={{ width: "100%", height: "100%" }}
              variant="outlined"
              href="/LookUpPerformance"
              endIcon={<ArrowOutwardIcon />}
            >
              Lookup Performance
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              sx={{ width: "100%", height: "100%" }}
              variant="outlined"
              href="/DynamicSeatPlanner"
              endIcon={<ArrowOutwardIcon />}
            >
              Dynamic Seat Planner
            </Button>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={8}>
            <Typography
              sx={{
                lineHeight: 1,
                fontWeight: "500",
                fontSize: { xs: "1rem", sm: "1.25rem" }, // Adjust font size for small screens
                fontFamily: "Poppins, sans-serif",
                color: "#424242",
                textAlign: { xs: "center", sm: "left" }, // Center text on mobile
              }}
            >
              {selectedEmployee
                ? `Performance for Employee - ${selectedEmployee}`
                : "Average Performance per Evolution"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="employee-select-label">
                Select Employee
              </InputLabel>
              <Select
                labelId="employee-select-label"
                value={selectedEmployee}
                label="Select Employee"
                onChange={handleEmployeeChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {employees.map((employee) => (
                  <MenuItem key={employee.Emp_No} value={employee.Emp_No}>
                    {employee.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ marginTop: "30px" }}>
          <Grid item xs={12} md={6}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={selectedEmployee ? employeeEvolutionData : evolutionData}
                margin={{ top: 10, right: 30, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis
                  dataKey="evolution"
                  label={{
                    value: "Evolution Stages",
                    position: "insideBottomRight",
                    offset: -10,
                    fill: "#424242",
                  }}
                  tick={{ fill: "#424242" }}
                />
                <YAxis
                  label={{
                    value: "Performance",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#424242",
                  }}
                  tick={{ fill: "#424242" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                    border: "none",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={selectedEmployee ? "value" : "average"}
                  stroke="#3f51b5"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#3f51b5" }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>

          <Grid item xs={12} md={6} position="relative">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={employeePerformanceData}
                margin={{ top: 10, right: 30, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis
                  dataKey="name"
                  label={{
                    value: "Performance",
                    position: "insideBottomRight",
                    offset: -10,
                    fill: "#424242",
                  }}
                />
                <YAxis
                  label={{
                    value: "Values",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#424242",
                  }}
                  tick={{ fill: "#424242" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                    border: "none",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="predicted_performance"
                  fill="#ff5722"
                  barSize={40}
                />
                <Bar dataKey="Actual_performance" fill="#9c27b0" barSize={40} />
              </BarChart>
            </ResponsiveContainer>

            {gap !== null && (
              <Paper
                sx={{
                  position: "absolute",
                  top: "40%",
                  left: { xs: "60%", md: "75%" }, // Adjust for smaller screens
                  transform: "translate(-50%, -50%)",
                  padding: "16px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  boxShadow: 3,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "#424242",
                    textAlign: "center",
                    fontFamily: "Poppins",
                  }}
                >
                  Gap
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#ff5722",
                    textAlign: "center",
                    marginTop: "8px",
                  }}
                >
                  {gap}
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </PageMain>
  );
}

export default WorkforceMapDashboard;
