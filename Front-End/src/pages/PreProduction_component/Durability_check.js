import React, { useState, useEffect } from 'react';
import PageMain from '../../components/PageMain';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';

const steps = ['Input Fabric', 'Processing', 'Get Durability'];

function Durability_check() {


  // steps
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [blend, setBlend] = useState("Single");
  const [lastActiveStepTime, setLastActiveStepTime] = useState(null);

  useEffect(() => {
    if (activeStep === 0) {
      setLastActiveStepTime(Date.now());
    }
  }, [activeStep]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (activeStep === 1 && lastActiveStepTime !== null) {
        const elapsedTime = Date.now() - lastActiveStepTime;
        // If the user is on "Active Step 1" and it's been less than 2 minutes, move to "Active Step 2"
        if (elapsedTime < 400020000) {
          handleNext();
        }
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [activeStep, lastActiveStepTime]);

  const [endUseValues, setEndUseValues] = useState([]);
  const [fiberContentValues, setFiberContentValues] = useState([]);

  // single input form data
  const [formData, setFormData] = useState({
    'Fiber Content': '',
    'End Use': ''
  });

  // button pass pred1
  const [prediction, setPrediction] = useState(null);
  // button pass pred2
  const [prediction2, setPrediction2] = useState(null);
  // button pass pred3
  const [prediction3, setPrediction3] = useState(null);

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  const handleChange = (event, newValue) => {
    const { name, value } = newValue ? newValue : event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  // single input backend pass
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/predict', [formData])
      .then(response => {
        setPrediction(response.data.predictions[0]);
        handleNext();
      })
      .catch(error => {
        console.error('Error making prediction:', error);
      });


  };

  // Define formData2 with initial values
  const [formData2, setFormData2] = useState([
    { "Fiber Content": "", "End Use": "" },
    { "Fiber Content": "", "End Use": "" }
  ]);

  // Define formData3 with initial values
  const [formData3, setFormData3] = useState([
    { "Fiber Content": "", "End Use": "" },
    { "Fiber Content": "", "End Use": "" },
    { "Fiber Content": "", "End Use": "" }
  ]);

  // Define handleChange for formData2
  // const handleChange2 = (index, e) => {
  //   const { name, value } = e.target;
  //   const newData = [...formData2];
  //   newData[index][name] = value;
  //   setFormData2(newData);
  // };
  const handleChange2 = (index, newValue, name) => {
    const newData = [...formData2];
    newData[index][name] = newValue;
    setFormData2(newData);
  };


  // Define handleChange for formData2
  // const handleChange3 = (index, e) => {
  //   const { name, value } = e.target;
  //   const newData = [...formData3]; // Make a copy of the formData3 array
  //   newData[index] = { ...newData[index], [name]: value }; // Update the element at the specified index
  //   setFormData3(newData); // Update the state with the new array
  // };

  const handleChange3 = (index, newValue, name) => {
    const newData = [...formData3]; // Make a copy of the formData3 array
    newData[index] = { ...newData[index], [name]: newValue }; // Update the element at the specified index
    setFormData3(newData); // Update the state with the new array
  };


  // Define handleSubmit2 for formData2
  const handleSubmit2 = (e) => {
    e.preventDefault();

    // Ensure there are exactly two fabric types in formData2
    if (formData2.length !== 2) {
      console.error('Please enter two fabric types.');
      return;
    }

    // Extract fabric types from formData2
    const fabric1 = formData2[0]['Fiber Content'];
    const fabric2 = formData2[1]['Fiber Content'];

    // Combine fabric types into an array
    const fabrics = [fabric1, fabric2];

    // Extract end use from formData2
    const endUse = formData2[0]['End Use'];

    // Construct the data to be sent
    const requestData = fabrics.map(fabric => ({
      'Fiber Content': fabric1,
      'Fiber Content': fabric2,
      'End Use': endUse
    }));

    // Send the data to the backend
    axios.post('http://127.0.0.1:5000/predict', requestData)
      .then(response => {
        setPrediction2(response.data.predictions[0]);
        handleNext();
      })
      .catch(error => {
        console.error('Error making prediction:', error);
      });
  };

  //handle submit3

  const handleSubmit3 = (e) => {
    e.preventDefault();

    // Ensure there are exactly two fabric types in formData2
    if (formData3.length !== 3) {
      console.error('Please enter two fabric types.');
      return;
    }

    // Extract fabric types from formData2
    const fabric31 = formData3[0]['Fiber Content'];
    const fabric32 = formData3[1]['Fiber Content'];
    const fabric33 = formData3[2]['Fiber Content'];

    // Combine fabric types into an array
    const fabrics = [fabric31, fabric32, fabric33];

    // Extract end use from formData2
    const endUse = formData3[0]['End Use'];

    // Construct the data to be sent
    const requestData3 = fabrics.map(fabric => ({
      'Fiber Content': fabric31,
      'Fiber Content': fabric32,
      'Fiber Content': fabric33,
      'End Use': endUse
    }));

    // Send the data to the backend
    axios.post('http://127.0.0.1:5000/predict', requestData3)
      .then(response => {
        setPrediction3(response.data.predictions[0]);
        handleNext();
      })
      .catch(error => {
        console.error('Error making prediction:', error);
      });
  };




  useEffect(() => {
    // Fetch End Use values from the backend
    axios.get('http://127.0.0.1:5000/get_end_use')
      .then(response => {
        setEndUseValues(response.data.end_use_values);
      })
      .catch(error => {
        console.error('Error fetching End Use values:', error);
      });

    // Fetch Fiber Content values from the backend
    axios.get('http://127.0.0.1:5000/get_fiber_content')
      .then(response => {
        setFiberContentValues(response.data.fiber_content_values);
      })
      .catch(error => {
        console.error('Error fetching Fiber Content values:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handledone = () => {
    // Reload the page
    window.location.reload();
  };

  function getDurabilityStatement(prediction, prediction2, prediction3) {
    let statements = [];

    const addStatement = (prediction) => {
        if (prediction >= 80 && prediction <= 100) {
            return `Durability: ${prediction.toFixed(2)}%\nClothing is in excellent condition, with only minor signs of wear.\n Estimated Lifespan: 3 to 5 years.`;
        } else if (prediction >= 60 && prediction < 80) {
            return `Durability: ${prediction.toFixed(2)}%\nModerate wear is visible, but the clothing is still functional and looks good.\nEstimated Lifespan: 2 to 3 years.`;
        } else if (prediction >= 20 && prediction < 60) {
            return `Durability: ${prediction.toFixed(2)}%\nSignificant signs of wear and tear. Fabric may start to fade, lose shape, or have minor issues like pilling or small holes.\nEstimated Lifespan: 1 to 2 years.`;
        } else if (prediction >= 10 && prediction < 20) {
            return `Durability: ${prediction.toFixed(2)}%\nMajor signs of wear, possibly nearing the end of its life. Fabric may be thin, stretched, or can be damaged.\nEstimated Lifespan: 6 months to 1 year.`;
        } else {
            return `Durability: ${prediction.toFixed(2)}%\nCondition not within defined ranges.`;
        }
    };

    if (prediction) {
        statements.push(addStatement(prediction));
    }
    if (prediction2) {
        statements.push(addStatement(prediction2));
    }
    if (prediction3) {
        statements.push(addStatement(prediction3));
    }

    return statements.join('\n\n');
}

  return (
    <PageMain>
      <Typography Heading sx={{ letterSpacing: ".130rem", color: "#818ea3", fontSize: ".625rem" }} >
        DASHBOARD
      </Typography>
      <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.625rem", fontFamily: "poppins", marginBottom: "60px" }}>
        Durability check
      </Typography>

      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]} >
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>

              {activeStep === 0 && (
                <React.Fragment >
                  <Grid textAlign="center">
                    <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.425rem", fontFamily: "poppins", marginTop: "60px" }}>
                      Provide the Details Which you need to procceed with
                    </Typography>
                    <Stack>
                      <Grid >
                        <FormControl>
                          <Typography sx={{ marginTop: "40px", fontWeight: "600", color: "#353535" }}> Select the Fabric Methord You want to Proceed With</Typography>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            sx={{ marginTop: "15px" }}
                          >
                            <FormControlLabel
                              onClick={() => setBlend("Single")}
                              value="Single"
                              control={<Radio checked={blend === "Single"} />}
                              label="Single Blend"
                            />

                            <FormControlLabel
                              onClick={() => setBlend("Two")}
                              value="Two"
                              control={<Radio checked={blend === "Two"} />}
                              label="Two Fabric Blend"
                            />

                            <FormControlLabel
                              onClick={() => setBlend("Tri")}
                              value="Tri"
                              control={<Radio checked={blend === "Tri"} />}
                              label="Tri-Blend Blend"
                            />
                          </RadioGroup>

                        </FormControl>
                      </Grid>
                      <Grid>



                      </Grid>
                    </Stack>

                    {blend === 'Single' && <>
                      <form onSubmit={handleSubmit}>
                        <Typography sx={{ marginTop: "30px", fontWeight: "600", color: "#353535" }}> Enter  the Fabric and the End Use to Check Durability</Typography>
                        <center>
                          <Autocomplete

                            id="fiberContentAutocomplete"
                            disablePortal
                            options={fiberContentValues}
                            value={formData['Fiber Content']}
                            onChange={(event, newValue) => {
                              handleChange(event, { name: 'Fiber Content', value: newValue });
                            }}

                            sx={{
                              width: "60%",
                              marginTop: "35px",


                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="Fiber Content"
                                label="Enter the Fabric"
                                value={formData['Fiber Content']}
                                onChange={handleChange}
                              />
                            )}
                          />
                          <Autocomplete
                            id="endUseAutocomplete"
                            disablePortal
                            options={endUseValues} // Replace endUseValues with your array of end use options
                            value={formData['End Use']}
                            onChange={(event, newValue) => {
                              handleChange(event, { name: 'End Use', value: newValue });
                            }}

                            sx={{
                              width: "60%",
                              marginTop: "35px",


                            }}// Adjust styling as needed
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="End Use"
                                label="Enter End Use"
                                value={formData['End Use']}
                                onChange={handleChange}
                              />
                            )}
                          />

                          <Grid sx={{ marginTop: "20px" }}>
                            <Button  type="submit" variant='outlined'>Predict</Button>

                          </Grid>
                        </center>
                      </form>



                    </>}
                    {blend === 'Two' && <>

                      <form onSubmit={handleSubmit2}>
                        <center>
                          <Autocomplete
                            id="fabric1Autocomplete"
                            disablePortal
                            options={fiberContentValues} // Assuming fiberContentValues is an array of options for fiber content
                            value={formData2[0] && formData2[0]["Fiber Content"]}
                            onChange={(event, newValue) => {
                              handleChange2(0, newValue, "Fiber Content");
                            }}
                            PopperProps={{
                              placement: 'bottom-start' // Display options below the input field
                            }}
                            sx={{ width: "60%", marginTop: "35px" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="Fiber Content"
                                label="Enter Fabric Type 1"
                                value={formData2[0] && formData2[0]["Fiber Content"]}
                                onChange={(e) => handleChange2(0, e.target.value, "Fiber Content")}
                              />
                            )}
                          />
                          <Autocomplete
                            id="fabric2Autocomplete"
                            disablePortal
                            options={fiberContentValues} // Assuming fiberContentValues is an array of options for fiber content
                            value={formData2[1] && formData2[1]["Fiber Content"]}
                            onChange={(event, newValue) => {
                              handleChange2(1, newValue, "Fiber Content");
                            }}
                            PopperProps={{
                              placement: 'bottom-start' // Display options below the input field
                            }}
                            sx={{ width: "60%", marginTop: "35px" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="Fiber Content"
                                label="Enter Fabric Type 2"
                                value={formData2[1] && formData2[1]["Fiber Content"]}
                                onChange={(e) => handleChange2(1, e.target.value, "Fiber Content")}
                              />
                            )}
                          />
                          <Autocomplete
                            id="endUseAutocomplete"
                            disablePortal
                            options={endUseValues} // Assuming endUseValues is an array of options for end use
                            value={formData2[0]["End Use"]} // Using the end use from the first fabric
                            onChange={(event, newValue) => {
                              handleChange2(0, newValue, "End Use"); // Handle end use change for the first fabric
                            }}
                            PopperProps={{
                              placement: 'bottom-start' // Display options below the input field
                            }}
                            sx={{ width: "60%", marginTop: "35px" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="End Use"
                                label="Enter End Use"
                                value={formData2[0]["End Use"]} // Using the end use from the first fabric
                                onChange={(e) => handleChange2(0, e.target.value, "End Use")} // Handle end use change for the first fabric
                              />
                            )}
                          />
                          <Grid sx={{ marginTop: "20px" }}>
                            <Button type="submit" variant='outlined'>Predict</Button>

                          </Grid>
                        </center>
                      </form>




                    </>}
                    {blend === 'Tri' && <>

                      <form onSubmit={handleSubmit3}>
                        <center>
                          <Autocomplete
                            id="fabric1Autocomplete"
                            disablePortal
                            options={fiberContentValues} // Replace fabricContentValues with your array of fabric content options
                            value={formData3[0] && formData3[0]["Fiber Content"]}
                            onChange={(event, newValue) => {
                              handleChange3(0, newValue, "Fiber Content");
                            }}
                            PopperProps={{
                              placement: 'bottom-start' // Display options below the input field
                            }}
                            sx={{ width: "60%", marginTop: "35px" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="Fiber Content"
                                label="Enter Fabric Type 1"
                                value={formData3[0] && formData3[0]["Fiber Content"]}
                                onChange={(e) => handleChange3(0, e.target.value, "Fiber Content")}
                              />
                            )}
                          />

                          <Autocomplete
                            id="fabric2Autocomplete"
                            disablePortal
                            options={fiberContentValues} // Replace fabricContentValues with your array of fabric content options
                            value={formData3[1] && formData3[1]["Fiber Content"]}
                            onChange={(event, newValue) => {
                              handleChange3(1, newValue, "Fiber Content");
                            }}
                            PopperProps={{
                              placement: 'bottom-start' // Display options below the input field
                            }}
                            sx={{ width: "60%", marginTop: "35px" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="Fiber Content"
                                label="Enter Fabric Type 2"
                                value={formData3[1] && formData3[1]["Fiber Content"]}
                                onChange={(e) => handleChange3(1, e.target.value, "Fiber Content")}
                              />
                            )}
                          />

                          <Autocomplete
                            id="fabric3Autocomplete"
                            disablePortal
                            options={fiberContentValues} // Replace fabricContentValues with your array of fabric content options
                            value={formData3[2] && formData3[2]["Fiber Content"]}
                            onChange={(event, newValue) => {
                              handleChange3(2, newValue, "Fiber Content");
                            }}
                            PopperProps={{
                              placement: 'bottom-start' // Display options below the input field
                            }}
                            sx={{ width: "60%", marginTop: "35px" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="Fiber Content"
                                label="Enter Fabric Type 3"
                                value={formData3[2] && formData3[2]["Fiber Content"]}
                                onChange={(e) => handleChange3(2, e.target.value, "Fiber Content")}
                              />
                            )}
                          />

                          <Autocomplete
                            id="endUseAutocomplete"
                            disablePortal
                            options={endUseValues} // Replace endUseValues with your array of end use options
                            value={formData3[0]["End Use"]} // Using the end use from the first fabric
                            onChange={(event, newValue) => {
                              handleChange3(0, newValue, "End Use"); // Handle end use change for the first fabric
                            }}
                            PopperProps={{
                              placement: 'bottom-start' // Display options below the input field
                            }}
                            sx={{ width: "60%", marginTop: "35px" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="End Use"
                                label="Enter End Use"
                                value={formData3[0]["End Use"]} // Using the end use from the first fabric
                                onChange={(e) => handleChange3(0, e.target.value, "End Use")} // Handle end use change for the first fabric
                              />
                            )}
                          />

                          <Grid sx={{ marginTop: "20px" }}>
                            <Button  type="submit" variant='outlined'>Predict</Button>

                          </Grid>
                        </center>
                      </form>



                    </>}

                  </Grid>
                </React.Fragment>
              )}
              {activeStep === 1 && (
                <React.Fragment >
                  <center>
                    <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.425rem", fontFamily: "poppins", marginTop: "60px" }}>
                      Working On Progress
                    </Typography>

                    <img alt='gif' mt='10px' src='https://i.gifer.com/CVyf.gif' width="290px"></img>
                  </center>
                </React.Fragment>
              )}
              {activeStep === 2 && (
                <React.Fragment >
                  <center>
                    <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.425rem", fontFamily: "poppins", marginTop: "60px" }}>
                      Durability IS
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
                      <Box
                        sx={{
                          position: 'relative',
                          display: 'inline-flex',
                          width: 150,
                          height: 150,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 520,
                            height: 150,
                            borderRadius: '50%',
                            border: '2px solid #f50057',
                            position: 'relative',
                            zIndex: 2,
                            animation: 'progressBar 4s linear infinite', // Apply the animation
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: 'poppins',
                              fontSize: '35px',
                              color: '#f50057',
                            }}
                          >
                            {prediction && `${prediction.toFixed(2)}%`}
                            {prediction2 && `${prediction2.toFixed(2)}%`}
                            {prediction3 && `${prediction3.toFixed(2)}%`}
                          </Typography>


                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ marginTop: '40px' }}>
        {prediction && (
          <Typography sx={{ fontSize: '1rem', marginTop: '20px', fontFamily: 'poppins' }}>
            {getDurabilityStatement(prediction)}
          </Typography>
        )}
        {prediction2 && (
          <Typography sx={{ fontSize: '1rem', marginTop: '20px', fontFamily: 'poppins' }}>
            {getDurabilityStatement(prediction2)}
          </Typography>
        )}
        {prediction3 && (
          <Typography sx={{ fontSize: '1rem', marginTop: '20px', fontFamily: 'poppins' }}>
            {getDurabilityStatement(prediction3)}
          </Typography>
        )}
      </Box>
                    
                    < Button
              
                  onClick={handledone}
                  sx={{ mr: 1  , marginTop:"20px"}}
                  variant="outlined"
                >
                  Done
                </Button>

                  </center>
                </React.Fragment>
              )}
              <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: "200px" }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete} variant="outlined">
                      {completedSteps() === totalSteps() - 1
                        ? 'Finish'
                        : 'Complete Step'}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </PageMain>
  );
}

export default Durability_check;
