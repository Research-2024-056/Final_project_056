import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const PerformancePredictionModal = ({
  open,
  onClose,
  selectedRow,
  predictedPerformance,
}) => (
  <Modal open={open} onClose={onClose}>
  <Box
    sx={{
      width: "450px",
      padding: "30px",
      backgroundColor: "white",
      margin: "auto",
      marginTop: "10%",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
    }}
  >
    <Typography
      variant="h6"
      component="h2"
      sx={{
        marginBottom: "25px",
        fontWeight: "600",
        color: "#3f51b5",
        fontSize: "1.5rem",
        textAlign: "center",
      }}
    >
      Performance Prediction
    </Typography>
    
    <Box sx={{ marginBottom: "20px" }}>
      <Typography
        variant="body1"
        sx={{ fontWeight: "500", color: "#424242", marginBottom: "5px" }}
      >
        Employee ID:{" "}
        <Typography component="span" sx={{ color: "#3f51b5" }}>
          {selectedRow?.Emp_No}
        </Typography>
      </Typography>

      <Typography
        variant="body1"
        sx={{ fontWeight: "500", color: "#424242", marginBottom: "5px" }}
      >
        Employee Name:{" "}
        <Typography component="span" sx={{ color: "#3f51b5" }}>
          {selectedRow?.Name}
        </Typography>
      </Typography>

      {["Evolution_01", "Evolution_02", "Evolution_03", "Evolution_04", "Evolution_05"].map((evolution, index) => (
        <Typography
          key={index}
          variant="body1"
          sx={{ fontWeight: "500", color: "#424242", marginBottom: "5px" }}
        >
          {`Evolution ${index + 1}: `}
          <Typography component="span" sx={{ color: "#3f51b5" }}>
            {selectedRow?.[evolution]}
          </Typography>
        </Typography>
      ))}

      <Typography
        variant="body1"
        sx={{ fontWeight: "500", color: "#424242", marginBottom: "5px" }}
      >
        Actual Last Performance:{" "}
        <Typography component="span" sx={{ color: "#3f51b5" }}>
          {selectedRow?.Last_Evolution}
        </Typography>
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontWeight: "500",
          color: "#424242",
          marginTop: "10px",
          paddingTop: "10px",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        Predicted Performance:{" "}
        <Typography component="span" sx={{ color: "#f44336", fontWeight: "600" }}>
          {predictedPerformance}
        </Typography>
      </Typography>
    </Box>

    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "20px",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={onClose}
        sx={{
          textTransform: "none",
          fontWeight: "500",
          padding: "8px 20px",
        }}
      >
        Close
      </Button>
    </Box>
  </Box>
</Modal>

);

export default PerformancePredictionModal;
