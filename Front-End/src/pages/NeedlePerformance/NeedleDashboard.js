import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import PageMain from "../../components/PageMain";

function NeedleDashboard() {
  const { machineId } = useParams(); // Extract machineId from the URL

  return (
    <PageMain>
      <Typography
        Heading
        sx={{
          lineHeight: 1,
          fontWeight: "500",
          fontSize: "1.625rem",
          fontFamily: "poppins",
        }}
      >
        Needle Performance Dashboard
      </Typography>
      <Box sx={{ width: "100%", marginTop: "30px" }}>
        <Typography
          sx={{
            lineHeight: 1,
            fontWeight: "500",
            fontSize: "1.25rem",
            fontFamily: "Poppins",
            color: "#424242",
            marginBottom: "20px",
          }}
        >
          Monitoring {machineId}
        </Typography>
      </Box>
    </PageMain>
  );
}

export default NeedleDashboard;
