import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import PageMain from "../../components/PageMain";



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
  const [status, setStatus] = useState("Off");

  const submitForm = () => {
    if (
      Brand != "" &&
      Type != "" &&
      Fabric_Type != "" &&
      M_Year != "" &&
      Take_up_Spring != "" &&
      Take_up_Rubber != "" &&
      Bobbin_Case != "" &&
      Feed_Dog != "" &&
      Presser_Foot != "" &&
      Tension_Assembly != "" &&
      Hook_Assembly != "" &&
      Timing_Components != "" &&
      Oil_Filling != "" &&
      Dust_Remove != "" &&
      Serial_No != ""
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
        status:status
      };
      console.log("came 1");
      axios
        .post("http://localhost:5000/predict/Inventory", ob)
        .then((res) => {
          console.log(res.data);
          //   toast.success("New swing machine added");
          //   navigate('/')
        })
        .catch((err) => {
          console.log(err);
          //toast.error("Try Again!");
        });
    }
  };

  return (
    <PageMain title="Dynamic Seat Planner">
    <Box >

        <Box
          sx={{
            width: "80%",
            margin: "0 auto",
            marginBottom: "50px",
            padding: 1,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <h1>Swing Informations</h1>
          </Box>
          <form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                paddingTop: "15px",
              }}
            >
              <TextField
                label="Brand"
                variant="outlined"
                sx={{ width: "80ch" }}
                onChange={(e) => setBrands(e.target.value)}
              />
              <TextField
                label="Type"
                variant="outlined"
                sx={{ width: "80ch" }}
                onChange={(e) => setType(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                paddingTop: "15px",
              }}
            >
              <TextField
                label="Manufacture Year"
                variant="outlined"
                type="number"
                sx={{ width: "80ch" }}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) => setM_Year(e.target.value)}
              />
              <TextField
                label="Fabric Type"
                variant="outlined"
                sx={{ width: "80ch" }}
                onChange={(e) => setFabric_Type(e.target.value)}
              />
            </Box>

            <TextField
              label="Serial No"
              variant="outlined"
              sx={{ width: "100%", paddingTop: "15px" }}
              onChange={(e) => setSerialNo(e.target.value)}
            />
          </form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              paddingTop: "15px",
            }}
          >
            <TextField
              label="Take up Spring"
              variant="outlined"
              type="number"
              sx={{ width: "80ch" }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => setTake_up_Spring(e.target.value)}
            />
            <TextField
              label="Take up Rubber"
              variant="outlined"
              type="number"
              sx={{ width: "80ch" }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => setTake_up_Rubber(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              paddingTop: "15px",
            }}
          >
            <TextField
              label="Bobbin Case"
              variant="outlined"
              type="number"
              sx={{ width: "80ch" }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => setBobbin_Case(e.target.value)}
            />
            <TextField
              label="Feed Dog"
              variant="outlined"
              type="number"
              sx={{ width: "80ch" }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => setFeed_Dog(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              paddingTop: "15px",
            }}
          >
            <TextField
              label="Presser Foot"
              variant="outlined"
              type="number"
              sx={{ width: "80ch" }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => setPresser_Foot(e.target.value)}
            />
            <TextField
              label="Timing Components"
              variant="outlined"
              type="number"
              sx={{ width: "80ch" }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => setTiming_Components(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              paddingTop: "15px",
            }}
          >
            <TextField
              label="Oil Filling"
              variant="outlined"
              type="number"
              sx={{ width: "80ch" }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => setOil_Filling(e.target.value)}
            />
            <TextField
              label="Dust Remove"
              variant="outlined"
              type="number"
              sx={{ width: "80ch" }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => setDust_Remove(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              paddingTop: "15px",
            }}
          >
            <TextField
              label="Tension Assembly"
              variant="outlined"
              type="number"
              sx={{ width: "80ch" }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => setTension_Assembly(e.target.value)}
            />
            <TextField
              label="Hook Assembly"
              variant="outlined"
              type="number"
              sx={{ width: "80ch" }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => setHook_Assembly(e.target.value)}
            />
          </Box>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ width: "10%", marginTop: "15px" }}
            onClick={submitForm}
          >
            {" "}
            PLUS
          </Button>
        </Box>
    
    </Box>
    </PageMain>
  );
}
