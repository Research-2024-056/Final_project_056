import React from "react";
import {
  Modal,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

const SewingActivityModal = ({
  open,
  onClose,
  selectedActivities,
  onCheckboxChange,
  onSubmit,
}) => {
  const activities = [
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

  return (
    <Modal open={open} onClose={onClose} >
      <Box
        sx={{
          width: { xs: "95%", sm: "80%", md: "60%", lg: "50%" },
          maxHeight: "90vh",
          padding: { xs: 2, sm: 3 },
          backgroundColor: "background.paper",
          margin: "auto",
          marginTop: 8,
          borderRadius: 2,
          boxShadow: 2,
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
        >
          Select Activities
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5, // More spacing between items for a cleaner look
            justifyContent: { xs: "center", sm: "flex-start" }, // Align items for smaller screens
          }}
        >
          {activities.map((activity) => (
            <FormControlLabel
              key={activity}
              control={
                <Checkbox
                  checked={selectedActivities.includes(activity)}
                  onChange={() => onCheckboxChange(activity)}
                  color="primary"
                />
              }
              label={activity}
              sx={{
                flexBasis: { xs: "100%", sm: "calc(50% - 8px)", md: "calc(33% - 16px)" }, // Responsive layout for different screen sizes
                marginBottom: 1,
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.875rem", // Keep label text size readable
                },
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            justifyContent: "space-between",
            gap: 2, // Better spacing between buttons
            flexDirection: { xs: "column", sm: "row" }, // Stack buttons on smaller screens
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            sx={{
              width: { xs: "100%", sm: "auto" }, // Full width for small screens
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onSubmit();
              onClose(); // Close the modal after submit
            }}
            sx={{
              width: { xs: "100%", sm: "auto" }, 
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SewingActivityModal;
