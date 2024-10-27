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

function NeedleRealTime() {
  const { machineId, ordernumber } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [averageValue, setAverageValue] = useState(0);
  const [needleCountHistory, setNeedleCountHistory] = useState([]);
  const [needleSpeedHistory, setNeedleSpeedHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

            const needleSpeedGraphData = orders.flatMap((order) =>
              order.SpeedGraph
                ? Object.entries(order.SpeedGraph).map(([key, value]) => ({
                    time: new Date(value.timestamp).toLocaleTimeString(),
                    needleSpeed: value.value,
                  }))
                : []
            );

            setNeedleSpeedHistory(needleSpeedGraphData);

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
  const averageSpeed = orderData.length > 0 ? orderData[0].averageSpeed : 0;
  const maxSpeed = orderData.length > 0 ? orderData[0].maxSpeed : 0;
  const totalActiveTime =
    orderData.length > 0 ? orderData[0].totalActiveTime : 0;
  const averageGapDuration =
    orderData.length > 0 ? orderData[0].averageGapDuration : 0;
  const needleSpeed = orderData.length > 0 ? orderData[0].Speed : 0;

  const warningMessage = getWarningMessage(needleCount);

  return (
    <PageMain>
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, fontFamily: "Poppins", marginBottom: "3%" }}
      >
        Needle Performance Dashboard
      </Typography>
      <Box sx={{ px: 2, minHeight: "100vh", color: "#fff" }}>
        <Grid container spacing={2}>
          {/* Needle Type */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                backgroundColor: "#4A628A",
                color: "#fff",
                borderRadius: "10px",
                p: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Needle Type
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {orderData[0]?.NeedleType || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Average Needle Value */}
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                backgroundColor: "#7AB2D3",
                color: "#fff",
                borderRadius: "10px",
                p: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Average Needle Value
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {averageValue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Current Needle Count */}
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                backgroundColor: "#B9E5E8",
                color: "#fff",
                borderRadius: "10px",
                p: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Current Needle Count
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    color: needleCount >= averageValue - 1000 ? "red" : "#fff",
                  }}
                >
                  {needleCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Machine Speed */}
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                backgroundColor: "#CBDCEB",
                color: "#fff",
                borderRadius: "10px",
                p: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Machine Speed (RPM)
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {needleSpeed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Efficiency */}
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                backgroundColor: "#608BC1",
                color: "#fff",
                borderRadius: "10px",
                p: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Efficiency (%)
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {efficiency}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Garments Produced */}
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                backgroundColor: "#ADD8E6",
                color: "#fff",
                borderRadius: "10px",
                p: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Garments Produced
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {garmentsProduced}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Average speed */}
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                backgroundColor: "#133E87",
                color: "#fff",
                borderRadius: "10px",
                p: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                Average Speed
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {averageSpeed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* max Speed */}
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                backgroundColor: "#007fff",
                color: "#fff",
                borderRadius: "10px",
                p: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                Max Speed
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {maxSpeed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Total Active time */}
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                backgroundColor: "#0067A5",
                color: "#fff",
                borderRadius: "10px",
                p: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                Total ActiveTime
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {totalActiveTime}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                backgroundColor: "#01377D",
                color: "#fff",
                borderRadius: "10px",
                p: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                Average Gap Duration
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {averageGapDuration}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Warning Message */}
        {warningMessage && (
          <Typography sx={{ color: "red", mt: 2, textAlign: "center" }}>
            {warningMessage}
          </Typography>
        )}

        {/* Needle Movement Chart */}
        <Box
          sx={{ mt: 4, backgroundColor: "#FEF9F2", borderRadius: "8px", p: 3 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 2,
              color: "black",
            }}
          >
            Live Needle Health
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={needleCountHistory.slice(-50)}>
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
              <Line type="monotone" dataKey="needleCount" stroke="#8884d8" />
              <ReferenceLine y={averageValue} label="Average" stroke="red" />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Machine Speed Chart */}
        <Box
          sx={{ mt: 4, backgroundColor: "#FEF9F2", borderRadius: "8px", p: 3 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 2,
              color: "black",
            }}
          >
            Machine Speed
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={needleSpeedHistory.slice(-50)}>
              <XAxis
                dataKey="time"
                label={{
                  value: "Time",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                domain={[0, 100]}
                label={{
                  value: "Speed",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Line type="monotone" dataKey="needleCount" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* End Order Button */}
        <Button
          onClick={handleEnd}
          variant="contained"
          sx={{
            mt: 3,
            width: "100%",
            backgroundColor: "#133E87",
            color: "white",
          }}
        >
          End Order
        </Button>
      </Box>
    </PageMain>
  );
}

export default NeedleRealTime;
