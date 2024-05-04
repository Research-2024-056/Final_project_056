import React from 'react';
import PageMain from '../../components/PageMain'
import Typography from '@mui/material/Typography';

function Dashboard() {
  return (
    <PageMain>
      {/* Your Home page content goes here */}
      <Typography Heading sx={{letterSpacing:".130rem", color:"#818ea3",fontSize:".625rem" }}>
       DASHBOARD
      </Typography>
      <Typography Heading sx={{ lineHeight:1,fontWeight:"500",fontSize:"1.625rem",fontFamily:"poppins"}}>
       Main Dashboard
      </Typography>
    </PageMain>
  );
}

export default Dashboard;
