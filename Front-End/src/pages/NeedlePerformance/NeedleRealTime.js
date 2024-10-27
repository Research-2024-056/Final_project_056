import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageMain from "../../components/PageMain";
import {
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
  update,
} from "firebase/database";
import { projectFirestore } from "../../components/firebase-config";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function NeedleRealTime() {
  const { machineId, ordernumber } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [averageValue, setAverageValue] = useState(0);
  const [needleCountHistory, setNeedleCountHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // New fields to simulate additional machine stats
  const [machineSpeed, setMachineSpeed] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [garmentsProduced, setGarmentsProduced] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      const orderRef = ref(projectFirestore, `/Orders`);
      const queryRef = query(
        orderRef,
        orderByChild("OrderNumber"),
        equalTo(ordernumber)
      );

      onValue(
        queryRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const orders = Object.entries(data).map(([docId, value]) => ({
              docId,
              ...value, // Spread the rest of the order data
            }));
            setOrderData(orders);

            const needleGraphData = orders.flatMap((order) =>
              order.NeedleGraph
                ? Object.entries(order.NeedleGraph).map(([key, value]) => ({
                    time: new Date(value.timestamp).toLocaleTimeString(),
                    needleCount: value.value,
                  }))
                : []
            );

            setNeedleCountHistory(needleGraphData);

            const needleType = orders[0].NeedleType;
            let averageValue;
            switch (needleType) {
              case "needle_70-90":
                averageValue = 415;
                break;
              case "needle_90-14":
                averageValue = 400;
                break;
              case "needle_14-16":
                averageValue = 405; // Set the value for this type
                break;
              case "needle_16-18":
                averageValue = 410; // Set the value for this type
                break;
              default:
                averageValue = 400; // Default value if none match
                break;
            }

            setAverageValue(averageValue);

            // Simulate additional data for stats
            setMachineSpeed(Math.floor(Math.random() * 800 + 200)); // Random speed between 200-1000 RPM
            setEfficiency(Math.floor(Math.random() * 100)); // Random efficiency percentage
            setGarmentsProduced(Math.floor(Math.random() * 1000)); // Random garments count

            setLoading(false);
          }
        },
        (error) => {
          setError("Error fetching data");
          setLoading(false);
        }
      );
    };

    fetchData();
    const interval = setInterval(fetchData, 6000); // Refresh every minute

    return () => clearInterval(interval);
  }, [ordernumber]);

  const getWarningMessage = (needleCount) => {
    if (needleCount >= averageValue - 100) {
      return "First warning: Needle needs to be replaced soon!";
    }
    if (needleCount >= averageValue - 50) {
      return "Second warning: Needle needs to be replaced very soon!";
    }
    if (needleCount >= averageValue - 10) {
      return "Third warning: Needle needs immediate replacement!";
    }
    return "";
  };

  const handleEnd = async (e) => {
    e.preventDefault();
    try {
      const OrderRef = ref(projectFirestore, `/Orders/${orderData[0].docId}`);
      await update(OrderRef, { Started: "false" });
      alert("Order Ended Successfully!");
      navigate(`/needledashboard/${orderData[0].MachineNumber}`);
    } catch (error) {
      console.error("Error Ending Order:", error.message);
    }
  };

  if (loading)
    return (
      <PageMain>
        <Typography>Loading...</Typography>
      </PageMain>
    );
  if (error)
    return (
      <PageMain>
        <Typography>Error: {error}</Typography>
      </PageMain>
    );

  const needleCount = orderData.length > 0 ? orderData[0].NeedleCount : 0;
  const warningMessage = getWarningMessage(needleCount);

  return (
    <PageMain>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 2,
          textAlign: "center",
          margin: "4%",
        }}
      >
        Needle Performance Dashboard
      </Typography>
      <Box sx={{ px: 2 }}>
        <Card sx={{ mb: 2, p: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              {/* Display Needle Stats */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Needle Type</Typography>
                <Typography>{orderData[0]?.NeedleType || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Average Needle Value</Typography>
                <Typography>{averageValue}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Current Needle Count</Typography>
                <Typography
                  sx={{
                    color: needleCount >= averageValue - 1000 ? "red" : "black",
                  }}
                >
                  {needleCount}
                </Typography>
              </Grid>
              {/* New Machine Stats */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Machine Speed (RPM)</Typography>
                <Typography>{machineSpeed}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Efficiency (%)</Typography>
                <Typography>{efficiency}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Garments Produced</Typography>
                <Typography>{garmentsProduced}</Typography>
              </Grid>
            </Grid>

            {warningMessage && (
              <Typography sx={{ color: "red", mt: 2, textAlign: "center" }}>
                {warningMessage}
              </Typography>
            )}

            {/* Needle Count Chart */}
            <Box sx={{ mt: 4 }}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={needleCountHistory}>
                  <XAxis
                    dataKey="time"
                    label={{
                      value: "Time",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    domain={[0, averageValue + 100]}
                    label={{
                      value: "Number of Movements",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="needleCount"
                    stroke="#8884d8"
                  />
                  <ReferenceLine
                    y={averageValue}
                    label="Average"
                    stroke="red"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            <Button
              onClick={handleEnd}
              variant="contained"
              sx={{ mt: 3, width: "100%" }}
            >
              End Order
            </Button>
          </CardContent>
        </Card>
      </Box>
    </PageMain>
  );
}

export default NeedleRealTime;
