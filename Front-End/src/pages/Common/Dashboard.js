import React, { useState, useEffect } from 'react';
import PageMain from '../../components/PageMain';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Box } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function Dashboard() {
  // Preproduction line chart
  const uData = [
    { name: 'Cotton', value: 26.36 },
    { name: 'Silk', value: 28.17 },
    { name: 'Polyester', value: 29.73 },
    { name: 'Nylon', value: 26.01 },
    { name: 'Rayon', value: 26.88 },
    { name: 'Wool', value: 27.98 },
    { name: 'Linen', value: 27.94 },
  ];

  // Workforce Map Graph in Dashboard
  // const [evolutionData, setEvolutionData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:5000/evolution_averages')
  //     .then((response) => {
  //       const data = response.data;
  //       const formattedData = Object.keys(data).map((key) => ({
  //         evolution: key,
  //         average: data[key],
  //       }));
  //       setEvolutionData(formattedData);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('There was an error fetching the evolution data!', error);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <PageMain>
      <Typography
        sx={{ lineHeight: 1, fontWeight: 500, fontSize: '1.625rem', fontFamily: 'Poppins' }}
      >
        Main Dashboard
      </Typography>

      {/* Fabric Durability Chart */}
      <Typography
        sx={{
          lineHeight: 1,
          fontWeight: 500,
          fontSize: '1.325rem',
          fontFamily: 'Poppins',
          marginTop: '30px',
          marginBottom: '20px',
        }}
      >
        Commonly Used Fabrics' Durability
      </Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={uData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#3f51b5" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Workforce Evolution Performance Chart */}
      {/* <Box sx={{ width: '100%', marginTop: '30px' }}>
        <Typography
          sx={{
            lineHeight: 1,
            fontWeight: 500,
            fontSize: '1.25rem',
            fontFamily: 'Poppins',
            color: '#424242',
            marginBottom: '20px',
          }}
        >
          Average Performance per Evolution
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <ResponsiveContainer width="50%" height={300}>
            <LineChart data={evolutionData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                dataKey="evolution"
                label={{ value: 'Evolution Stages', position: 'insideBottomRight', offset: -10 }}
                tick={{ fill: '#424242' }}
              />
              <YAxis
                label={{ value: 'Average Performance', angle: -90, position: 'insideLeft' }}
                tick={{ fill: '#424242' }}
              />
              <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '10px' }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="average"
                stroke="#3f51b5"
                strokeWidth={3}
                dot={{ r: 6, fill: '#f11b5' }}
                activeDot={{ r: 8 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box> */}
    </PageMain>
  );
}

export default Dashboard;
