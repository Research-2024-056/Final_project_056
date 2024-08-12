import React, { useState, useEffect } from 'react';
import PageMain from '../../components/PageMain'
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {

  //Workforce Map Graph in Dash
  const [evolutionData, setEvolutionData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/evolution_averages')
      .then(response => {
        const data = response.data;
        const formattedData = Object.keys(data).map(key => ({
          evolution: key,
          average: data[key]
        }));
        setEvolutionData(formattedData);
      })
      .catch(error => {
        console.error('There was an error fetching the evolution data!', error);
      });
  }, []);

  return (
    <PageMain>
      {/* Your Home page content goes here */}
      <Typography Heading sx={{ lineHeight:1,fontWeight:"500",fontSize:"1.625rem",fontFamily:"poppins"}}>
       Main Dashboard
      </Typography>

      {/* Workforce Map Graph in Dash */}
      <Box sx={{ width: '100%', marginTop: '30px' }}>
          <Typography
            sx={{
              lineHeight: 1,
              fontWeight: "500",
              fontSize: "1.25rem",
              fontFamily: "Poppins",
              color: '#424242',
              marginBottom: '20px'
            }}
          >
            Average Performance per Evolution
          </Typography>
          <ResponsiveContainer width="50%" height={300}>
            <LineChart
              data={evolutionData}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                dataKey="evolution"
                label={{ value: 'Evolution Stages', position: 'insideBottomRight', offset: -10, fill: '#424242' }}
                tick={{ fill: '#424242' }}
              />
              <YAxis
                label={{ value: 'Average Performance', angle: -90, position: 'insideLeft', fill: '#424242' }}
                tick={{ fill: '#424242' }}
              />
              <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '10px', border: 'none' }} />
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
        </Box>



    </PageMain>
  );
}

export default Dashboard;
