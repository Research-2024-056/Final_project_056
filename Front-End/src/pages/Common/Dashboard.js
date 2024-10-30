import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import PeopleIcon from "@mui/icons-material/People";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import PageMain from "../../components/PageMain";

const Dashboard = () => {
  const [evolutionData, setEvolutionData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5010/evolution_averages")
      .then((response) => {
        const data = response.data;
        const formattedData = Object.keys(data).map((key) => ({
          evolution: key,
          average: parseFloat(data[key]).toFixed(5),
        }));
        setEvolutionData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching evolution data", error);
      });
  }, []);

  return (
    <PageMain>
      <Box p={3}>
        {/* Top Row: Info Cards */}
        <Box display="flex" justifyContent="space-between" mb={3}>
          <InfoCard
            icon={<PeopleIcon fontSize="large" />}
            count="1259"
            label="Total Employees"
            bgColor="#eef2f7"
            color="#5c6bc0"
          />
          <PerformanceCard />
          <NeedleTypesCard />
          <FabricCard />
        </Box>

        {/* Middle Row: Workforce Evolution Performance Chart */}
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Paper
            variant="outlined"
            sx={{
              flex: 2,
              p: 3,
              mr: 3,
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: "#ffffff",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#3f51b5" }}
            >
              Average Performance per Evolution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={evolutionData}
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="evolution" stroke="#616161" />
                <YAxis stroke="#616161" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#3f51b5"
                  strokeWidth={3}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
          <MachineCard />
        </Box>

        {/* Bottom Row: Thread Info */}
        <ThreadCard />
      </Box>
    </PageMain>
  );
};

// Employee Performance Card
const PerformanceCard = () => (
  <Paper
    sx={{
      p: 2,
      width: "22%",
      textAlign: "center",
      borderRadius: 2,
      boxShadow: 3,
      bgcolor: "#eef2f7",
    }}
  >
    <Typography variant="h6" color="#5c6bc0">
      Employee Performance
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Efficiency Score
    </Typography>
    <LinearProgress
      variant="determinate"
      value={75}
      sx={{
        mt: 2,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#e8eaf6",
        "& .MuiLinearProgress-bar": { backgroundColor: "#4caf50" },
      }}
    />
    <Typography variant="caption" display="block" mt={1} fontWeight="bold">
      75% Efficiency
    </Typography>
  </Paper>
);

// Needle Types Card
const NeedleTypesCard = () => (
  <Paper
    sx={{
      p: 2,
      width: "22%",
      textAlign: "center",
      borderRadius: 2,
      boxShadow: 3,
      bgcolor: "#eef2f7",
    }}
  >
    <Typography variant="h6" color="#5c6bc0">
      Needle Types
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Commonly Used: Ballpoint, Universal
    </Typography>
    <Typography variant="caption" display="block" mt={1}>
      Fine for woven fabrics
    </Typography>
  </Paper>
);

// Fabric Card
const FabricCard = () => (
  <Paper
    sx={{
      p: 2,
      width: "22%",
      textAlign: "center",
      borderRadius: 2,
      boxShadow: 3,
      bgcolor: "#eef2f7",
    }}
  >
    <Typography variant="h6" color="#5c6bc0">
      Fabric
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Types: Cotton, Polyester, Silk
    </Typography>
    <Typography variant="caption" display="block" mt={1}>
      Available in multiple blends
    </Typography>
  </Paper>
);

// Machine Information Card
const MachineCard = () => (
  <Paper
    variant="outlined"
    sx={{
      flex: 1,
      p: 4,
      borderRadius: 3,
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      bgcolor: "#ffffff",
      maxWidth: 300,
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Typography
      variant="h6"
      gutterBottom
      sx={{ color: "#5c6bc0", fontWeight: "bold", mb: 1 }}
    >
      Machine Usage
    </Typography>
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      position="relative"
    >
      <CircularProgress
        variant="determinate"
        value={85}
        size={120}
        thickness={5}
        sx={{ color: "#42a5f5", position: "relative", zIndex: 1 }}
      />
      <Typography
        variant="h4"
        sx={{
          position: "absolute",
          color: "#1e88e5",
          fontWeight: "bold",
          zIndex: 2,
          top: "40%",
          transform: "translateY(-50%)",
        }}
      >
        85%
      </Typography>
      <Typography
        variant="body2"
        mt={2}
        sx={{ color: "#7b8a8f", fontSize: "0.95rem" }}
      >
        Machine Efficiency
      </Typography>
    </Box>
    <Typography
      variant="caption"
      display="block"
      mt={2}
      sx={{
        color: "#9e9e9e",
        fontSize: "0.85rem",
        mt: 3,
      }}
    >
      Includes maintenance schedule
    </Typography>

    {/* Decorative Background */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #e3f2fd 0%, #ffff 100%)",
        opacity: 0.2,
        zIndex: 0,
        borderRadius: 3,
      }}
    />
  </Paper>
);

// Thread Information Card
const ThreadCard = () => (
  <Paper
    variant="outlined"
    sx={{ mt: 3, p: 3, borderRadius: 2, boxShadow: 3, bgcolor: "#ffffff" }}
  >
    <Typography variant="h6" color="#5c6bc0">
      Thread Information
    </Typography>
    <Typography variant="body2" color="text.secondary" gutterBottom>
      Common Types: Cotton, Polyester, Nylon
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Strength and thickness vary based on fabric type.
    </Typography>
    <Typography variant="caption" display="block" mt={1} color="text.secondary">
      Specialized threads for durable stitching
    </Typography>
  </Paper>
);

// Reusable Info Card Component
const InfoCard = ({ icon, count, label, bgColor, color }) => (
  <Paper
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: bgColor,
      color: color,
      p: 2,
      width: "22%",
      textAlign: "center",
      borderRadius: 2,
      boxShadow: 3,
    }}
  >
    {icon}
    <Typography variant="h4" fontWeight="bold">
      {count}
    </Typography>
    <Typography variant="body1" fontWeight="500">
      {label}
    </Typography>
  </Paper>
);

export default Dashboard;
