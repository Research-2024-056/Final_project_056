import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import PageMain from "../../components/PageMain";
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import { projectFirestore } from "../../components/firebase-config";

function NeedleDashboard() {
  const { orderkey, documentid, machineNumber,ordernumber } = useParams();
  const [orderData, setOrderData] = useState([]);
  // const [orderData, setorderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const orderRef = ref(
        projectFirestore,
        `/Orders/${orderkey}/assemblyOrders/${documentid}`
      );

      onValue(
        orderRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setOrderData(data);
            console.log("data", data);
            // const activeOrder = data.find(
            //   (order) => order.Started === "true"
            // );
            // setorderData(activeOrder ? [activeOrder] : []);
          }
          setLoading(false);
        },
        () => {
          setError("Error fetching data");
          setLoading(false);
        }
      );
    };

    fetchData();
  }, [machineNumber]);

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
        <Box sx={{ textAlign: "center", padding: "2rem" }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      </PageMain>
    );
  }

  return (
    <PageMain>
      <Box sx={{ marginBottom: "20px" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, fontFamily: "Poppins" }}
        >
          Order Summary
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          sx={{ marginTop: "10px" }}
        >
          Monitoring Machine: {orderData.machineNumber}
        </Typography>
      </Box>

      <Grid container spacing={3}>

        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#063970" }}>
                  {[
                    "Order Number",
                    "Start Date",
                    "End Date",
                    "Needle Type",
                    "Number Of Units",
                    "End Use",
                    "Machine Number",
                    "Fabric Method",
                    "Order Status",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData.map((order) => (
                  <TableRow
                    
                    sx={{
                      textDecoration: "none",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                  >
                    <TableCell>{order.OrderNumber}</TableCell>
                    <TableCell>{order.activeStreakCount}</TableCell>
                    <TableCell>{order.EndDate}</TableCell>
                    <TableCell>{order.NeedleType}</TableCell>
                    <TableCell>{order.NumberOfUnits}</TableCell>
                    <TableCell>{order.EndUse}</TableCell>
                    <TableCell>{order.MachineNumber}</TableCell>
                    <TableCell>{order.FabricMethod}</TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: order.Started === "true" ? "green" : "blue",
                        }}
                      >
                        {order.Started === "true" ? "In Progress" : "Completed"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </PageMain>
  );
}

export default NeedleDashboard;
