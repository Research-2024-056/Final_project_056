import React, { useState, useEffect } from "react";
import PageMain from "../../components/PageMain";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PredictIcon from "@mui/icons-material/DonutLarge";

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
  const [expanded, setExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const handleFieldChange = (e, index) => {
    const value = e.target.value;
    switch (index) {
      case 0:
        setEvolution_01(value);
        break;
      case 1:
        setEvolution_02(value);
        break;
      case 2:
        setEvolution_03(value);
        break;
      case 3:
        setEvolution_04(value);
        break;
      case 4:
        setEvolution_05(value);
        break;
      default:
        break;
    }
  };

  return (
    <PageMain title="Labor Efficiency Analysis">
      <Typography
        sx={{
          lineHeight: 1,
          fontWeight: "500",
          fontSize: { xs: "1.25rem", sm: "1.625rem" }, // Adjust font size for small screens
          fontFamily: "Poppins",
          color: "#3f51b5",
          marginTop: "20px",
          textAlign: "center", // Center the text on small screens
        }}
      >
        Labor Efficiency Analysis
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          gap: 4,
          padding: 6,
        }}
      >
        <Card
          sx={{ flex: 1, boxShadow: 3, p: { xs: 2, sm: 3 }, borderRadius: 2 }}
        >
          <Box sx={{ textAlign: "center", marginBottom: 3 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#0d47a1",
                letterSpacing: 1,
              }}
            >
              Employee Performance Form
            </Typography>
          </Box>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        color: "#3f51b5",
                        letterSpacing: 0.5,
                        marginBottom: "8px",
                      }}
                    >
                      Employee Number
                    </Typography>
                    <TextField
                      select
                      name="Emp_No"
                      value={formData.Emp_No}
                      onChange={handleEmpNoChange}
                      error={!!errors.Emp_No}
                      helperText={errors.Emp_No}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {EmpNoOptions.map((empNo) => (
                        <MenuItem key={empNo} value={empNo}>
                          {empNo}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        color: "#3f51b5",
                        letterSpacing: 0.5,
                        marginBottom: "8px",
                      }}
                    >
                      Employee Name
                    </Typography>
                    <TextField
                      name="Name"
                      value={formData.Name}
                      onChange={handleChange}
                      error={!!errors.Name}
                      helperText={errors.Name}
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: "#3f51b5",
                      letterSpacing: 0.5,
                      marginBottom: "8px",
                    }}
                  >
                    Working Hours
                  </Typography>
                  <TextField
                    name="workingMinutes"
                    value={formData.workingMinutes}
                    onChange={handleChange}
                    error={!!errors.workingMinutes}
                    helperText={errors.workingMinutes}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccessTimeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: "#3f51b5",
                      letterSpacing: 0.5,
                      marginBottom: "8px",
                    }}
                  >
                    SMV
                  </Typography>
                  <TextField
                    name="smv"
                    value={formData.smv}
                    onChange={handleChange}
                    error={!!errors.smv}
                    helperText={errors.smv}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SettingsIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: "#3f51b5",
                      letterSpacing: 0.5,
                      marginBottom: "8px",
                    }}
                  >
                    Good Quality Pieces
                  </Typography>
                  <TextField
                    name="goodQualityPieces"
                    value={formData.goodQualityPieces}
                    onChange={handleChange}
                    error={!!errors.goodQualityPieces}
                    helperText={errors.goodQualityPieces}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckCircleIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {errors.calculation && (
                  <Grid item xs={12}>
                    <Typography color="error">{errors.calculation}</Typography>
                  </Grid>
                )}

                <Grid item xs={12} container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    {" "}
                    
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }} 
                    >
                      Calculate Efficiency
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {" "}
                   
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={handleClear}
                      fullWidth
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }} 
                    >
                      Clear Form
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>

            {laborEfficiency !== null && (
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fafafa",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: "#0d47a1",
                    mb: 2,
                  }}
                >
                  Labor Efficiency: {laborEfficiency}%
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: "1.2rem",
                    color: laborEfficiency >= 80 ? "#388e3c" : "#f57c00",
                    fontWeight: 500,
                  }}
                >
                  Efficiency Grade: {efficiencyGrade}
                </Typography>

                {remaining !== null && (
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: "1rem",
                      color: "#616161",
                      mt: 1,
                    }}
                  >
                    Remaining Employees: {remaining}
                  </Typography>
                )}

                <Button
                  type="button"
                  variant="contained"
                  color="success"
                  onClick={handleInsert}
                  sx={{
                    mt: 3,
                    backgroundColor: "#4caf50",
                    "&:hover": {
                      backgroundColor: "#388e3c",
                    },
                    padding: "10px 20px",
                    fontSize: "1rem",
                  }}
                >
                  Save Data
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>

        <Box
          sx={{
            flex: "0 0 300px",
            mt: { xs: 4, md: 0 }, // Adds margin-top for mobile view
          }}
        >
          <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <PredictIcon sx={{ mr: 1, color: "#0d47a1" }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: "#0d47a1",
                    letterSpacing: 1,
                  }}
                >
                  Predicts
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <form onSubmit={handleSubmitPredict}>
                <Grid container spacing={2}>
                  {[...Array(5)].map((_, index) => (
                    <Grid item xs={12} key={index}>
                      <TextField
                        label={`Evaluation ${index + 1}`}
                        value={
                          index === 0
                            ? Evolution_01Performance
                            : index === 1
                            ? Evolution_02Performance
                            : index === 2
                            ? Evolution_03Performance
                            : index === 3
                            ? Evolution_04Performance
                            : Evolution_05Performance
                        }
                        onChange={(e) => handleFieldChange(e, index)}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Predict
                    </Button>
                    {/* Loading GIF */}
                    {isLoading && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          alt="gif"
                          src="https://i.gifer.com/CVyf.gif"
                          width="60%"
                        ></img>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </form>
              {predictedPerformance && (
                <Box
                  mt={1}
                  p={1}
                  bgcolor="white"
                  borderRadius={4}
                  textAlign="center"
                  maxWidth="100%"
                  sx={{
                    border: "1px solid #ddd",
                    display: "inline-block",
                    "@media (max-width:600px)": {
                      mt: 0.5,
                      p: 0.5,
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" } }}
                  >
                    Predicted Performance:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", sm: "1.2rem" },
                      mt: 0.5,
                    }}
                  >
                    {parseFloat(predictedPerformance).toFixed(3)}
                  </Typography>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </PageMain>
  );
}
