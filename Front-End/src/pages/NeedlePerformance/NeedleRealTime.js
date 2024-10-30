import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageMain from "../../components/PageMain";
import {
  ref,
  onValue,
  update,
  query,
  orderByChild,
  equalTo,
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
  const { orderkey, documentid, ordernumber } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [mainOrder, setMainOrderData] = useState();
  const [averageValue, setAverageValue] = useState(0);
  const [needleCountHistory, setNeedleCountHistory] = useState([]);
  const [needleSpeedHistory, setNeedleSpeedHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [efficincy, setEfficiency] = useState(0);
  const [smv, setSMV] = useState(0);
  const [target, setTarget] = useState(0);
  const allowance = 15;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      const assemblyOrderRef = ref(
        projectFirestore,
        `/Orders/${orderkey}/assemblyOrders/${documentid}`
      );

      onValue(
        assemblyOrderRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setOrderData(data);

            const needleGraphData = data.NeedleGraph
              ? Object.entries(data.NeedleGraph).map(([key, value]) => ({
                  time: new Date(value.timestamp).toLocaleTimeString(),
                  needleCount: value.value,
                }))
              : [];
            setNeedleCountHistory(needleGraphData);

            const needleSpeedGraphData = data.SpeedGraph
              ? Object.entries(data.SpeedGraph).map(([key, value]) => ({
                  time: new Date(value.timestamp).toLocaleTimeString(),
                  needleSpeed: value.value,
                }))
              : [];
            setNeedleSpeedHistory(needleSpeedGraphData);

            // Determine average value based on needle type
            const averageVal =
              {
                "needle_70-90": 415,
                "needle_90-14": 400,
                "needle_14-16": 405,
                "needle_16-18": 410,
              }[data.needleType] || 400;

            setAverageValue(averageVal);
          } else {
            setError("No data found for this order.");
          }
        },
        (error) => {
          setError("Error fetching data: " + error.message);
        }
      );
    };

    const fetchOrderData = () => {
      const employeeRef = ref(projectFirestore, `/Orders`);
      const queryRef = query(
        employeeRef,
        orderByChild("OrderNumber"),
        equalTo(ordernumber)
      );

      onValue(
        queryRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setMainOrderData(data);
            console.log(data);
          } else {
            setError("No main order data found.");
          }
        },
        (error) => {
          setError("Error fetching main order data: " + error.message);
        }
      );
    };

    setLoading(true);
    fetchData();
    fetchOrderData();
    setLoading(false); // Set loading to false after both calls
  }, [orderkey, documentid, ordernumber]);

  // Separate useEffect for calculations
  useEffect(() => {
    // Calculate Efficiency
    const outputQuantity =
      orderData.activeStreakCount / orderData.stitchPattern;
    const SAM = orderData.sam;
    const totalProductionTime = outputQuantity * SAM;

    const efficiency = (totalProductionTime / 480) * 100;
    setEfficiency(efficiency.toFixed(2));

    // Calculate SMV
    const rating = 0.7;
    const SMV = (rating * SAM) / 100 + allowance;
    setSMV(SMV);

    const TargetOutputForOperator = ((efficiency.toFixed(2) / 100) * 480) / SMV;
    setTarget(TargetOutputForOperator.toFixed(2));
  }, [orderData, allowance]);

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
      const OrderRef = ref(
        projectFirestore,
        `/Orders/${orderkey}/assemblyOrders/${documentid}`
      );
      await update(OrderRef, { Started: "false" });
      alert("Order Ended Successfully!");
      navigate(
        `/needledashboard/${orderkey}/${documentid}/${machineNumber}/${ordernumber}`
      );
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
  const needleCount = orderData.NeedleCount;
  const needleSpeed = orderData.Speed;
  const machineNumber = orderData.machineNumber;
  const produceOutput = orderData.activeStreakCountPerMinute / 2;

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
        <Grid container spacing={2} sx={{ marginBottom: "4%" }}>
          {/* Order Number */}
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                backgroundColor: "#7AB2D3",
                color: "#fff",
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Number
                </Typography>
                <Typography variant="h6">{ordernumber}</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Needle Type */}
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                backgroundColor: "#7AB2D3",
                color: "#fff",
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Needle Type
                </Typography>
                <Typography variant="h6">
                  {orderData.needleType || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* assemblyType */}
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                backgroundColor: "#7AB2D3",
                color: "#fff",
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Assembly Type
                </Typography>
                <Typography variant="h6">
                  {orderData.assemblyType || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* employee */}
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                backgroundColor: "#7AB2D3",
                color: "#fff",
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Employee
                </Typography>
                <Typography variant="h6">
                  {orderData.employee || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Number of garments required */}
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                backgroundColor: "#7AB2D3",
                color: "#fff",
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Number of Garments Required
                </Typography>
                <Typography variant="h6">
                  {mainOrder?.NumberOfUnits || "N/A"}
                  {}
                </Typography>
                console.log({mainOrder?.NumberOfUnits || "N/A"})
              </CardContent>
            </Card>
          </Grid>
          {/* Start Date */}
          <Grid item xs={12} md={2}>
            <Card
              sx={{
                backgroundColor: "#7AB2D3",
                color: "#fff",
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Start Date
                </Typography>
                <Typography variant="h6">
                  {mainOrder?.StartDate || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {/* Current Needle Count */}
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
                  Needle Count
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
          <Grid item xs={12} md={3}>
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
                  Machine Speed (RPM)
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {needleSpeed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Garments Produced */}
          <Grid item xs={12} md={3}>
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
                  Garments Produced
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {orderData.activeStreakCount / orderData.stitchPattern}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Active time */}
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
                  Total ActiveTime
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {orderData.totalActiveTime || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* average */}
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
                  Average
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {averageValue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Machine Inactive Time */}
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
                  Machine Inactive Time
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {orderData.totalInactiveTime || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* efficiency */}
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
                  Efficiency(%)
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {efficincy}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* smv */}
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
                  Standard Minute Value (SMV)
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {smv}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Target */}
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
                  Target Output per Minute
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {target}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Producing Output */}
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
                  Producing Output per Minute
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {produceOutput}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* MachineNumber */}
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
                  Machine Number
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {machineNumber}
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
          sx={{ mt: 4, backgroundColor: "#D7E2FF", borderRadius: "8px", p: 3 }}
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
          sx={{ mt: 4, backgroundColor: "#D7E2FF", borderRadius: "8px", p: 3 }}
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
                domain={[0, 0.5]}
                label={{
                  value: "Speed",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Line dataKey="needleSpeed" stroke="#8884d8" />
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
