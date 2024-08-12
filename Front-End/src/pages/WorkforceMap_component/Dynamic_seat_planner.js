import React, { useState, useEffect } from "react";
import axios from "axios";
import PageMain from "../../components/PageMain";
import DownloadIcon from '@mui/icons-material/Download';
import Typography from "@mui/material/Typography";
import { Box, FormControlLabel, Radio, Button, TextField, Grid, RadioGroup, Card, CardContent, FormControl, Select, MenuItem, IconButton, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'; // Import the AssignmentIndIcon
import { blue, red, green } from '@mui/material/colors';
import * as XLSX from "xlsx";

const SeatPlanner = () => {
  const [lines, setLines] = useState(1);
  const [employeesPerLine, setEmployeesPerLine] = useState(1);
  const [seatPlan, setSeatPlan] = useState([]);
  const [filterOption, setFilterOption] = useState('average');
  const [removedLaborers, setRemovedLaborers] = useState([]);
  const [unassignedLaborers, setUnassignedLaborers] = useState([]);
  const [isSeatPlanGenerated, setIsSeatPlanGenerated] = useState(false);

  const generateSeatPlan = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/seat_plan", {
        num_lines: lines,
        employees_per_line: employeesPerLine,
        filter_option: filterOption
      });
      setSeatPlan(response.data);
      setIsSeatPlanGenerated(true);
    } catch (error) {
      console.error("Error generating seat plan:", error);
    }
  };

  const handleClear = () => {
    setLines(1);
    setEmployeesPerLine(1);
    setSeatPlan([]);
    setFilterOption('average');
    setRemovedLaborers([]);
    setUnassignedLaborers([]);
    setIsSeatPlanGenerated(false);
  };

  useEffect(() => {
    if (seatPlan.length > 0) {
      fetchUnassignedLaborers();
    }
  }, [seatPlan]);

  const fetchUnassignedLaborers = async () => {
    try {
      const assignedEmpNos = seatPlan.flat().filter(emp => emp).map(emp => emp.Emp_No);
      const response = await axios.get('http://127.0.0.1:5000/unassigned_laborers', {
        params: { assigned_emp_nos: assignedEmpNos }
      });
      setUnassignedLaborers(response.data);
    } catch (error) {
      console.error("Error fetching unassigned laborers:", error);
    }
  };

  const handleRemoveLabor = (lineIndex, seatIndex, employee) => {
    setRemovedLaborers(prev => [...prev, employee]);
    setSeatPlan(prev => {
      const updated = [...prev];
      updated[lineIndex][seatIndex] = null;
      return updated;
    });
  };

  const handleReassignLabor = (lineIndex, seatIndex, empNo) => {
    const selectedLaborer = unassignedLaborers.find(labor => labor.Emp_No === empNo);
    if (selectedLaborer) {
      setSeatPlan(prev => {
        const updated = [...prev];
        updated[lineIndex][seatIndex] = {
          ...selectedLaborer,
          isReassigned: true // Mark as reassigned
        };
        return updated;
      });
      setRemovedLaborers(prev => prev.filter(labor => labor.Emp_No !== empNo));
      fetchUnassignedLaborers(); // Refresh unassigned laborers list
    }
  };

  const handleDownload = () => {
    const data = seatPlan.flat().filter(emp => emp).map(emp => ({
      Name: emp.Name,
      Emp_No: emp.Emp_No,
      Line: seatPlan.findIndex(line => line.includes(emp)) + 1
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Assigned Laborers");
    XLSX.writeFile(wb, "assigned_laborers.xlsx");
  };

  const renderSeats = (line, lineIndex) => {
    return line.map((employee, seatIndex) => (
      <Grid item key={`${lineIndex}-${seatIndex}`} xs={6} sm={4} md={3} lg={2}>
        <Card sx={{
          backgroundColor: employee ? (employee.isReassigned ? green[50] : blue[50]) : red[50],
          border: employee ? (employee.isReassigned ? `2px solid ${green[500]}` : 'none') : 'none',
          padding: "5px",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
        }}>
          <CardContent sx={{ textAlign: 'center', padding: "8px", position: 'relative' }}>
            {employee ? (
              <>
                <Avatar sx={{ backgroundColor: blue[500], margin: '0 auto', width: 30, height: 30 }}>
                  <PersonIcon />
                </Avatar>
                <Typography variant="body2" sx={{ marginTop: "5px", fontWeight: "500", fontSize: "0.75rem" }}>
                  {employee.Name} (ID: {employee.Emp_No})
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: "0.7rem" }}>
                  Performance: {employee.Performance.toFixed(2)}
                </Typography>
                <IconButton
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                  onClick={() => handleRemoveLabor(lineIndex, seatIndex, employee)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
                {employee.isReassigned && (
                  <AssignmentIndIcon sx={{ position: 'absolute', bottom: 0, right: 0, color: green[500] }} />
                )}
              </>
            ) : (
              <FormControl fullWidth size="small">
                <Select
                  value=""
                  displayEmpty
                  onChange={(e) => handleReassignLabor(lineIndex, seatIndex, e.target.value)}
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
      <Typography
        sx={{
          lineHeight: 1.2,
          fontWeight: "600",
          fontSize: "1.75rem",
          fontFamily: "Poppins",
          marginBottom: "20px",
          color: "#2E3B55",
        }}
      >
        Dynamic Seat Planner
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Number of Lines"
          type="number"
          value={lines}
          onChange={(e) => setLines(parseInt(e.target.value))}
          size="small"
          sx={{ maxWidth: "120px" }}
        />
        <TextField
          label="Employees Per Line"
          type="number"
          value={employeesPerLine}
          onChange={(e) => setEmployeesPerLine(parseInt(e.target.value))}
          size="small"
          sx={{ maxWidth: "145px" }}
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
            <FormControlLabel value="average" control={<Radio />} label="Average" />
            <FormControlLabel value="last_evolution" control={<Radio />} label="Last Evolution" />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={generateSeatPlan}
          sx={{
            backgroundColor: "#1976D2",
            "&:hover": { backgroundColor: "#1565C0" },
            marginTop: { xs: "10px", md: "0" }
          }}
        >
          Generate Seat Plan
        </Button>
        {isSeatPlanGenerated && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClear}
            sx={{
              marginTop: { xs: "10px", md: "0" },
              marginLeft: "16px",
            }}
          >
            Clear
          </Button>
        )}
        {isSeatPlanGenerated && (
          <Button
            variant="outlined"
            color="success"
            onClick={handleDownload}
            sx={{
              marginTop: { xs: "10px", md: "0" },
              marginLeft: "100px",
            }}
          >
            <DownloadIcon/>
            Download Seat Planner
          </Button>
        )}
      </Box>

      <Grid container spacing={2}>
        {seatPlan.map((line, lineIndex) => (
          <Grid item xs={12} key={`line-${lineIndex}`}>
            <Typography variant="h6" sx={{ marginBottom: "10px", color: "#2E3B55" }}>
              Production Line {lineIndex + 1}
            </Typography>
            <Grid container spacing={1}>
              {renderSeats(line, lineIndex)}
            </Grid>
          </Grid>
        ))}

        {removedLaborers.length > 0 && (
          <Grid item xs={12}>
            <Box sx={{ marginTop: "20px", borderTop: "1px solid #E0E0E0", paddingTop: "10px" }}>
              <Typography variant="h6" sx={{ marginBottom: "10px", color: "#D32F2F" }}>
                Removed Laborers
              </Typography>
              {removedLaborers.length > 0 ? (
                <Grid container spacing={2}>
                  {removedLaborers.map((laborer) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={laborer.Emp_No}>
                      <Card sx={{ backgroundColor: red[50], padding: "5px", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
                        <CardContent sx={{ textAlign: 'center', padding: "8px" }}>
                          <Avatar sx={{ backgroundColor: red[500], margin: '0 auto', width: 30, height: 30 }}>
                            <PersonIcon />
                          </Avatar>
                          <Typography variant="body2" sx={{ marginTop: "5px", fontWeight: "500", fontSize: "0.75rem" }}>
                            {laborer.Name} (ID: {laborer.Emp_No})
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No laborers removed.
                </Typography>
              )}
            </Box>
          </Grid>
        )}
      </Grid>
    </PageMain>
  );
};

export default SeatPlanner;
