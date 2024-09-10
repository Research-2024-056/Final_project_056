import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import PageMain from "../../components/PageMain";
import {
  ref,
  push,
  onValue,
  query,
  orderByChild,
  equalTo,
} from "firebase/database"; // Adjust the path as necessary
import { projectFirestore } from "../../components/firebase-config";
import { Link } from "react-router-dom";
function NeedleDashboard() {
  const { machineId } = useParams(); // Extract machineId from the URL
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      const orderRef = ref(projectFirestore, `/Orders`);
      const queryRef = query(
        orderRef,
        orderByChild("MachineNumber"),
        equalTo(machineId)
      );
      onValue(
        queryRef,
        (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          if (data) {
            const orders = Object.entries(data).map(([key, value]) => ({
              OrderNumber: value.OrderNumber,
              StartDate: value.StartDate,
              EndDate: value.EndDate,
              NeedleType: value.NeedleType,
              NumberOfUnits: value.NumberOfUnits,
              EndUse: value.EndUse,
              FabricMethod: value.FabricMethod,
              FiberContent: value.FiberContent,
              MachineNumber: value.MachineNumber,
            }));
            setOrderData(orders);
            console.log("orders", orders);
          }
          setLoading(false);
        },
        (error) => {
          setError("Error fetching data");
          setLoading(false);
        }
      );
    };

    fetchData();
  }, []);
  if (loading) {
    return (
      <PageMain>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </PageMain>
    );
  }

  if (error) {
    return (
      <PageMain>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </PageMain>
    );
  }

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
      <Box
        component={Link} // Make the Box a Link component
        to="/needlegraphanadashboard/machine2" // Destination rout
        sx={{
          width: "100%",
          marginTop: "30px",
          height: "30%",
          backgroundColor: "#E3E3E3",
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
      ></Box>
      <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#063970",
              }}
            >
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Order Number
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Start Date
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                End Date
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Needle Type
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Number Of Units
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                End Use
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Machine Number
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Fabric Method
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.map((order) => (
              <TableRow
                key={order.OrderNumber}
                component={Link} // Make the Box a Link component
                to={`/OrderDetails/${order.OrderNumber}`}
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#F1F1F1", // Optional hover effect
                  },
                }}
              >
                <TableCell>{order.OrderNumber}</TableCell>
                <TableCell>{order.StartDate}</TableCell>
                <TableCell>{order.EndDate}</TableCell>
                <TableCell>{order.NeedleType}</TableCell>
                <TableCell>{order.NumberOfUnits}</TableCell>
                <TableCell>{order.EndUse}</TableCell>
                <TableCell>{order.MachineNumber}</TableCell>
                <TableCell>{order.FabricMethod}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageMain>
  );
}

export default NeedleDashboard;
