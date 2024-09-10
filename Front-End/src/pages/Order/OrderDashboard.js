import React, { useEffect, useState } from "react";
import PageMain from "../../components/PageMain";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { ref, push, onValue } from "firebase/database"; // Adjust the path as necessary
import { projectFirestore } from "../../components/firebase-config";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

function OrderDashboard() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      const orderRef = ref(projectFirestore, `/Orders`);
      onValue(
        orderRef,
        (snapshot) => {
          const data = snapshot.val();
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
            console.log(orders);
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
        Order Dashboard
      </Typography>
      <Box sx={{ width: "100%", marginTop: "30px" }}>
        <Box
          component={Link} // Make the Box a Link component
          to="/createneworder" // Destination rout
          sx={{
            width: "40%",
            marginTop: "30px",
            height: "20%",
            backgroundColor: "#1e81b0",
            color: "white",
            fontSize: "30px",
            display: "flex", // Use Flexbox
            alignItems: "center", // Center items vertically
            justifyContent: "center", // Center items horizontally
            textAlign: "center", // Optional, centers text if it wraps
            paddingTop: "10px",
            paddingBottom: "10px",
            textDecoration: "none", // Remove link underline
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#063970", // Optional hover effect
            },
          }}
        >
          Create New Order
        </Box>
      </Box>
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

export default OrderDashboard;
