import React from "react";
import { Modal, Button, TextField, Typography, Box } from "@mui/material";

const AddEmployeeModal = ({
  open,
  onClose,
  newEmployee,
  error,
  onInputChange,
  onAddEmployee,
}) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        width: "400px",
        padding: "20px",
        backgroundColor: "white",
        margin: "auto",
        marginTop: "15%",
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        sx={{ marginBottom: "20px", mt: 1 }}
      >
        Add New Employee
      </Typography>
      <TextField
        label="Employee ID"
        name="Emp_No"
        value={newEmployee.Emp_No}
        onChange={onInputChange}
        fullWidth
        sx={{ marginBottom: "10px" }}
      />
      <TextField
        label="Employee Name"
        name="Name"
        value={newEmployee.Name}
        onChange={onInputChange}
        fullWidth
        sx={{ marginBottom: "10px" }}
      />
      <Typography
        variant="body2"
        sx={{
          mt: 1,
          mb: 2,
          color: "#d32f2f",
          backgroundColor: "#ffebee",
          border: "1px solid #d32f2f",
          borderRadius: "4px",
          padding: "8px 16px",
          fontSize: "0.875rem",
          fontWeight: "400",
        }}
      >
        <strong>Note:</strong> The fields for Evolution 01, Evolution 02,
        Evolution 03, Evolution 04, Evolution 05, and Last Evolution will be set
        to zero by default for new employees.
      </Typography>

      {error && <Typography color="error">{error}</Typography>}
      <Box
        sx={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}
      >
        <Button variant="contained" color="primary" onClick={onAddEmployee}>
          Add Employee
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default AddEmployeeModal;
