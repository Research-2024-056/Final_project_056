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
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: "90%", sm: "70%", md: "60%" },
          padding: 3,
          backgroundColor: "background.paper",
          margin: "auto",
          marginTop: 8,
          borderRadius: 2,
          boxShadow: 2,
          overflow: "hidden",
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
            gap: 1,
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
                flexBasis: "calc(33% - 16px)",
                marginBottom: 1,
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.875rem",
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
          }}
        >
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SewingActivityModal;
