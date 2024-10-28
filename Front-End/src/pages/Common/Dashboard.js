import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageMain from '../../components/PageMain';
import { Typography, Box, Card, CardContent, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

function Dashboard() {
 
  //Workforce map - chart for labor average performance 
  const [evolutionData, setEvolutionData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/evolution_averages')
      .then((response) => {
        const data = response.data;
        const formattedData = Object.keys(data).map((key) => ({
          evolution: key,
          average: parseFloat(data[key]).toFixed(5), 
        }));
        setEvolutionData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching evolution data', error);
      });
  }, []);


  const uData = [
    { name: 'Cotton', value: 26.36 },
    { name: 'Silk', value: 28.17 },
    { name: 'Polyester', value: 29.73 },
    { name: 'Nylon', value: 26.01 },
    { name: 'Rayon', value: 26.88 },
    { name: 'Wool', value: 27.98 },
    { name: 'Linen', value: 27.94 },
  ];

  return (
    <PageMain>
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Main Dashboard
      </Typography>

      {/* Main Card Section */}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 3 }}>
        {/* Left Side: Most Exported End Use (Pie Chart) */}
        <Card sx={{ width: 500, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" align="center" sx={{ fontWeight: '500', mb: 2 }}>
              Most Exported End Use
            </Typography>
            <Box display="flex" justifyContent="center">
              <PieChart
                series={[{ data: [{ id: 0, value: 30, label: 'Textile' }, { id: 1, value: 25, label: 'Automotive' }, { id: 2, value: 20, label: 'Construction' }, { id: 3, value: 15, label: 'Electronics' }, { id: 4, value: 10, label: 'Home Furnishing' }] }]}
                width={500}
                height={230}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Right Side: Yearly Income (Bar Chart) */}
        <Card sx={{ width: 500, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" align="center" sx={{ fontWeight: '500', mb: 2 }}>
              Yearly Income
            </Typography>
            <Box display="flex" justifyContent="center">
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['2019', '2020', '2021', '2022', '2023'] }]}
                series={[{ label: 'Income (in millions)', data: [4.2, 5.2, 6.3, 7.1, 8.4] }]}
                width={450}
                height={300}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mt: 4, paddingLeft:"80px" }}>
        {/* Fabric Durability Chart */}
        <Card sx={{ width: '100%', maxWidth: 600, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
              Commonly Used Fabrics' Durability
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={uData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#3f51b5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Workforce Evolution Performance Chart */}
        <Card sx={{ width: '100%', maxWidth: 600, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
              Average Performance per Evolution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={evolutionData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="evolution" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="average" stroke="#3f51b5" strokeWidth={3} dot />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Needle Types Section */}
      <Typography variant="h5" sx={{ fontWeight: '500', mt: 4, mb: 2 }}>
        Needle Types
      </Typography>

      {/* Accordion for Needle Types */}
      {['Sewing Needles', 'Medical Needles', 'Specialty Needles', 'Industrial Needles'].map((title, index) => (
        <Accordion key={index} sx={{ boxShadow: 1, mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${title}-content`} id={`${title}-header`}>
            <Typography sx={{ color: '#008080', fontWeight: 500 }}>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">Content for {title}.</Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Charts Section */}
      
    </Box>
    </PageMain>
  );
}

export default Dashboard;
