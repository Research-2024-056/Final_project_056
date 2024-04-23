import React from 'react';
import PageMain from '../../components/PageMain'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid , Box} from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { LineChart } from '@mui/x-charts/LineChart';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function PreProduction_component() {
    // line chart

const uData = [4000, 3000, 2000, 2780, 1890, 2390];

const xLabels = [
  'Cotton',
  'Silk',
  'Polyester',
  'Nylon',
  'Rayon',
  'Wool',
 
];

  return (
    <PageMain>
      {/* Your Home page content goes here */}
      <Typography Heading sx={{letterSpacing:".130rem", color:"#818ea3",fontSize:".625rem" }}>
       DASHBOARD
      </Typography>
      <Typography Heading sx={{ lineHeight:1,fontWeight:"500",fontSize:"1.625rem",fontFamily:"poppins"}}>
       Pre Prodction Dashboard
      </Typography>
      <Box sx={{ width: '100%' }}>
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{marginTop:"30px"}}>
    <Grid item xs={12} sm={6}>
      <Button sx={{width:"80%", height:"100%"}} variant="outlined"  href='/Durabilitycheck' endIcon={<ArrowOutwardIcon />}>
        Check Fabric Durability
      </Button>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Button sx={{width:"80%", height:"100%"}} variant="outlined" endIcon={<ArrowOutwardIcon />}>
        Get Pre Production Decisions
      </Button>
    </Grid>
  </Grid>
</Box>

<Typography Heading sx={{ lineHeight:1,fontWeight:"500",fontSize:"1.325rem",fontFamily:"poppins" ,marginTop:"30px" , marginBottom:"20px"}}>
       Commonly Using Fabric Durability
      </Typography>
<LineChart
      sx={{width:"100%"}}
      height={300}
      series={[
        { data: uData, label: 'Durability' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />

<Typography Heading sx={{ lineHeight:1,fontWeight:"500",fontSize:"1.325rem",fontFamily:"poppins" ,marginTop:"30px" , marginBottom:"20px"}}>
      Latest Fabric Thread Combinations
      </Typography>
      <Box sx={{ width: '100%' }}>
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{marginTop:"30px"}}>
    {[1, 2, 3].map((item) => (
      <Grid item xs={12} sm={4} key={item}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={`/static/images/cards/contemplative-reptile${item}.jpg`}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard {item}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>


    </PageMain>
  );
}

export default PreProduction_component;
