import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from "axios";
import PageMain from "../../components/PageMain";
import { useNavigate } from "react-router-dom";

export default function AddSewingMachine({ children }) {
  const [Brand, setBrands] = useState("");
  const [Type, setType] = useState("");
  const [Fabric_Type, setFabric_Type] = useState("");
  const [M_Year, setM_Year] = useState("");
  const [Take_up_Spring, setTake_up_Spring] = useState("");
  const [Take_up_Rubber, setTake_up_Rubber] = useState("");
  const [Bobbin_Case, setBobbin_Case] = useState("");
  const [Feed_Dog, setFeed_Dog] = useState("");
  const [Presser_Foot, setPresser_Foot] = useState("");
  const [Tension_Assembly, setTension_Assembly] = useState("");
  const [Hook_Assembly, setHook_Assembly] = useState("");
  const [Timing_Components, setTiming_Components] = useState("");
  const [Oil_Filling, setOil_Filling] = useState("");
  const [Dust_Remove, setDust_Remove] = useState("");
  const [Serial_No, setSerialNo] = useState("");
  const [status] = useState("Off");
  const navigate = useNavigate();

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", 
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const submitForm = () => {
    // Validation for Fabric_Type
    const fabricTypeLower = Fabric_Type.trim().toLowerCase();
    if (
      fabricTypeLower !== "heavy" &&
      fabricTypeLower !== "medium"
    ) {
      setSnackbar({
        open: true,
        message: "Fabric Type must be either 'Heavy' or 'Medium'.",
        severity: "error",
      });
      return;
    }

    // Validation for Manufacture Year
    const year = parseInt(M_Year, 10);
    if (isNaN(year) || year < 2006 || year > 2020) {
      setSnackbar({
        open: true,
        message: "Manufacture Year must be a number between 2006 and 2020.",
        severity: "error",
      });
      return;
    }

   
    if (
      Brand !== "" &&
      Type !== "" &&
      Fabric_Type !== "" &&
      M_Year !== "" &&
      Take_up_Spring !== "" &&
      Take_up_Rubber !== "" &&
      Bobbin_Case !== "" &&
      Feed_Dog !== "" &&
      Presser_Foot !== "" &&
      Tension_Assembly !== "" &&
      Hook_Assembly !== "" &&
      Timing_Components !== "" &&
      Oil_Filling !== "" &&
      Dust_Remove !== "" &&
      Serial_No !== ""
    ) {
      const ob = {
        Brand: Brand,
        Type: Type,
        Fabric_Type: Fabric_Type,
        M_Year: M_Year,
        Serial_No: Serial_No,
        usageDict: {
          "Take up Spring": Number(Take_up_Spring),
          "Take up Rubber": Number(Take_up_Rubber),
          "Bobbin Case": Number(Bobbin_Case),
          "Feed Dog": Number(Feed_Dog),
          "Presser Foot": Number(Presser_Foot),
          "Tension Assembly": Number(Tension_Assembly),
          "Hook Assembly": Number(Hook_Assembly),
          "Timing Components": Number(Timing_Components),
          "Oil Filling": Number(Oil_Filling),
          "Dust Remove": Number(Dust_Remove),
        },
        status: status,
      };

      axios
        .post("http://localhost:5005/predict/Inventory", ob)
        .then((res) => {
          console.log(res.data);
          setSnackbar({
            open: true,
            message: "Added Successfully",
            severity: "success",
          });
      
          setTimeout(() => {
            navigate("/SewingDashboard");
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
          setSnackbar({
            open: true,
            message: "An error occurred. Please try again!",
            severity: "error",
          });
        });
    } else {
      setSnackbar({
        open: true,
        message: "Please fill in all the fields.",
        severity: "warning",
      });
    }
  };

  return (
    <PageMain title="Dynamic Seat Planner">
      <Box>
        <Box
          sx={{
            width: "90%",
            maxWidth: "1200px",
            margin: "0 auto",
            marginBottom: "50px",
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: 3 }}>
            <h1>Fill Sewing Machine Information</h1>
          </Box>
          <form>
            <Grid container spacing={2}>
              {/* Row 1 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Brand (Juki)"
                  variant="outlined"
                  fullWidth
                  value={Brand}
                  onChange={(e) => setBrands(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Type (Single Needle)"
                  variant="outlined"
                  fullWidth
                  value={Type}
                  onChange={(e) => setType(e.target.value)}
                />
              </Grid>

              {/* Row 2 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Manufacture Year"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={M_Year}
                  onChange={(e) => setM_Year(e.target.value)}
                  inputProps={{ min: 2006, max: 2020 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Fabric Type (Heavy [GSM = 150 - 300] / Medium [GSM = 300 - 500])"
                  variant="outlined"
                  fullWidth
                  value={Fabric_Type}
                  onChange={(e) => setFabric_Type(e.target.value)}
                  helperText="Enter 'Heavy' or 'Medium'"
                />
              </Grid>

              {/* Row 3 */}
              <Grid item xs={12}>
                <TextField
                  label="Serial No"
                  variant="outlined"
                  fullWidth
                  value={Serial_No}
                  onChange={(e) => setSerialNo(e.target.value)}
                />
              </Grid>

              {/* Usage Fields */}
              {/* Take up Spring & Rubber */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Take up Spring Used Hours"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={Take_up_Spring}
                  onChange={(e) => setTake_up_Spring(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Take up Rubber Used Hours"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={Take_up_Rubber}
                  onChange={(e) => setTake_up_Rubber(e.target.value)}
                />
              </Grid>

              {/* Bobbin Case & Feed Dog */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Bobbin Case Used Hours"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={Bobbin_Case}
                  onChange={(e) => setBobbin_Case(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Feed Dog Used Hours"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={Feed_Dog}
                  onChange={(e) => setFeed_Dog(e.target.value)}
                />
              </Grid>

              {/* Presser Foot & Timing Components */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Presser Foot Used Hours"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={Presser_Foot}
                  onChange={(e) => setPresser_Foot(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Timing Components Used Hours"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={Timing_Components}
                  onChange={(e) => setTiming_Components(e.target.value)}
                />
              </Grid>

              {/* Oil Filling & Dust Remove */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Oil Filling Used Hours"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={Oil_Filling}
                  onChange={(e) => setOil_Filling(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Dust Remove Used Hours"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={Dust_Remove}
                  onChange={(e) => setDust_Remove(e.target.value)}
                />
              </Grid>

              {/* Tension Assembly & Hook Assembly */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tension Assembly Used Hours"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={Tension_Assembly}
                  onChange={(e) => setTension_Assembly(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hook Assembly Used Hours"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={Hook_Assembly}
                  onChange={(e) => setHook_Assembly(e.target.value)}
                />
              </Grid>
            </Grid>

            <Box sx={{ textAlign: "center", marginTop: 4 }}>
              <Button
                type="button"
                color="primary"
                variant="contained"
                size="large"
                onClick={submitForm}
                sx={{ paddingX: 5, paddingY: 1.5 }}
              >
                Add
              </Button>
            </Box>
          </form>
        </Box>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </PageMain>
  );
}
