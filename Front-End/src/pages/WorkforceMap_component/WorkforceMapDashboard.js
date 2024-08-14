import React, { useState, useEffect } from "react";
import PageMain from "../../components/PageMain";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Grid,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Paper,
} from "@mui/material";
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

  useEffect(() => {
    // Fetch average evolution data
    axios
      .get("http://localhost:5000/evolution_averages")
      .then((response) => {
        const data = response.data;
        const formattedData = Object.keys(data).map((key) => ({
          evolution: key,
          average: data[key],
        }));
        setEvolutionData(formattedData);
      })
      .catch((error) => {
        console.error("There was an error fetching the evolution data!", error);
      });

    // Fetch employees for the dropdown
    axios
      .get("http://localhost:5000/employees")
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
      axios
        .get(`http://localhost:5000/predict_performance/${emp_no}`)
        .then((response) => {
          const { predicted_performance, last_performance } = response.data;
          const gapValue = (last_performance - predicted_performance).toFixed(3);
          setGap(gapValue);
          const formattedData = [
            {
              name: "Performance",
              predicted_performance,
              last_performance,
            },
          ];
          setEmployeePerformanceData(formattedData);
        })
        .catch((error) => {
          console.error("Error fetching employee performance data!", error);
        });
    } else {
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
          fontSize: "1.625rem",
          fontFamily: "Poppins",
          color: "#3f51b5",
          marginBottom: "40px",
          marginTop: "20px",
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
          <Grid item>
            <Typography
              sx={{
                lineHeight: 1,
                fontWeight: "500",
                fontSize: "1.25rem",
                fontFamily: "Poppins, sans-serif",
                color: "#424242",
              }}
            >
              {selectedEmployee
                ? `Performance for Employee - ${selectedEmployee}`
                : "Average Performance per Evolution"}
            </Typography>
          </Grid>
          <Grid item>
            <FormControl sx={{ width: "250px" }}>
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
          <Grid item xs={6}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={evolutionData}
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
                  dataKey="average"
                  stroke="#3f51b5"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#3f51b5" }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>

          <Grid item xs={6} position="relative">
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
                <Bar dataKey="last_performance" fill="#9c27b0" barSize={40} />
              </BarChart>
            </ResponsiveContainer>

            {gap !== null && (
              <Paper
                sx={{
                  position: "absolute",
                  top: "40%",
                  left: "75%",
                  transform: "translate(-50%, -50%)",
                  padding: "10px 20px",
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  textAlign: "center",
                  zIndex: 10,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: gap > 0 ? "#4caf50" : "#f44336",
                  }}
                >
                  Gap: {gap}
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
