import React, { useState, useEffect } from "react";
import axios from "axios";
import PageMain from "../../components/PageMain";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  Checkbox,
  FormControlLabel,
  TableCell,
  Typography,
  Paper,
  Modal,
  TextField,
  Button,
  Switch,
  TableSortLabel,
  colors,
} from "@mui/material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { Grid, Box, Divider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const LookUp_performance = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [toggleDisplay, setToggleDisplay] = useState(false); // State to track toggle status
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [openPopupSwingActivity, setopenPopupSwingActivity] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [predictedPerformance, setPredictedPerformance] = useState("");

  // Define your sewing activities
  const sewingActivities = [
    "Dart Stitching",
    "Seam Reinforcement",
    "Edge Finishing",
    "Pattern Storage and Organization",
    "Sewing Machine Maintenance",
    "Speed and Accuracy Challenge",
    "Pattern Reading and Cutting Exercise",
    "Hemming Practice",
    "Button and Buttonhole Practice",
    "Zipper Installation Practice",
    "Garment Fitting",
  ];

  // Function to handle checkbox change
  const handleCheckboxChange = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(
        selectedActivities.filter((item) => item !== activity)
      );
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/data") // Update the URL if needed
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data); // Initialize filtered data with all data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Filter data based on search input
    let filtered = data.filter((row) => {
      return (

        row["Emp_No"]?.toLowerCase().includes(searchInput.toLowerCase()) || 

        row.Name.toLowerCase().includes(searchInput.toLowerCase())
        // Add more conditions for other fields if needed
      );
    });

    // Apply additional filter based on toggle status
    if (toggleDisplay) {
      filtered = filtered.filter(
        (row) =>
          row.Evolution_04 > row.Evolution_05 &&
          row.Evolution_05 > row.Last_Evolution
      );
    }

    // Apply sorting
    if (orderBy !== "") {
      filtered.sort((a, b) => {
        if (order === "asc") {
          return a[orderBy] > b[orderBy] ? 1 : -1;
        } else {
          return a[orderBy] < b[orderBy] ? 1 : -1;
        }
      });
    }
    setFilteredData(filtered);
  }, [data, searchInput, toggleDisplay, orderBy, order]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleToggleChange = () => {
    setToggleDisplay(!toggleDisplay); // Toggle the display
  };

  const handleSort = (column) => {
    if (column === orderBy) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(column);
      setOrder("asc");
    }
  };

  const handleOpenPopup = async (row) => {
    setSelectedRow(row);
    setOpenPopup(true);

    // Automatically fetch prediction data when modal opens
    const inputData = {
      Evolution_01: row.Evolution_01,
      Evolution_02: row.Evolution_02,
      Evolution_03: row.Evolution_03,
      Evolution_04: row.Evolution_04,
      Evolution_05: row.Evolution_05,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        inputData
      );
      setPredictedPerformance(response.data.predicted_next_performance);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setSelectedRow(null);
    setPredictedPerformance("");
  };

  //Assign Button popup
  const handleOpenPopupSwingActivity = (row) => {
    setSelectedRow(row);
    setopenPopupSwingActivity(true);
  };

  const handleClosePopupSwingActivity = () => {
    setopenPopupSwingActivity(false);
    setSelectedRow(null);
  };

  return (
    <PageMain>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          columnSpacing={{ xs: 5, sm: 4, md: 4 }}
          sx={{ marginTop: "10px" }}
        >
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h1"
              sx={{
                lineHeight: 1,
                fontWeight: "500",
                fontSize: "1.625rem",
                fontFamily: "poppins",
                marginBottom: "10px",
              }}
            >
              LookUp Performance
            </Typography>
          </Grid>
         
          <Grid item xs={12} sm={6}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchInput}
              onChange={handleSearchInputChange}
              style={{ marginBottom: "10px", width: "100%" }}
            />
          </Grid>
        </Grid>
        <Grid>
            <a href="">Add Employee</a>
          </Grid>
      </Box>
      <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
        <Typography
          variant="h2"
          sx={{
            lineHeight: 1,
            fontWeight: "500",
            fontSize: "1.25rem",
            fontFamily: "poppins",
          }}
        >
          Employee Performance Data
        </Typography>

        <Grid
          container
          alignItems="center"
          spacing={2}
          style={{ marginBottom: "2px", marginLeft: "70%" }}
        >
          <Grid item>
            <Typography variant="body1">Recommendations Display:</Typography>
          </Grid>
          <Grid item>
            <Switch checked={toggleDisplay} onChange={handleToggleChange} />
          </Grid>
        </Grid>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "ï»¿Emp_No"}
                  direction={orderBy === "ï»¿Emp_No" ? order : "asc"}
                  onClick={() => handleSort("ï»¿Emp_No")}
                  IconComponent={
                    order === "asc" ? ArrowDownwardIcon : ArrowUpwardIcon
                  }
                >
                  Emp No
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "Name"}
                  direction={orderBy === "Name" ? order : "asc"}
                  onClick={() => handleSort("Name")}
                  IconComponent={
                    order === "asc" ? ArrowDownwardIcon : ArrowUpwardIcon
                  }
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "Evolution_01"}
                  direction={orderBy === "Evolution_01" ? order : "asc"}
                  onClick={() => handleSort("Evolution_01")}
                  IconComponent={
                    order === "asc" ? ArrowDownwardIcon : ArrowUpwardIcon
                  }
                >
                  Evolution 01
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "Evolution_02"}
                  direction={orderBy === "Evolution_02" ? order : "asc"}
                  onClick={() => handleSort("Evolution_02")}
                  IconComponent={
                    order === "asc" ? ArrowDownwardIcon : ArrowUpwardIcon
                  }
                >
                  Evolution 02
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "Evolution_03"}
                  direction={orderBy === "Evolution_03" ? order : "asc"}
                  onClick={() => handleSort("Evolution_03")}
                  IconComponent={
                    order === "asc" ? ArrowDownwardIcon : ArrowUpwardIcon
                  }
                >
                  Evolution 03
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "Evolution_04"}
                  direction={orderBy === "Evolution_04" ? order : "asc"}
                  onClick={() => handleSort("Evolution_04")}
                  IconComponent={
                    order === "asc" ? ArrowDownwardIcon : ArrowUpwardIcon
                  }
                >
                  Evolution 04
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "Evolution_05"}
                  direction={orderBy === "Evolution_05" ? order : "asc"}
                  onClick={() => handleSort("Evolution_05")}
                  IconComponent={
                    order === "asc" ? ArrowDownwardIcon : ArrowUpwardIcon
                  }
                >
                  Evolution 05
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "Last_Evolution"}
                  direction={orderBy === "Last_Evolution" ? order : "asc"}
                  onClick={() => handleSort("Last_Evolution")}
                  IconComponent={
                    order === "asc" ? ArrowDownwardIcon : ArrowUpwardIcon
                  }
                >
                  Last Evolution
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={orderBy === "Predicted_Last_Evolution"}
                  direction={
                    orderBy === "Predicted_Last_Evolution" ? order : "asc"
                  }
                  onClick={() => handleSort("Predicted_Last_Evolution")}
                  IconComponent={
                    order === "asc" ? ArrowDownwardIcon : ArrowUpwardIcon
                  }
                >
                  Predicted Last Evolution
                </TableSortLabel>
              </TableCell>

              <TableCell>Recommendation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <Switch checked={toggleDisplay} onChange={handleToggleChange} /> */}
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row["Emp_No"]}</TableCell>
                <TableCell>{row.Name}</TableCell>
                <TableCell>{row.Evolution_01}</TableCell>
                <TableCell>
                  {row.Evolution_02 < row.Evolution_01 ? (
                    <BookmarkRemoveIcon sx={{ color: "red", fontSize: 20 }} />
                  ) : (
                    <BookmarkAddedIcon sx={{ color: "green", fontSize: 20 }} />
                  )}
                  {row.Evolution_02}
                </TableCell>
                <TableCell>
                  {row.Evolution_03 < row.Evolution_02 ? (
                    <BookmarkRemoveIcon sx={{ color: "red", fontSize: 20 }} />
                  ) : (
                    <BookmarkAddedIcon sx={{ color: "green", fontSize: 20 }} />
                  )}
                  {row.Evolution_03}
                </TableCell>
                <TableCell>
                  {row.Evolution_04 < row.Evolution_03 ? (
                    <BookmarkRemoveIcon sx={{ color: "red", fontSize: 20 }} />
                  ) : (
                    <BookmarkAddedIcon sx={{ color: "green", fontSize: 20 }} />
                  )}
                  {row.Evolution_04}
                </TableCell>
                <TableCell>
                  {row.Evolution_05 < row.Evolution_04 ? (
                    <BookmarkRemoveIcon sx={{ color: "red", fontSize: 20 }} />
                  ) : (
                    <BookmarkAddedIcon sx={{ color: "green", fontSize: 20 }} />
                  )}
                  {row.Evolution_05}
                </TableCell>
                <TableCell>
                  {row.Last_Evolution < row.Evolution_05 ? (
                    <BookmarkRemoveIcon sx={{ color: "red", fontSize: 20 }} />
                  ) : (
                    <BookmarkAddedIcon sx={{ color: "green", fontSize: 20 }} />
                  )}
                  {row.Last_Evolution}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    onClick={() => handleOpenPopup(row)}
                    sx={{
                      backgroundColor:
                        "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                      borderRadius: "8px",
                      color: "white",
                      padding: "6px 12px",
                      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#00008B",
                      },
                    }}
                  >
                    Predicted Performance
                  </Button>
                </TableCell>
                <TableCell>
                  {row.Evolution_04 > row.Evolution_05 &&
                    row.Evolution_05 > row.Last_Evolution && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenPopupSwingActivity(row)}
                      >
                        Assign
                      </Button>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Modal
        open={openPopupSwingActivity}
        onClose={handleClosePopupSwingActivity}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxWidth: "50%",
            maxHeight: "80%",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" component="h2" id="modal-modal-title">
            Sewing Activity Suggestion
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {sewingActivities.map((activity) => (
              <FormControlLabel
                key={activity}
                control={
                  <Checkbox
                    checked={selectedActivities.includes(activity)}
                    onChange={() => handleCheckboxChange(activity)}
                  />
                }
                label={activity}
              />
            ))}
          </Typography>
        </Box>
      </Modal>

      <Modal
      open={openPopup}
      onClose={handleClosePopup}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          width: '90%',
          maxWidth: 500,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" id="modal-title" sx={{ fontWeight: 'bold' }}>
            Employee Performance Prediction
          </Typography>
          <Button
            onClick={handleClosePopup}
            sx={{
              minWidth: 0,
              width: 36,
              height: 36,
              borderRadius: '50%',
              bgcolor: 'error.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'error.dark',
              },
            }}
          >
            <CloseIcon />
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {selectedRow && (
          <>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Employee No:</strong> {selectedRow["ï»¿Emp_No"]}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Name:</strong> {selectedRow.Name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Evolution 01:</strong> {selectedRow.Evolution_01}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Evolution 02:</strong> {selectedRow.Evolution_02}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Evolution 03:</strong> {selectedRow.Evolution_03}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Evolution 04:</strong> {selectedRow.Evolution_04}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Evolution 05:</strong> {selectedRow.Evolution_05}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Actual Last Performance:</strong> {selectedRow.Last_Evolution}
            </Typography>
            <Typography variant="body1">
              <strong>Predicted Last Performance:</strong> {predictedPerformance}
            </Typography>
          </>
        )}
      </Box>
    </Modal>
    </PageMain>
  );
};

export default LookUp_performance;
