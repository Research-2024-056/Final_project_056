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
  const { machineId } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [startedOrder, setStartedOrder] = useState([]);
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
          if (data) {
            const orders = Object.entries(data).map(([key, value]) => ({
              ...value,
              orderId: key,
            }));
            setOrderData(orders);

            const activeOrder = orders.find(
              (order) => order.Started === "true"
            );
            setStartedOrder(activeOrder ? [activeOrder] : []);
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
  }, [machineId]);

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
          Needle Performance Dashboard
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          sx={{ marginTop: "10px" }}
        >
          Monitoring Machine: {machineId}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card elevation={3} sx={{ padding: 3 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  {startedOrder.length > 0 ? (
                    <>
                      <Typography variant="h6">End Use:</Typography>
                      <Typography variant="body1">
                        {startedOrder[0].EndUse}
                      </Typography>
                    </>
                  ) : (
                    <Typography>No active orders found.</Typography>
                  )}
                </Grid>

                <Grid item xs={12} md={4}>
                  {startedOrder.length > 0 && (
                    <>
                      <Typography variant="h6">Order Number:</Typography>
                      <Typography variant="body1">
                        {startedOrder[0].OrderNumber}
                      </Typography>
                    </>
                  )}
                </Grid>

                <Grid item xs={12} md={4}>
                  {startedOrder.length > 0 && (
                    <>
                      <Typography variant="h6">Needle Type:</Typography>
                      <Typography variant="body1">
                        {startedOrder[0].NeedleType}
                      </Typography>
                    </>
                  )}
                </Grid>

                {startedOrder.length > 0 && (
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      href={`/realTimeDashboard/${machineId}/${startedOrder[0].OrderNumber}`}
                      variant="contained"
                      color="primary"
                      sx={{
                        fontWeight: 700,
                        marginTop: "10px",
                      }}
                    >
                      IN PROGRESS
                    </Button>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

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
                    key={order.OrderNumber}
                    component={Link}
                    to={`/OrderDetails/${order.OrderNumber}`}
                    sx={{
                      textDecoration: "none",
                      "&:hover": { backgroundColor: "#f0f0f0" },
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
