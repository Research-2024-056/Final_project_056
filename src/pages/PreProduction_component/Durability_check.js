import React from 'react';
import PageMain from '../../components/PageMain';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


const steps = ['Input Fabric', 'Processing', 'Get Durability'];

function Durability_check() {

    

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

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

  return (
    <PageMain>
      <Typography Heading sx={{letterSpacing:".130rem", color:"#818ea3",fontSize:".625rem" }}>
        DASHBOARD
      </Typography>
      <Typography Heading sx={{ lineHeight:1,fontWeight:"500",fontSize:"1.625rem",fontFamily:"poppins" , marginBottom:"60px"}}>
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
                    <center>
                    <Typography Heading sx={{ lineHeight:1,fontWeight:"500",fontSize:"1.425rem",fontFamily:"poppins" , marginTop:"60px"}}>
        Provide the Details Which you need to procceed with 
      </Typography>
      <TextField
          id="outlined-password-input"
          label="Enter The Fabric"
          type="text"
          autoComplete="current-password"
          sx={{
            width:"60%",
            marginTop:"35px"
          }}
        />
        <Typography Heading sx={{ lineHeight:1,fontWeight:"500",fontSize:"18px",fontFamily:"poppins" , marginTop:"60px"}}>
        *Provide the name of the fabric which you need to check for the durability
      </Typography>
                   </center>
                </React.Fragment>
              )}
              {activeStep === 1 && (
                <React.Fragment >
                <center>
                <Typography Heading sx={{ lineHeight:1,fontWeight:"500",fontSize:"1.425rem",fontFamily:"poppins" , marginTop:"60px" }}>
    Working On Progress
  </Typography>
  
          <img alt='gif' mt='10px' src='https://i.gifer.com/CVyf.gif' width="290px"></img>
               </center>
            </React.Fragment>
              )}
              {activeStep === 2 && (
                <React.Fragment >
                <center>
                <Typography Heading sx={{ lineHeight:1,fontWeight:"500",fontSize:"1.425rem",fontFamily:"poppins" , marginTop:"60px" }}>
Durability For Cotton Is 
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
        width: 120,
        height: 120,
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
        75%
      </Typography>
    </Box>
  </Box>
</Box>


               </center>
            </React.Fragment>
              )}
              <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop:"200px" }}>
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
                <Button onClick={handleNext} sx={{ mr: 1 }} variant="outlined">
                  Next
                </Button>
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
