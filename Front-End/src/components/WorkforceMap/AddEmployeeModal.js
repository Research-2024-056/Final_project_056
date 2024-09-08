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
        width: { xs: '90%', sm: '400px' }, 
        padding: { xs: '15px', sm: '20px' },
        backgroundColor: "white",
        margin: "auto",
        marginTop: { xs: '25%', sm: '15%' }, 
        borderRadius: '8px',
        boxShadow: 24,
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        sx={{ marginBottom: { xs: '15px', sm: '20px' }, mt: 1, fontSize: { xs: '1.2rem', sm: '1.5rem' } }} // Adjust font size for title
      >
        Add New Employee
      </Typography>
      <TextField
        label="Employee ID"
        name="Emp_No"
        value={newEmployee.Emp_No}
        onChange={onInputChange}
        fullWidth
        sx={{ marginBottom: { xs: '8px', sm: '10px' } }}
      />
      <TextField
        label="Employee Name"
        name="Name"
        value={newEmployee.Name}
        onChange={onInputChange}
        fullWidth
        sx={{ marginBottom: { xs: '8px', sm: '10px' } }}
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
          padding: { xs: "6px 12px", sm: "8px 16px" },
          fontSize: { xs: "0.8rem", sm: "0.875rem" },
          fontWeight: "400",
        }}
      >
        <strong>Note:</strong> The fields for Evolution 01, Evolution 02,
        Evolution 03, Evolution 04, Evolution 05, and Last Evolution will be set
        to zero by default for new employees.
      </Typography>

      {error && <Typography color="error">{error}</Typography>}
      <Box
        sx={{ 
          marginTop: { xs: '15px', sm: '20px' }, 
          display: "flex", 
          justifyContent: "flex-end" 
        }}
      >
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onAddEmployee}
          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }} // Adjust button font size for smaller screens
        >
          Add Employee
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default AddEmployeeModal;
