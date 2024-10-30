import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import PageMain from "../../components/PageMain";


import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function SewingDashboard({ children }) {
  const navigate = useNavigate();

  const [working_swing, setWorkingSwing] = useState([]);
  const [due_swing, setDueSwing] = useState([]);
  const [allMachine, setAllMachine] = useState([]);


  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); 


  const fetchData = () => {
    axios
      .get("http://localhost:5005/collection/Inventory/working")
      .then((res) => {
        console.log(res.data);
        setWorkingSwing(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5005/collection/Inventory/maintenance-check")
      .then((res) => {
        console.log(res.data);
        setDueSwing(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5005/collection/Inventory/all")
      .then((res) => {
        console.log(res.data);
        setAllMachine(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData(); 

   
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); // 5000 milliseconds


    return () => clearInterval(intervalId);
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
    backgroundColor: value < 24 ? "#dc143c" : "inherit",
    cursor: "pointer", // Make the cursor a pointer to indicate it's clickable
  });

  const deleteItem = (no) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      const ob = {
        serial_no: no,
      };
      axios
        .post("http://localhost:5005/collection/Inventory/delete", ob)
        .then((res) => {
         
          setSnackbarMessage("Deleted Machine");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);

          fetchData();
        })
        .catch((err) => {
          console.log(err);
    
          setSnackbarMessage("Failed to Delete Machine");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    }
  };

  const handleCellClick = (row, val) => {
    const ob = {
      Brand: row.Brand,
      Type: row.Type,
      Fabric_Type: row.Fabric_Type,
      M_Year: row.M_Year,
      Serial_No: row.Serial_No,
      usageDict: {
        "Take up Spring": Number(0),
        "Take up Rubber": Number(0),
        "Bobbin Case": Number(0),
        "Feed Dog": Number(0),
        "Presser Foot": Number(0),
        "Tension Assembly": Number(0),
        "Hook Assembly": Number(0),
        "Timing Components": Number(0),
        "Oil Filling": Number(0),
        "Dust Remove": Number(0),
      },
      status: row.status,
    };
    if (window.confirm("Are you sure you want to replace it?")) {

      axios
        .post("http://localhost:5005/predictupdate/Inventory", ob)
        .then((response) => {
          const ob2 = {
            serial_no: response.data.Serial_No,
            column_name: val,
            column_value: response.data[val],
          };
          axios
            .post("http://localhost:5005/collection/Inventory/update", ob2)
            .then((res) => {
        
              setSnackbarMessage("Replaced Component");
              setSnackbarSeverity("success");
              setOpenSnackbar(true);

              fetchData();
            })
            .catch((err) => {
              console.log(err);
         
              setSnackbarMessage("Failed to Replace Component");
              setSnackbarSeverity("error");
              setOpenSnackbar(true);
            });
        })
        .catch((error) => {
          console.error("Error sending data:", error);
          alert("Failed to send data!");
        });
    }
  };

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
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        // **Use the DeleteIcon from Material-UI instead of a simple 'X'**
        <DeleteIcon
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => deleteItem(params.row.Serial_No)}
        />
      ),
    },
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
      renderCell: (params) => (
        <div onClick={() => handleCellClick(params.row, "Bobbin Case")}>
          {params.value}
        </div>
      ),
    },
    {
      field: "Dust Remove",
      headerName: "Dust Remove",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
      renderCell: (params) => (
        <div onClick={() => handleCellClick(params.row, "Dust Remove")}>
          {params.value}
        </div>
      ),
    },
    {
      field: "Feed Dog",
      headerName: "Feed Dog",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
      renderCell: (params) => (
        <div onClick={() => handleCellClick(params.row, "Feed Dog")}>
          {params.value}
        </div>
      ),
    },
    {
      field: "Hook Assembly",
      headerName: "Hook Assembly",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
      renderCell: (params) => (
        <div onClick={() => handleCellClick(params.row, "Hook Assembly")}>
          {params.value}
        </div>
      ),
    },
    {
      field: "M_Year",
      headerName: "M_Year",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
      renderCell: (params) => (
        <div onClick={() => handleCellClick(params.row, "M_Year")}>
          {params.value}
        </div>
      ),
    },
    {
      field: "Oil Filling",
      headerName: "Oil Filling",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
      renderCell: (params) => (
        <div onClick={() => handleCellClick(params.row, "Oil Filling")}>
          {params.value}
        </div>
      ),
    },
    {
      field: "Presser Foot",
      headerName: "Presser Foot",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
      renderCell: (params) => (
        <div onClick={() => handleCellClick(params.row, "Presser Foot")}>
          {params.value}
        </div>
      ),
    },
    {
      field: "Take up Rubber",
      headerName: "Take up Rubber",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
      renderCell: (params) => (
        <div onClick={() => handleCellClick(params.row, "Take up Rubber")}>
          {params.value}
        </div>
      ),
    },
    {
      field: "Take up Spring",
      headerName: "Take up Spring",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
      renderCell: (params) => (
        <div onClick={() => handleCellClick(params.row, "Take up Spring")}>
          {params.value}
        </div>
      ),
    },
    {
      field: "Tension Assembly",
      headerName: "Tension Assembly",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
      renderCell: (params) => (
        <div onClick={() => handleCellClick(params.row, "Tension Assembly")}>
          {params.value}
        </div>
      ),
    },
    {
      field: "Timing Components",
      headerName: "Timing Components",
      flex: 1,
      cellClassName: (params) => getCellStyles(params.value),
      renderCell: (params) => (
        <div onClick={() => handleCellClick(params.row, "Timing Components")}>
          {params.value}
        </div>
      ),
    },
  ];


  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <PageMain title="Dynamic Seat Planner">
      <Box>
        {/* ** Header Section** */}
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            marginBottom: 4,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Grid container alignItems="center">
            <Grid item xs={12} md={10}>
              <Typography variant="h4" component="h1" color="primary">
                Sewing Machine Monitoring System
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={2}
              sx={{
                textAlign: { xs: "left", md: "right" },
                marginTop: { xs: 2, md: 0 },
              }}
            >
              <Button
                color="primary"
                sx={{ display: "flex", alignItems: "center" }}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/AddSewingMachine")}
              >
                Add New
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={2} sx={{ paddingTop: 5 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" align="center" gutterBottom>
              Working Machine
            </Typography>
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
                  backgroundColor: "lightgray", 
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
                getRowId={(row) => row.Serial_No}
                slots={{ toolbar: GridToolbar }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" align="center" gutterBottom>
              Due Maintenance
            </Typography>
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
                  backgroundColor: "lightgray", 
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
                getRowId={(row) => row.Serial_No}
                slots={{ toolbar: GridToolbar }}
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
                    params.value < 24
                    ? "low-value-cell"
                    : "";
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: 5 }}>
          <Grid>
            <Typography variant="h6" align="center" gutterBottom>
              All Machine
            </Typography>
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
                  backgroundColor: "lightgray", 
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

      {/* **Snackbar for Notifications** */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          elevation={6}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageMain>
  );
}
