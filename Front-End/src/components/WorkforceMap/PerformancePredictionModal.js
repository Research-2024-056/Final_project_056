import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const PerformancePredictionModal = ({
  open,
  onClose,
  selectedRow,
  predictedPerformance,
}) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        width: { xs: "90%", sm: "450px" }, // Responsive width
        padding: "20px",
        backgroundColor: "white",
        margin: "auto",
        marginTop: "1%",
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

      {/* Table for Employee Details */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "600",
                  color: "#424242",
                  fontSize: "1rem",
                }}
              >
                Details
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "600",
                  color: "#424242",
                  fontSize: "1rem",
                }}
              >
                Values
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell sx={{ color: "#3f51b5" }}>{selectedRow?.Emp_No}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell sx={{ color: "#3f51b5" }}>{selectedRow?.Name}</TableCell>
            </TableRow>

            {/* Evolution Data Rows */}
            {["Evolution_01", "Evolution_02", "Evolution_03", "Evolution_04", "Evolution_05"].map(
              (evolution, index) => (
                <TableRow key={index}>
                  <TableCell>{`Evolution ${index + 1}`}</TableCell>
                  <TableCell sx={{ color: "#3f51b5" }}>
                    {selectedRow?.[evolution]}
                  </TableCell>
                </TableRow>
              )
            )}

            <TableRow>
              <TableCell>Actual Last Performance</TableCell>
              <TableCell sx={{ color: "#3f51b5" }}>{selectedRow?.Last_Evolution}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "600", color: "#f44336" }}>Predicted Performance</TableCell>
              <TableCell sx={{ color: "#f44336", fontWeight: "600" }}>
             
                {parseFloat(predictedPerformance).toFixed(3)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Close Button */}
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
