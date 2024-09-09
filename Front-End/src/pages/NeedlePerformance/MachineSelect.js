import React, { useState } from "react";
import PageMain from "../../components/PageMain";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

function MachineSelect() {
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
        Select the Machine
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
          Please Select the sewing machine to Monitor the needle Performance
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: "30px",
          display: "flex", // Enable Flexbox
          flexDirection: "row", // Arrange items in a row
          justifyContent: "space-between", // Add space between items
          flexWrap: "wrap", // Allow items to wrap if they overflow
        }}
      >
        <Box
          component={Link} // Make the Box a Link component
          to="/needledashboard/machine1" // Destination rout
          sx={{
            width: "30%",
            marginTop: "30px",
            height: "20%",
            backgroundColor: "#1e81b0",
            color: "white",
            fontSize: "50px",
            alignItems: "center",
            display: "flex", // Use Flexbox
            alignItems: "center", // Center items vertically
            justifyContent: "center", // Center items horizontally
            textAlign: "center", // Optional, centers text if it wraps
            paddingTop: "50px",
            paddingBottom: "50px",
            textDecoration: "none", // Remove link underline
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#063970", // Optional hover effect
            },
          }}
        >
          Machine 1
        </Box>
        <Box
          component={Link} // Make the Box a Link component
          to="/needledashboard/machine2" // Destination rout
          sx={{
            width: "30%",
            marginTop: "30px",
            height: "20%",
            backgroundColor: "#1e81b0",
            color: "white",
            fontSize: "50px",
            alignItems: "center",
            display: "flex", // Use Flexbox
            alignItems: "center", // Center items vertically
            justifyContent: "center", // Center items horizontally
            textAlign: "center", // Optional, centers text if it wraps
            paddingTop: "50px",
            paddingBottom: "50px",
            textDecoration: "none", // Remove link underline
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#063970", // Optional hover effect
            },
          }}
        >
          Machine 2
        </Box>
        <Box
          component={Link} // Make the Box a Link component
          to="/needledashboard/machine3" // Destination rout
          sx={{
            width: "30%",
            marginTop: "30px",
            height: "20%",
            backgroundColor: "#1e81b0",
            color: "white",
            fontSize: "50px",
            alignItems: "center",
            display: "flex", // Use Flexbox
            alignItems: "center", // Center items vertically
            justifyContent: "center", // Center items horizontally
            textAlign: "center", // Optional, centers text if it wraps
            paddingTop: "50px",
            paddingBottom: "50px",
            textDecoration: "none", // Remove link underline
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#063970", // Optional hover effect
            },
          }}
        >
          Machine 3
        </Box>
        <Box
          component={Link} // Make the Box a Link component
          to="/needledashboard/machine4" // Destination rout
          sx={{
            width: "30%",
            marginTop: "30px",
            height: "20%",
            backgroundColor: "#1e81b0",
            color: "white",
            fontSize: "50px",
            alignItems: "center",
            display: "flex", // Use Flexbox
            alignItems: "center", // Center items vertically
            justifyContent: "center", // Center items horizontally
            textAlign: "center", // Optional, centers text if it wraps
            paddingTop: "50px",
            paddingBottom: "50px",
            textDecoration: "none", // Remove link underline
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#063970", // Optional hover effect
            },
          }}
        >
          Machine 4
        </Box>
        <Box
          component={Link} // Make the Box a Link component
          to="/needledashboard/machine5" // Destination rout
          sx={{
            width: "30%",
            marginTop: "30px",
            height: "20%",
            backgroundColor: "#1e81b0",
            color: "white",
            fontSize: "50px",
            alignItems: "center",
            display: "flex", // Use Flexbox
            alignItems: "center", // Center items vertically
            justifyContent: "center", // Center items horizontally
            textAlign: "center", // Optional, centers text if it wraps
            paddingTop: "50px",
            paddingBottom: "50px",
            textDecoration: "none", // Remove link underline
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#063970", // Optional hover effect
            },
          }}
        >
          Machine 5
        </Box>
        <Box
          component={Link} // Make the Box a Link component
          to="/needledashboard/machine6" // Destination rout
          sx={{
            width: "30%",
            marginTop: "30px",
            height: "20%",
            backgroundColor: "#1e81b0",
            color: "white",
            fontSize: "50px",
            alignItems: "center",
            display: "flex", // Use Flexbox
            alignItems: "center", // Center items vertically
            justifyContent: "center", // Center items horizontally
            textAlign: "center", // Optional, centers text if it wraps
            paddingTop: "50px",
            paddingBottom: "50px",
            textDecoration: "none", // Remove link underline
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#063970", // Optional hover effect
            },
          }}
        >
          Machine 6
        </Box>
        <Box
          component={Link} // Make the Box a Link component
          to="/needledashboard/machine7" // Destination rout
          sx={{
            width: "30%",
            marginTop: "30px",
            height: "20%",
            backgroundColor: "#1e81b0",
            color: "white",
            fontSize: "50px",
            alignItems: "center",
            display: "flex", // Use Flexbox
            alignItems: "center", // Center items vertically
            justifyContent: "center", // Center items horizontally
            textAlign: "center", // Optional, centers text if it wraps
            paddingTop: "50px",
            paddingBottom: "50px",
            textDecoration: "none", // Remove link underline
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#063970", // Optional hover effect
            },
          }}
        >
          Machine 7
        </Box>
        <Box
          component={Link} // Make the Box a Link component
          to="/needledashboard/machine8" // Destination rout
          sx={{
            width: "30%",
            marginTop: "30px",
            height: "20%",
            backgroundColor: "#1e81b0",
            color: "white",
            fontSize: "50px",
            alignItems: "center",
            display: "flex", // Use Flexbox
            alignItems: "center", // Center items vertically
            justifyContent: "center", // Center items horizontally
            textAlign: "center", // Optional, centers text if it wraps
            paddingTop: "50px",
            paddingBottom: "50px",
            textDecoration: "none", // Remove link underline
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#063970", // Optional hover effect
            },
          }}
        >
          Machine 8
        </Box>
        <Box
          component={Link} // Make the Box a Link component
          to="/needledashboard/machine9" // Destination rout
          sx={{
            width: "30%",
            marginTop: "30px",
            height: "20%",
            backgroundColor: "#1e81b0",
            color: "white",
            fontSize: "50px",
            alignItems: "center",
            display: "flex", // Use Flexbox
            alignItems: "center", // Center items vertically
            justifyContent: "center", // Center items horizontally
            textAlign: "center", // Optional, centers text if it wraps
            paddingTop: "50px",
            paddingBottom: "50px",
            textDecoration: "none", // Remove link underline
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#063970", // Optional hover effect
            },
          }}
        >
          Machine 9
        </Box>
      </Box>
    </PageMain>
  );
}

export default MachineSelect;
