import React, { useState, useEffect } from "react";
import PageMain from "../../components/PageMain";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { Typography, Paper, Box } from "@mui/material";

export default function Labor_efficiency_analysis() {
  const [EmpNoOptions, setEmpNoOptions] = useState([]);
  const [formData, setFormData] = useState({
    Emp_No: "",
    Name: "",
    workingMinutes: "600",
    smv: "",
    goodQualityPieces: "",
  });
  const [errors, setErrors] = useState({});
  const [laborEfficiency, setLaborEfficiency] = useState(null);
  const [efficiencyGrade, setEfficiencyGrade] = useState("");
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    const fetchEmpNoOptions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_emp_no");
        setEmpNoOptions(response.data.Emp_No);
      } catch (error) {
        console.error("Error fetching Emp_No options:", error);
      }
    };
    fetchEmpNoOptions();
  }, []);

  const handleEmpNoChange = async (e) => {
    const empNo = e.target.value;
    setFormData((prevData) => ({ ...prevData, Emp_No: empNo }));

    try {
      const response = await axios.post(
        "http://localhost:5000/get_employee_name",
        { Emp_No: empNo }
      );
      setFormData((prevData) => ({ ...prevData, Name: response.data.Name }));
    } catch (error) {
      console.error("Error fetching Employee Name:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.Emp_No) validationErrors.Emp_No = "Emp No is required";
    if (!formData.Name) validationErrors.Name = "Name is required";
    if (!formData.workingMinutes)
      validationErrors.workingMinutes = "Working Minutes is required";
    if (!formData.smv) validationErrors.smv = "SMV is required";
    if (!formData.goodQualityPieces)
      validationErrors.goodQualityPieces = "Good Quality Pieces is required";

    if (Object.keys(validationErrors).length === 0) {
      const goodQualityPieces = parseFloat(formData.goodQualityPieces);
      const smv = parseFloat(formData.smv);
      const workingMinutes = parseFloat(formData.workingMinutes);

      if (isNaN(goodQualityPieces) || isNaN(smv) || isNaN(workingMinutes)) {
        setErrors({
          ...validationErrors,
          calculation: "Invalid input for calculation",
        });
        setLaborEfficiency(null);
        setEfficiencyGrade("");
      } else {
        const efficiency = ((goodQualityPieces * smv) / workingMinutes) * 100;
        setLaborEfficiency(efficiency.toFixed(2));

        if (efficiency >= 91) {
          setEfficiencyGrade("A (Highly Efficient)");
        } else if (efficiency >= 81) {
          setEfficiencyGrade("B (Very Efficient)");
        } else if (efficiency >= 71) {
          setEfficiencyGrade("C (Moderately Efficient)");
        } else if (efficiency >= 61) {
          setEfficiencyGrade("D (Low Efficiency)");
        } else {
          setEfficiencyGrade("E (Poor Efficiency)");
        }

        setErrors({});
      }
    } else {
      setErrors(validationErrors);
      setLaborEfficiency(null);
      setEfficiencyGrade("");
    }
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    const newEvolutionData = {
      Emp_No: formData.Emp_No,
      Last_Evolution: laborEfficiency,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/insert",
        newEvolutionData
      );
      alert("Data inserted successfully!");
      setRemaining(response.data.remaining);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const handleClear = () => {
    setFormData({
      Emp_No: "",
      Name: "",
      workingMinutes: "600",
      smv: "",
      goodQualityPieces: "",
    });
    setErrors({});
    setLaborEfficiency(null);
    setEfficiencyGrade("");
  };

  // Prediction
  const [Evolution_01Performance, setEvolution_01] = useState("");
  const [Evolution_02Performance, setEvolution_02] = useState("");
  const [Evolution_03Performance, setEvolution_03] = useState("");
  const [Evolution_04Performance, setEvolution_04] = useState("");
  const [Evolution_05Performance, setEvolution_05] = useState("");
  const [predictedPerformance, setPredictedPerformance] = useState("");

  const handleSubmitPredict = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        Evolution_01: Evolution_01Performance,
        Evolution_02: Evolution_02Performance,
        Evolution_03: Evolution_03Performance,
        Evolution_04: Evolution_04Performance,
        Evolution_05: Evolution_05Performance,
      });
      setPredictedPerformance(response.data.predicted_next_performance);
    } catch (error) {
      console.error("Error predicting performance:", error);
    }
  };

  return (
    <PageMain title="Labor Efficiency Analysis">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  mt={2}
                  select
                  label="Emp No"
                  name="Emp_No"
                  value={formData.Emp_No}
                  onChange={handleEmpNoChange}
                  error={!!errors.Emp_No}
                  helperText={errors.Emp_No}
                >
                  {EmpNoOptions.map((empNo) => (
                    <MenuItem key={empNo} value={empNo}>
                      {empNo}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="Name"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  error={!!errors.Name}
                  helperText={errors.Name}
                  InputProps={{ readOnly: true }}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="Working Minutes"
                  name="workingMinutes"
                  value={formData.workingMinutes}
                  onChange={handleChange}
                  error={!!errors.workingMinutes}
                  helperText={errors.workingMinutes}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="SMV"
                  name="smv"
                  value={formData.smv}
                  onChange={handleChange}
                  error={!!errors.smv}
                  helperText={errors.smv}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="Good Quality Pieces"
                  name="goodQualityPieces"
                  value={formData.goodQualityPieces}
                  onChange={handleChange}
                  error={!!errors.goodQualityPieces}
                  helperText={errors.goodQualityPieces}
                />
              </FormControl>

              {errors.calculation && (
                <Typography color="error">{errors.calculation}</Typography>
              )}

              <Box mt={2}>
                <Button type="submit" variant="contained" color="primary">
                  Calculate
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={handleClear}
                  style={{ marginLeft: "16px" }}
                >
                  Clear
                </Button>
              </Box>
            </form>

            {laborEfficiency !== null && (
              <Box mt={2}>
                <Typography variant="h6">
                  Labor Efficiency: {laborEfficiency}%
                </Typography>
                <Typography variant="h6">
                  Efficiency Grade: {efficiencyGrade}
                </Typography>
              </Box>
            )}

            {laborEfficiency !== null && (
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleInsert}
                >
                  Insert
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <form onSubmit={handleSubmitPredict}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="Evolution 01"
                  value={Evolution_01Performance}
                  onChange={(e) => setEvolution_01(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  mt={2}
                  label="Evolution 02"
                  value={Evolution_02Performance}
                  onChange={(e) => setEvolution_02(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="Evolution 03"
                  value={Evolution_03Performance}
                  onChange={(e) => setEvolution_03(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="Evolution 04"
                  value={Evolution_04Performance}
                  onChange={(e) => setEvolution_04(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="Evolution 05"
                  value={Evolution_05Performance}
                  onChange={(e) => setEvolution_05(e.target.value)}
                />
              </FormControl>

              <Box mt={2}>
                <Button type="submit" variant="contained" color="primary">
                  Predict
                </Button>
              </Box>
            </form>

            {predictedPerformance && (
              <Box mt={2}>
                <Typography variant="h6">
                  Predicted Next Performance: {predictedPerformance}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </PageMain>
  );
}
