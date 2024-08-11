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
        width: "400px",
        padding: "20px",
        backgroundColor: "white",
        margin: "auto",
        marginTop: "15%",
      }}
    >
      <Typography variant="h6" component="h2" sx={{ marginBottom: "20px" }}>
        Performance Prediction
      </Typography>
      <Typography variant="body1">
        Employee ID: {selectedRow?.Emp_No}
      </Typography>
      <Typography variant="body1">
        Employee Name: {selectedRow?.Name}
      </Typography>
      <Typography variant="body1">
        Evolution_01: {selectedRow?.Evolution_01}
      </Typography>
      <Typography variant="body1">
        Evolution_02: {selectedRow?.Evolution_02}
      </Typography>
      <Typography variant="body1">
        Evolution_03: {selectedRow?.Evolution_03}
      </Typography>
      <Typography variant="body1">
        Evolution_04: {selectedRow?.Evolution_04}
      </Typography>
      <Typography variant="body1">
        Evolution_05: {selectedRow?.Evolution_05}
      </Typography>
      <Typography variant="body1">
        Actual Last Performance: {selectedRow?.Last_Evolution}
      </Typography>
      <Typography variant="body1">
        Predicted Performance: {predictedPerformance}
      </Typography>
      <Box
        sx={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}
      >
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default PerformancePredictionModal;
