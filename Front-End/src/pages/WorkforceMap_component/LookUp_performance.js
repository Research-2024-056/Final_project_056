import React, { useState, useEffect } from "react";
import axios from "axios";
import PageMain from "../../components/PageMain";
import { Button, Box, Typography, Paper, Switch } from "@mui/material";
import TextField from "@mui/material/TextField";
import AddEmployeeModal from "../../components/WorkforceMap/AddEmployeeModal";
import PerformanceTable from "../../components/WorkforceMap/PerformanceTable";
import SewingActivityModal from "../../components/WorkforceMap/SewingActivityModal";
import PerformancePredictionModal from "../../components/WorkforceMap/PerformancePredictionModal";

const LookUpPerformance = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [toggleDisplay, setToggleDisplay] = useState(false);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [openPopupSwingActivity, setopenPopupSwingActivity] = useState(false);
  const [assignedActivities, setAssignedActivities] = useState({});
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [predictedPerformance, setPredictedPerformance] = useState("");
  const [openAddEmployeePopup, setOpenAddEmployeePopup] = useState(false);
  const [error, setError] = useState("");
  const [newEmployee, setNewEmployee] = useState({ Emp_No: "", Name: "" });

  useEffect(() => {
    axios
      .get("http://localhost:5000/data")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    let filtered = data.filter((row) => {
      return (
        row["Emp_No"]?.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.Name.toLowerCase().includes(searchInput.toLowerCase())
      );
    });

    if (toggleDisplay) {
      filtered = filtered.filter(
        (row) =>
          row.Evolution_04 > row.Evolution_05 &&
          row.Evolution_05 > row.Last_Evolution
      );
    }

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
    setToggleDisplay(!toggleDisplay);
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

  const handleOpenPopupSwingActivity = (row) => {
    setSelectedRow(row);
    setSelectedActivities(assignedActivities[row.Emp_No] || []);
    setopenPopupSwingActivity(true);
  };

  // useEffect(() => {
  //   const savedActivities = localStorage.getItem("assignedActivities");
  //   console.log("Loaded activities from local storage:", savedActivities);
  //   if (savedActivities) {
  //     try {
  //       setAssignedActivities(JSON.parse(savedActivities));
  //     } catch (error) {
  //       console.error("Error parsing saved activities:", error);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log("Saving activities to local storage:", assignedActivities);
  //   localStorage.setItem("assignedActivities", JSON.stringify(assignedActivities));
  // }, [assignedActivities]);

  const handleActivitiesSubmit = (laborerId, activities) => {
    setAssignedActivities((prev) => ({ ...prev, [laborerId]: activities }));
    setopenPopupSwingActivity(false);
  };

  const handleOpenAddEmployeePopup = () => {
    setOpenAddEmployeePopup(true);
  };

  const handleCloseAddEmployeePopup = () => {
    setOpenAddEmployeePopup(false);
    setNewEmployee({ Emp_No: "", Name: "" });
    setError("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = () => {
    if (newEmployee.Emp_No === "" || newEmployee.Name === "") {
      setError("Employee ID and Name are required.");
      return;
    }

    axios
      .post("http://localhost:5000/add_employee", newEmployee)
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setData([...data, response.data]);
          handleCloseAddEmployeePopup();
        }
      })
      .catch(() => {
        setError("An error occurred while adding the employee.");
      });
  };

  const handleDownload = () => {
    axios({
      url: "http://localhost:5000/download",
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Employee_Evolution.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error(
          "Error downloading the file:",
          error.response?.data || error.message
        );
      });
  };

  return (
    <PageMain>
      <Box sx={{ width: "100%", margin: "0 auto" }}>
        <Typography
          variant="h1"
          sx={{
            lineHeight: 1,
            fontWeight: "500",
            fontSize: "1.625rem",
            fontFamily: "poppins",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          LookUp Performance
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenAddEmployeePopup}
              sx={{ mr: "10px" }}
            >
              Add Employee
            </Button>

            <AddEmployeeModal
              open={openAddEmployeePopup}
              onClose={handleCloseAddEmployeePopup}
              newEmployee={newEmployee}
              error={error}
              onInputChange={handleInputChange}
              onAddEmployee={handleAddEmployee}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleDownload}
            >
              Download CSV
            </Button>
          </Box>

          <TextField
            label="Search"
            variant="outlined"
            value={searchInput}
            onChange={handleSearchInputChange}
            sx={{
              marginLeft: "20px",
              width: "250px",
            }}
          />
        </Box>

        <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // Aligns items at both ends of the container
              marginBottom: "20px", // Optional, for spacing below the flex container
            }}
          >
            <Typography
              variant="h2"
              sx={{
                lineHeight: 1,
                fontWeight: "500",
                fontSize: "1.25rem",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Employee Performance Data
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1" sx={{ marginRight: "10px" }}>
                Recommendations
              </Typography>
              <Switch checked={toggleDisplay} onChange={handleToggleChange} />
            </Box>
          </Box>

          <PerformanceTable
            data={filteredData}
            orderBy={orderBy}
            order={order}
            onSort={handleSort}
            onOpenPopup={handleOpenPopup}
            onOpenPopupSwingActivity={handleOpenPopupSwingActivity}
            assignedActivities={assignedActivities}
            toggleDisplay={toggleDisplay}
          />
        </Paper>
        <SewingActivityModal
          open={openPopupSwingActivity}
          onClose={() => setopenPopupSwingActivity(false)}
          selectedActivities={selectedActivities}
          onCheckboxChange={(activity) => {
            setSelectedActivities((prev) =>
              prev.includes(activity)
                ? prev.filter((a) => a !== activity)
                : [...prev, activity]
            );
          }}
          onSubmit={() =>
            handleActivitiesSubmit(selectedRow.Emp_No, selectedActivities)
          }
        />
        <PerformancePredictionModal
          open={openPopup}
          onClose={handleClosePopup}
          selectedRow={selectedRow}
          predictedPerformance={predictedPerformance}
        />
      </Box>
    </PageMain>
  );
};

export default LookUpPerformance;
