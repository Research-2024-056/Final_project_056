import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageMain from '../../components/PageMain';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
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
    axios.get('http://localhost:5010/evolution_averages')
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
        <Card sx={{ width: '100%', maxWidth: 500, boxShadow: 2 }}>
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
        <Card sx={{ width: '100%', maxWidth: 500, boxShadow: 2 }}>
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
  <Accordion key={index} sx={{ boxShadow: 2, mt: 2, borderRadius: 2 }}>
    <AccordionSummary 
      expandIcon={<ExpandMoreIcon />} 
      aria-controls={`${title}-content`} 
      id={`${title}-header`}
    >
      <Typography sx={{ color: '#008080', fontWeight: 600, fontSize: '1.2rem' }}>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
        {(() => {
          switch (title) {
            case 'Sewing Needles':
              return (
                <>
                  <b>Perfect for crafting and stitching garments!</b> These needles come in different types for a variety of fabrics:
                  <ul style={{ marginLeft: '1.5rem' }}>
                    <li><b>Universal Needles:</b> A go-to option for most fabrics.</li>
                    <li><b>Ballpoint Needles:</b> Glide smoothly through stretch fabrics without damage.</li>
                    <li><b>Jeans/Denim Needles:</b> Strong enough to penetrate heavy fabrics.</li>
                    <li><b>Embroidery Needles:</b> Feature a larger eye for thicker threads and decorative work.</li>
                  </ul>
                </>
              );

            case 'Medical Needles':
              return (
                <>
                  <b>Essential tools in healthcare and surgical procedures.</b> Different types serve specific medical needs:
                  <ul style={{ marginLeft: '1.5rem' }}>
                    <li><b>Hypodermic Needles:</b> For injections and blood withdrawal.</li>
                    <li><b>Suture Needles:</b> Used in stitching wounds and surgical incisions.</li>
                    <li><b>Cannula Needles:</b> Provide a fluid pathway for infusion or drainage.</li>
                    <li><b>Spinal Needles:</b> Administer spinal anesthesia or collect cerebrospinal fluid.</li>
                  </ul>
                </>
              );

            case 'Specialty Needles':
              return (
                <>
                  <b>Crafting and creativity made easier with these specialized tools!</b> Perfect for intricate tasks:
                  <ul style={{ marginLeft: '1.5rem' }}>
                    <li><b>Beading Needles:</b> Thin and long, ideal for threading tiny beads.</li>
                    <li><b>Quilting Needles:</b> Designed for both hand and machine quilting.</li>
                    <li><b>Leather Needles:</b> Equipped with a triangular point to pierce tough materials.</li>
                    <li><b>Tattoo Needles:</b> Precision needles used for creating permanent body art.</li>
                  </ul>
                </>
              );

            case 'Industrial Needles':
              return (
                <>
                  <b>Heavy-duty needles for high-performance industries.</b> These specialized needles are built to handle tough tasks:
                  <ul style={{ marginLeft: '1.5rem' }}>
                    <li><b>Carpet Needles:</b> Strong enough to sew through thick rugs and carpets.</li>
                    <li><b>Sail Needles:</b> Designed for stitching sails and canvas materials.</li>
                    <li><b>Longarm Machine Needles:</b> Ideal for high-speed sewing operations.</li>
                    <li><b>CNC Machine Needles:</b> Used in automated processes for precision work.</li>
                  </ul>
                </>
              );

            default:
              return 'Content for this needle type is unavailable.';
          }
        })()}
      </Typography>
    </AccordionDetails>
  </Accordion>
))}

      {/* Charts Section */}
      
    </Box>
    </PageMain>
  );
}

export default Dashboard;
