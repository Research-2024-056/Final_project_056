// import React, { useState, useEffect } from 'react';
// import PageMain from '../../components/PageMain';
// import Typography from '@mui/material/Typography';
// import axios from 'axios';
// import { Box } from '@mui/material';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

// function Dashboard() {
//   // Preproduction line chart
//   const uData = [
//     { name: 'Cotton', value: 26.36 },
//     { name: 'Silk', value: 28.17 },
//     { name: 'Polyester', value: 29.73 },
//     { name: 'Nylon', value: 26.01 },
//     { name: 'Rayon', value: 26.88 },
//     { name: 'Wool', value: 27.98 },
//     { name: 'Linen', value: 27.94 },
//   ];

//   // Workforce Map Graph in Dashboard
//   const [evolutionData, setEvolutionData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/evolution_averages')
//       .then((response) => {
//         const data = response.data;
//         const formattedData = Object.keys(data).map((key) => ({
//           evolution: key,
//           average: data[key],
//         }));
//         setEvolutionData(formattedData);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('There was an error fetching the evolution data!', error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <PageMain>
//       <Typography
//         sx={{ lineHeight: 1, fontWeight: 500, fontSize: '1.625rem', fontFamily: 'Poppins' }}
//       >
//         Main Dashboard
//       </Typography>

//       {/* Fabric Durability Chart */}
//       <Typography
//         sx={{
//           lineHeight: 1,
//           fontWeight: 500,
//           fontSize: '1.325rem',
//           fontFamily: 'Poppins',
//           marginTop: '30px',
//           marginBottom: '20px',
//         }}
//       >
//         Commonly Used Fabrics' Durability
//       </Typography>
//       <Box sx={{ width: '100%', height: 300 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={uData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="value" stroke="#3f51b5" strokeWidth={3} />
//           </LineChart>
//         </ResponsiveContainer>
//       </Box>

//       {/* Workforce Evolution Performance Chart */}
//       <Box sx={{ width: '100%', marginTop: '30px' }}>
//         <Typography
//           sx={{
//             lineHeight: 1,
//             fontWeight: 500,
//             fontSize: '1.25rem',
//             fontFamily: 'Poppins',
//             color: '#424242',
//             marginBottom: '20px',
//           }}
//         >
//           Average Performance per Evolution
//         </Typography>

//         {loading ? (
//           <Typography>Loading...</Typography>
//         ) : (
//           <ResponsiveContainer width="50%" height={300}>
//             <LineChart data={evolutionData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//               <XAxis
//                 dataKey="evolution"
//                 label={{ value: 'Evolution Stages', position: 'insideBottomRight', offset: -10 }}
//                 tick={{ fill: '#424242' }}
//               />
//               <YAxis
//                 label={{ value: 'Average Performance', angle: -90, position: 'insideLeft' }}
//                 tick={{ fill: '#424242' }}
//               />
//               <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '10px' }} />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="average"
//                 stroke="#3f51b5"
//                 strokeWidth={3}
//                 dot={{ r: 6, fill: '#f11b5' }}
//                 activeDot={{ r: 8 }}
//                 animationDuration={1000}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         )}
//       </Box>
//     </PageMain>
//   );
// }

// export default Dashboard;


import React from 'react';
import PageMain from '../../components/PageMain';
import Typography from '@mui/material/Typography';
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
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { PieChart } from '@mui/x-charts/PieChart';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { BarChart } from '@mui/x-charts/BarChart';


function Dashboard() {
  // Fabric Durability Data
  const uData = [
    { name: 'Cotton', value: 26.36 },
    { name: 'Silk', value: 28.17 },
    { name: 'Polyester', value: 29.73 },
    { name: 'Nylon', value: 26.01 },
    { name: 'Rayon', value: 26.88 },
    { name: 'Wool', value: 27.98 },
    { name: 'Linen', value: 27.94 },
  ];

  // Dummy Data for Workforce Evolution Performance
  const evolutionData = [
    { evolution: 'Evolution_01', average: 0.73 },
    { evolution: 'Evolution_02', average: 0.78 },
    { evolution: 'Evolution_03', average: 0.80 },
    { evolution: 'Evolution_04', average: 0.84 },
    { evolution: 'Evolution_05', average: 0.90 },
    { evolution: 'Last_Evolution', average: 0.92 },
  ];

  return (
    <PageMain>
      <Typography
        sx={{ lineHeight: 1, fontWeight: 500, fontSize: '1.625rem', fontFamily: 'Poppins' , paddingBottom:"20px" }}
      >
        Main Dashboard
      </Typography>

    
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
      }}
    >
      {/* Left Side: Most Exported End Use (Pie Chart) */}
      <Card sx={{ width: 600, margin: '0 auto', boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 500, marginBottom: '16px', textAlign: 'center' }}
          >
            Most Exported End Use
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'left' }}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 30, label: 'Textile' },
                    { id: 1, value: 25, label: 'Automotive' },
                    { id: 2, value: 20, label: 'Construction' },
                    { id: 3, value: 15, label: 'Electronics' },
                    { id: 4, value: 10, label: 'Home Furnishing' },
                  ],
                },
              ]}
              width={600}
              height={300}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Right Side: Yearly Income (Bar Chart) */}
      <Card sx={{ width: 600, margin: '0 auto', boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 500, marginBottom: '16px', textAlign: 'center' }}
          >
            Yearly Income
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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




      <Typography
        sx={{ lineHeight: 1, fontWeight: 500, fontSize: '1.425rem', fontFamily: 'Poppins' , paddingBottom:"20px" , paddingTop:"20px" }}
      >
        Needle Types
      </Typography>

      {/* Sewing Needles Accordion */}
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography   color="#008080">Sewing Needles</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>Universal Needles:</strong> Suitable for various fabrics like cotton, linen, and synthetics.
          </Typography>
          <Typography>
            <strong>Ballpoint Needles:</strong> Designed for knit fabrics with a rounded tip.
          </Typography>
          <Typography>
            <strong>Sharps:</strong> Ideal for delicate fabrics like silk and microfiber.
          </Typography>
          <Typography>
            <strong>Quilting Needles:</strong> Tapered needles used for quilting through multiple fabric layers.
          </Typography>
          <Typography>
            <strong>Embroidery Needles:</strong> Feature a larger eye to accommodate embroidery threads.
          </Typography>
          <Typography>
            <strong>Jeans/Denim Needles:</strong> Thick, durable needles designed for heavy fabrics like denim.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Medical Needles Accordion */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography color="	#008080" >Medical Needles</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>Hypodermic Needles:</strong> Used to inject or extract fluids. Available in various sizes (gauge).
          </Typography>
          <Typography>
            <strong>Suture Needles:</strong> Used in surgeries to stitch tissues, available in curved or straight forms.
          </Typography>
          <Typography>
            <strong>Cannula Needles:</strong> Used in IVs for inserting flexible tubes in veins.
          </Typography>
          <Typography>
            <strong>Spinal Needles:</strong> Long needles used for spinal anesthesia or lumbar punctures.
          </Typography>
          <Typography>
            <strong>Insulin Needles:</strong> Short, thin needles for diabetic insulin injections.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Specialty Needles Accordion */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography   color="	#008080"  >Specialty Needles</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>Beading Needles:</strong> Thin needles with small eyes for intricate beadwork.
          </Typography>
          <Typography>
            <strong>Darning Needles:</strong> Large-eye needles used for mending or darning fabrics.
          </Typography>
          <Typography>
            <strong>Felting Needles:</strong> Barbed needles used in needle felting to mesh fibers together.
          </Typography>
          <Typography>
            <strong>Leather Needles:</strong> Wedge-shaped needles for sewing through leather or suede.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Industrial Needles Accordion */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <Typography  color="	#008080"  >Industrial Needles</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>Upholstery Needles:</strong> Strong needles for thick materials like upholstery and foam.
          </Typography>
          <Typography>
            <strong>Curved Needles:</strong> Used in applications like mattress making for better maneuverability.
          </Typography>
        </AccordionDetails>
        
      </Accordion>


      

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between', // to space the charts apart
          flexWrap: 'wrap', // make it responsive
          gap: '30px', // spacing between the charts
          marginTop: '30px',
        }}
      >
        {/* Fabric Durability Chart */}
        <Box sx={{ width: '100%', maxWidth: '600px', height: 300 }}>
          <Typography
            sx={{
              lineHeight: 1,
              fontWeight: 500,
              fontSize: '1.325rem',
              fontFamily: 'Poppins',
              marginBottom: '20px',
            }}
          >
            Commonly Used Fabrics' Durability
          </Typography>
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
        <Box sx={{ width: '100%', maxWidth: '600px', height: 300 }}>
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
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={evolutionData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                dataKey="evolution"
                label={{ value: 'Evolution Stages', position: 'insideBottomRight', offset: -10 }}
                tick={{ fill: '#424242' }}
              />
              <YAxis
                label={{ value: 'Performance', angle: -90, position: 'insideLeft' }}
                tick={{ fill: '#424242' }}
                domain={[0, 1]} // Set domain to ensure performance is between 0 and 1
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
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: 100,
          marginTop:"50px",
          borderRadius: 1,
          bgcolor: '#1c2434',
          '&:hover': {
            bgcolor: '#1c2434',
          },
        }}
      />
    </PageMain>
  );
}

export default Dashboard;
