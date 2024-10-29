import React, { useState, useEffect } from "react";
import axios from "axios";
import PageMain from "../../components/PageMain";
import DownloadIcon from "@mui/icons-material/Download";
import Typography from "@mui/material/Typography";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Drawer from '@mui/material/Drawer';
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { blue, red, green } from "@mui/material/colors";
import * as XLSX from "xlsx";

const SeatPlanner = () => {
  const [lines, setLines] = useState(1);
  const [employeesPerLine, setEmployeesPerLine] = useState(1);
  const [seatPlan, setSeatPlan] = useState(() => {
    const savedSeatPlan = localStorage.getItem("seatPlan");
    return savedSeatPlan ? JSON.parse(savedSeatPlan) : [];
  });
  const [filterOption, setFilterOption] = useState("average");
  const [removedLaborers, setRemovedLaborers] = useState([]);
  const [unassignedLaborers, setUnassignedLaborers] = useState([]);
  const [isSeatPlanGenerated, setIsSeatPlanGenerated] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState(() => {
    const savedTasks = localStorage.getItem("assignedTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTaskTab, setSelectedTaskTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskData, setEditTaskData] = useState({});

  const handleEditTask = (taskIndex) => {
    const taskToEdit = assignedTasks[taskIndex];
    setEditTaskData({
      productId: taskToEdit.productId,
      startDate: taskToEdit.startDate,
      smv: taskToEdit.smv,
      endDate: taskToEdit.endDate,
    });
    setIsEditing(true);
  };
  // Handle input changes for editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTaskData((prevData) => ({ ...prevData, [name]: value }));
  };
  // Save changes and exit edit mode
  const handleSaveChanges = () => {
    // Update the task details in the list (assuming setAssignedTasks is available)
    assignedTasks[selectedTaskTab] = {
      ...assignedTasks[selectedTaskTab],
      ...editTaskData,
    };
    setIsEditing(false); // Exit edit mode
  };

  const handleDeleteTask = (taskIndex) => {
    const taskToDelete = assignedTasks[taskIndex];

    // Confirm the deletion
    if (
      window.confirm(
        `Are you sure you want to delete Task ${taskToDelete.productId}?`
      )
    ) {
      // Remove the task from the state
      const updatedTasks = assignedTasks.filter(
        (_, index) => index !== taskIndex
      );
      setAssignedTasks(updatedTasks);

      // Call the backend API to delete the task
      axios
        .post("http://127.0.0.1:5010/delete_task", {
          taskId: taskToDelete.productId,
        }) // Adjust the endpoint accordingly
        .then(() => {
          console.log("Task deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
        });
    }
  };

  const [taskDetails, setTaskDetails] = useState({
    productId: "",
    teamId: "",
    smv:"",
    laborCount: "",
    startDate: "",
    endDate: "",
  });

  const handleRemoveLabor = (lineIndex, seatIndex, employee) => {
    setRemovedLaborers((prev) => [...prev, employee]);
    setSeatPlan((prev) => {
      const updated = [...prev];
      updated[lineIndex][seatIndex] = null;
      return updated;
    });
  };

  const handleReassignLabor = (lineIndex, seatIndex, empNo) => {
    const selectedLaborer = unassignedLaborers.find(
      (labor) => labor.Emp_No === empNo
    );
    if (selectedLaborer) {
      setSeatPlan((prev) => {
        const updated = [...prev];
        updated[lineIndex][seatIndex] = {
          ...selectedLaborer,
          isReassigned: true,
        };
        return updated;
      });
      setRemovedLaborers((prev) =>
        prev.filter((labor) => labor.Emp_No !== empNo)
      );
      fetchUnassignedLaborers();
    }
  };

  const handleDownload = () => {
    const data = seatPlan
      .flat()
      .filter((emp) => emp)
      .map((emp) => ({
        Name: emp.Name,
        Emp_No: emp.Emp_No,
        Line: seatPlan.findIndex((line) => line.includes(emp)) + 1,
      }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Assigned Laborers");
    XLSX.writeFile(wb, "assigned_laborers.xlsx");
  };

  // Sync data to local storage
  useEffect(() => {
    localStorage.setItem("assignedTasks", JSON.stringify(assignedTasks));
    localStorage.setItem("seatPlan", JSON.stringify(seatPlan));
  }, [assignedTasks, seatPlan]);

  // Load assigned tasks from backend on mount
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5010/load_assigned_tasks")
      .then((response) => setAssignedTasks(response.data))
      .catch((error) => console.error("Error loading assigned tasks:", error));
  }, []);

  // Generate seat plan, excluding assigned employees
  const generateSeatPlan = async () => {
    setIsLoading(true);
    const startTime = Date.now();

    try {
      const assignedEmpNos = assignedTasks.flatMap((task) =>
        task.laborers.map((labor) => labor.Emp_No)
      );

      const response = await axios.post("http://127.0.0.1:5010/seat_plan", {
        num_lines: lines,
        employees_per_line: employeesPerLine,
        filter_option: filterOption,
        exclude_assigned: assignedEmpNos,
      });
      setSeatPlan(response.data);
      setIsSeatPlanGenerated(true);
      setShowBanner(false);
    } catch (error) {
      console.error("Error generating seat plan:", error);
    } finally {
      const elapsedTime = Date.now() - startTime;
      const minimumDelay = 2000;
      const remainingTime = minimumDelay - elapsedTime;

      if (remainingTime > 0) {
        setTimeout(() => setIsLoading(false), remainingTime);
      } else {
        setIsLoading(false);
      }
    }
  };

  const handleAssignLaborers = () => {
    if (
      !taskDetails.productId ||
      !taskDetails.teamId ||
      !taskDetails.laborCount ||
      !taskDetails.startDate ||
      !taskDetails.endDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    const laborers = seatPlan.flat().filter((emp) => emp);
    const newTask = {
      ...taskDetails,
      laborers,
    };
    setAssignedTasks([...assignedTasks, newTask]);
    setIsDrawerOpen(false);

    // Save to backend
    axios
      .post("http://127.0.0.1:5010/save_assigned_tasks", {
        assignedTasks: [...assignedTasks, newTask],
      })
      .catch((error) => console.error("Error saving tasks:", error));

    handleClear();
  };

  const handleClear = () => {
    setLines(1);
    setEmployeesPerLine(1);
    setSeatPlan([]);
    setFilterOption("average");
    setRemovedLaborers([]);
    setUnassignedLaborers([]);
    setIsSeatPlanGenerated(false);
    setShowBanner(true);
  };

  useEffect(() => {
    if (seatPlan.length > 0) {
      fetchUnassignedLaborers();
    }
  });

  const fetchUnassignedLaborers = async () => {
    try {
      const assignedEmpNos = seatPlan
        .flat()
        .filter((emp) => emp)
        .map((emp) => emp.Emp_No);
      const response = await axios.get(
        "http://127.0.0.1:5010/unassigned_laborers",
        {
          params: { assigned_emp_nos: assignedEmpNos },
        }
      );
      setUnassignedLaborers(response.data);
    } catch (error) {
      console.error("Error fetching unassigned laborers:", error);
    }
  };

  const [assignedLaborers, setAssignedLaborers] = useState([]);

  const fetchAssignedLaborers = (taskIndex) => {
    const laborers = assignedTasks[taskIndex].laborers;
    setAssignedLaborers(laborers);
  };

  const [mainTab, setMainTab] = useState("seatPlanner");

  const renderSeats = (line, lineIndex) => {
    return line.map((employee, seatIndex) => (
      <Grid item key={`${lineIndex}-${seatIndex}`} xs={12} sm={6} md={4} lg={3}>
        <Card
          sx={{
            backgroundColor: employee
              ? employee.isReassigned
                ? green[50]
                : blue[50]
              : red[50],
            border: employee
              ? employee.isReassigned
                ? `2px solid ${green[500]}`
                : "none"
              : "none",
            padding: "5px",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent
            sx={{ textAlign: "center", padding: "8px", position: "relative" }}
          >
            {employee ? (
              <>
                <Avatar
                  sx={{
                    backgroundColor: blue[500],
                    margin: "0 auto",
                    width: 30,
                    height: 30,
                  }}
                >
                  <PersonIcon />
                </Avatar>
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: "5px",
                    fontWeight: "500",
                    fontSize: "0.75rem",
                  }}
                >
                  {employee.Name} (ID: {employee.Emp_No})
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: "0.7rem" }}
                >
                  Performance: {employee.Performance.toFixed(2)}
                </Typography>
                <IconButton
                  sx={{ position: "absolute", top: 0, right: 0 }}
                  onClick={() =>
                    handleRemoveLabor(lineIndex, seatIndex, employee)
                  }
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
                {employee.isReassigned && (
                  <AssignmentIndIcon
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      color: green[500],
                    }}
                  />
                )}
              </>
            ) : (
              <FormControl fullWidth size="small">
                <Select
                  value=""
                  displayEmpty
                  onChange={(e) =>
                    handleReassignLabor(lineIndex, seatIndex, e.target.value)
                  }
                  renderValue={(selected) => selected || "Select Laborer"}
                >
                  {unassignedLaborers.map((laborer) => (
                    <MenuItem key={laborer.Emp_No} value={laborer.Emp_No}>
                      {laborer.Emp_No} - {laborer.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <PageMain title="Dynamic Seat Planner">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px", // More spacing at the bottom for a cleaner look
        }}
      >
        <Tabs
          value={mainTab}
          onChange={(e, newValue) => setMainTab(newValue)}
          sx={{
            backgroundColor: "#ffffff", // Use white for a cleaner, more professional background
            borderRadius: "12px", // Slightly larger border-radius for smooth edges
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Add soft shadow for depth
            padding: "10px 20px", // More padding for better spacing
          }}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#007bff", // Change the indicator color for a modern touch
              height: "4px", // Increase indicator thickness
              borderRadius: "2px", // Rounded edges for indicator
            },
          }}
        >
          <Tab
            label="Dynamic Seat Planner"
            value="seatPlanner"
            sx={{
              fontSize: "16px", // Larger text size
              fontWeight: "bold", // Bolder text for emphasis
              padding: "12px 24px", // More padding for larger clickable areas
            }}
          />
          <Tab
            label="Tasks"
            value="tasks"
            sx={{
              fontSize: "16px", // Larger text size
              fontWeight: "bold", // Bolder text for emphasis
              padding: "12px 24px", // More padding for larger clickable areas
            }}
          />
        </Tabs>
      </Box>

      {/* Show Task Tabs if selected */}
      {mainTab === "tasks" && (
        <div
          style={{
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            width: "600px",
            margin: "auto",
          }}
        >
          {/* Task Tabs */}
          <div style={{ marginBottom: "20px" }}>
            <Tabs
              value={selectedTaskTab}
              onChange={(e, newValue) => {
                setSelectedTaskTab(newValue);
                setAssignedLaborers([]);
                setIsEditing(false);
              }}
              variant="scrollable"
              scrollButtons="auto"
              style={{ borderBottom: "1px solid #ccc" }}
            >
              {assignedTasks.map((task, index) => (
                <Tab key={index} label={task.productId} />
              ))}
            </Tabs>
          </div>

          {/* Task details display */}
          {assignedTasks.length > 0 && (
            <div
              style={{
                padding: "16px",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ marginBottom: "10px", fontSize: "20px" }}>
                Task Details
              </h3>

              <p>
                <strong>Product ID:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="productId"
                    value={editTaskData.productId}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                ) : (
                  assignedTasks[selectedTaskTab].productId
                )}
              </p>
              <p>
                <strong>Team ID:</strong>{" "}
                {assignedTasks[selectedTaskTab].teamId}
              </p>
              <p>
                <strong>SMV:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="smv"
                    value={editTaskData.smv}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                ) : (
                  assignedTasks[selectedTaskTab].smv
                )}
              </p>
              <p>
                <strong>Labor Count:</strong>{" "}
                {assignedTasks[selectedTaskTab].laborCount}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {isEditing ? (
                  <input
                    type="date"
                    name="startDate"
                    value={editTaskData.startDate}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                ) : (
                  assignedTasks[selectedTaskTab].startDate
                )}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {isEditing ? (
                  <input
                    type="date"
                    name="endDate"
                    value={editTaskData.endDate}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                ) : (
                  assignedTasks[selectedTaskTab].endDate
                )}
              </p>

              {/* Assigned Laborers Toggle Button */}
              <Button
              variant="contained" color="success"
                onClick={() => {
                  if (assignedLaborers.length > 0) {
                    setAssignedLaborers([]);
                  } else {
                    fetchAssignedLaborers(selectedTaskTab, setAssignedLaborers);
                  }
                }}
              >
                <VisibilityIcon/> 
                {assignedLaborers.length > 0
                  ? "Hide Laborers"
                  :  "View Laborers"}
              </Button>

              {/* Assigned Laborers List */}
              {assignedLaborers.length > 0 && (
                <div
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#e3f2fd",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <h4>Assigned Laborers:</h4>
                  <ul>
                    {assignedLaborers.map((laborer) => (
                      <li key={laborer.Emp_No}>
                        {laborer.Name} (ID: {laborer.Emp_No})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Edit, Save/Cancel, and Delete buttons */}
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSaveChanges}
                      variant="contained" color="success"
                    >
                      <CheckCircleOutlineIcon style={{ marginRight: "4px" }}/>
                      Save
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outlined" color="error"
                    >
                       <CancelIcon style={{ marginRight: "4px" }} />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => handleEditTask(selectedTaskTab)}
                    variant="outlined"
                  >
                    <EditIcon style={{ marginRight: "4px" }}/>
                    Edit Task
                  </Button>
                )}

                <Button variant="outlined" color="error"
                  onClick={() => handleDeleteTask(selectedTaskTab)}
                  
                >
                  <DeleteOutlineIcon/>
                  Delete Task
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Seat Planner Section */}
      {mainTab === "seatPlanner" && (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "60px",
            }}
          >
            <TextField
              label="Number of Lines"
              type="number"
              value={lines}
              onChange={(e) => setLines(parseInt(e.target.value))}
              size="small"
              sx={{ maxWidth: { xs: "100%", sm: "120px" } }}
            />
            <TextField
              label="Labors Per Line"
              type="number"
              value={employeesPerLine}
              onChange={(e) => setEmployeesPerLine(parseInt(e.target.value))}
              size="small"
              sx={{ maxWidth: { xs: "100%", sm: "145px" } }}
            />
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="filter_option"
                name="filter_option"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                sx={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <FormControlLabel
                  value="average"
                  control={<Radio />}
                  label="Average"
                />
                <FormControlLabel
                  value="last_evolution"
                  control={<Radio />}
                  label="Last Evolution"
                />
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={generateSeatPlan}
              sx={{
                backgroundColor: "#1976D2",
                "&:hover": { backgroundColor: "#1565C0" },
                marginTop: { xs: "10px", md: "0" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Generate Seat Plan
            </Button>
            {isSeatPlanGenerated && (
              <Button variant="outlined" color="error" onClick={handleClear}>
                <CancelIcon style={{ marginRight: "4px" }} />
                Clear
              </Button>
            )}
            {isSeatPlanGenerated && (
              <Button
                variant="contained"
                color="success"
                onClick={() => setIsDrawerOpen(true)}
                sx={{
                  marginLeft: { sm: "50px" },
                }}
              >
                <AddTaskIcon style={{ marginRight: "4px" }} />
                Assign
              </Button>
            )}
            {isSeatPlanGenerated && (
              <Button
                variant="outlined"
                color="success"
                onClick={handleDownload}
              >
                <DownloadIcon />
                Download Seat Planner
              </Button>
            )}
          </Box>

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
                mt="10px"
                src="https://i.gifer.com/ZC9Y.gif"
                width="10%"
              />
            </Box>
          )}

          <Grid container spacing={2}>
            {seatPlan.map((line, lineIndex) => (
              <Grid item xs={12} key={`line-${lineIndex}`}>
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: "20px",
                    color: "#1E3A8A",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Production Line {lineIndex + 1}
                </Typography>

                <Grid container spacing={2} justifyContent="center">
                  {renderSeats(line, lineIndex)}
                </Grid>
              </Grid>
            ))}

            <Drawer anchor="right" open={isDrawerOpen}>
              <Box
                sx={{
                  width: "100%",
                  padding: 3,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Button
                  onClick={() => setIsDrawerOpen(false)}
                  sx={{ alignSelf: "flex-end" }}
                >
                  <CloseIcon />
                </Button>

                <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
                  Task Assigner
                </Typography>

                <TextField
                  label="Product ID"
                  fullWidth
                  margin="normal"
                  value={taskDetails.productId}
                  onChange={(e) =>
                    setTaskDetails({
                      ...taskDetails,
                      productId: e.target.value,
                    })
                  }
                  focused
                />
                <TextField
                  label="Team ID"
                  fullWidth
                  margin="normal"
                  value={taskDetails.teamId}
                  onChange={(e) =>
                    setTaskDetails({ ...taskDetails, teamId: e.target.value })
                  }
                  focused
                />
                <TextField
                  label="SMV"
                  fullWidth
                  margin="normal"
                  value={taskDetails.smv}
                  onChange={(e) =>
                    setTaskDetails({ ...taskDetails, smv: e.target.value })
                  }
                  focused
                />
                <TextField
                  label="Labor Count"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={taskDetails.laborCount}
                  onChange={(e) =>
                    setTaskDetails({
                      ...taskDetails,
                      laborCount: e.target.value,
                    })
                  }
                  focused
                />
                <TextField
                  label="Start Date"
                  type="date"
                  fullWidth
                  focused
                  margin="normal"
                  value={taskDetails.startDate}
                  onChange={(e) =>
                    setTaskDetails({
                      ...taskDetails,
                      startDate: e.target.value,
                    })
                  }
                />
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  focused
                  margin="normal"
                  value={taskDetails.endDate}
                  onChange={(e) =>
                    setTaskDetails({ ...taskDetails, endDate: e.target.value })
                  }
                />

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={handleAssignLaborers}
                >
                  Assign
                </Button>
              </Box>
            </Drawer>

            {showBanner && (
              <Box
                sx={{
                  backgroundColor: "#e2f2fd",
                  padding: "15px",
                  marginBottom: "20px",
                  borderRadius: "5px",
                  textAlign: "center",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  maxWidth: "80%",
                  margin: "auto",
                  marginTop: "12%",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    marginBottom: "10px",
                    color: "#0377bd",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                >
                  Please configure the settings and generate the seat plan to
                  start assigning laborers.
                </Typography>
              </Box>
            )}

            {removedLaborers.length > 0 && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    marginTop: "20px",
                    borderTop: "1px solid #E0E0E0",
                    paddingTop: "10px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      marginBottom: "10px",
                      color: "#D32F2F",
                      textAlign: "center",
                    }}
                  >
                    Removed Laborers
                  </Typography>
                  <Grid container spacing={2} justifyContent="center">
                    {removedLaborers.map((laborer) => (
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        md={3}
                        lg={2}
                        key={laborer.Emp_No}
                      >
                        <Card
                          sx={{
                            backgroundColor: red[50],
                            padding: "5px",
                            borderRadius: "8px",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <CardContent
                            sx={{ textAlign: "center", padding: "8px" }}
                          >
                            <Avatar
                              sx={{
                                backgroundColor: red[500],
                                margin: "0 auto",
                                width: 30,
                                height: 30,
                              }}
                            >
                              <PersonIcon />
                            </Avatar>
                            <Typography
                              variant="body2"
                              sx={{
                                marginTop: "5px",
                                fontWeight: "500",
                                fontSize: "0.75rem",
                              }}
                            >
                              {laborer.Name} (ID: {laborer.Emp_No})
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </PageMain>
  );
};



const inputStyle = {
  padding: "8px",
  width: "100%",
  borderRadius: "4px",
  border: "1px solid #ccc",
};
export default SeatPlanner;
