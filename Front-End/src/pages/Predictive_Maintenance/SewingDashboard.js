import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageMain from "../../components/PageMain";




export default function SewingDashboard({ children }) {
 
  const navigate = useNavigate();

  const [working_swing, setWorkingSwing] = useState([]);
  const [due_swing, setDueSwing] = useState([]);
  const [allMachine, setAllMachine] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/collection/Inventory/working")
      .then((res) => {
        console.log(res.data);
        setWorkingSwing(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/collection/Inventory/maintenance-check")
      .then((res) => {
        console.log(res.data);
        setDueSwing(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/collection/Inventory/all")
      .then((res) => {
        console.log(res.data);
        setAllMachine(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      field: "Serial_No",
      headerName: "Serial No",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    { field: "Brand", headerName: "Brand", flex: 1 },
    { field: "Type", headerName: "Type", flex: 1 },
    { field: "Fabric_Type", headerName: "Fabric Type", flex: 1 },
    { field: "M_Year", headerName: "Manufacture Year", flex: 1 },
  ];

  const getCellStyles = (value) => ({
    backgroundColor: value < 100 ? "#dc143c" : "inherit",
  });

  const column3 = [
    {
      field: "Serial_No",
      headerName: "Serial No",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    { field: "Brand", headerName: "Brand", flex: 1 },
    { field: "Type", headerName: "Type", flex: 1 },
    { field: "Fabric_Type", headerName: "Fabric Type", flex: 1 },
    { field: "M_Year", headerName: "Manufacture Year", flex: 1 },
    { field: "Bobbin Case", headerName: "Bobbin Case", flex: 1 },
    { field: "Dust Remove", headerName: "Dust Remove", flex: 1 },
    { field: "Feed Dog", headerName: "Feed Dog", flex: 1 },
    { field: "Hook Assembly", headerName: "Hook Assembly", flex: 1 },
    { field: "Oil Filling", headerName: "Oil Filling", flex: 1 },
    { field: "Presser Foot", headerName: "Presser Foot", flex: 1 },
    { field: "Take up Rubber", headerName: "Take up Rubber", flex: 1 },
    { field: "Take up Spring", headerName: "Take up Spring", flex: 1 },
    { field: "Tension Assembly", headerName: "Tension Assembly", flex: 1 },
    { field: "Timing Components", headerName: "Timing Components", flex: 1 },
  ];

  const columns1 = [
    {
      field: "Serial_No",
      headerName: "Serial No",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    { field: "Brand", headerName: "Brand", flex: 1 },
    {
      field: "Bobbin Case",
      headerName: "Bobbin Case",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
    },
    {
      field: "Dust Remove",
      headerName: "Dust Remove",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
    },
    {
      field: "Feed Dog",
      headerName: "Feed Dog",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
    },
    {
      field: "Hook Assembly",
      headerName: "Hook Assembly",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
    },
    {
      field: "M_Year",
      headerName: "M_Year",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
    },
    {
      field: "Oil Filling",
      headerName: "Oil Filling",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
    },
    {
      field: "Presser Foot",
      headerName: "Presser Foot",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
    },
    {
      field: "Take up Rubber",
      headerName: "Take up Rubber",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
    },
    {
      field: "Take up Spring",
      headerName: "Take up Spring",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
    },
    {
      field: "Tension Assembly",
      headerName: "Tension Assembly",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
    },
    {
      field: "Timing Components",
      headerName: "Timing Components",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
    },
  ];

  return (
    <PageMain title="Dynamic Seat Planner">
    <Box >
     


        <Grid container spacing={2}>
          <Grid item xs={10}>
            {" "}
            <h1>Sewing machine monitoring system</h1>
          </Grid>
          <Grid item xs={2}>
            {" "}
            <Button
              color="primary"
              sx={{ marginTop: 4 }}
              variant="contained"
              onClick={() => navigate("/Sewing/add")}
            >
              {" "}
              Add New
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ paddingTop: 5 }}>
          <Grid item xs={6}>
            <h3 style={{ textAlign: "center" }}>Working Machine</h3>
            <Box
              m="0 0 0 0"
              width={"100%"}
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: "#4f86f7",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "navy",
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "#bcd4e6",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: "#",
                },
                "& .MuiCheckbox-root": {
                  color: `#4f86f7 !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `#4f86f7  !important`,
                },
              }}
            >
              <DataGrid
                rows={working_swing}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.Serial_No}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <h3 style={{ textAlign: "center" }}>Due Maintenance</h3>
            <Box
              m="0 0 0 0"
              width={"100%"}
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                  "&.low-value-cell": {
                    backgroundColor: "red",
                  },
                },
                "& .name-column--cell": {
                  color: "#4f86f7",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "navy",
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "#bcd4e6",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: "",
                },
                "& .MuiCheckbox-root": {
                  color: `#4f86f7 !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `#4f86f7  !important`,
                },
              }}
            >
              <DataGrid
                rows={due_swing}
                columns={columns1}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.Serial_No}
                getCellClassName={(params) => {
                  const fieldsToCheck = [
                    "Bobbin Case",
                    "Dust Remove",
                    "Feed Dog",
                    "Hook Assembly",
                    "M Year",
                    "Oil Filling",
                    "Presser Foot",
                    "Take up Rubber",
                    "Take up Spring",
                    "Tension Assembly",
                    "Timing Components",
                  ];
                  return fieldsToCheck.includes(params.field) &&
                    params.value < 100
                    ? "low-value-cell"
                    : "";
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: 5 }}>
          <Grid>
            <h3 style={{ textAlign: "center" }}>All Machine</h3>
            <Box
              m="5px"
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: "#4f86f7",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#5b92e5",
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "#bcd4e6",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: "",
                },
                "& .MuiCheckbox-root": {
                  color: `black !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `black !important`,
                },
              }}
            >
              <DataGrid
                rows={allMachine}
                columns={column3}
                slots={{ toolbar: GridToolbar }}
                getRowId={(row) => row.Serial_No}
              />
            </Box>
          </Grid>
        </Grid>
     
    </Box>
    </PageMain>
  );
}
