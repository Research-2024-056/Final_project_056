import React from 'react'

import PageMain from '../../components/PageMain';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid, Box } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

function WorkforceMapDashboard() {
    return (

        <PageMain>
            <Typography Heading sx={{ letterSpacing: ".130rem", color: "#818ea3", fontSize: ".625rem" }}>
                DASHBOARD
            </Typography>
            <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.625rem", fontFamily: "poppins" }}>
                Workforce-Map Dashboard
            </Typography>

            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "30px" }}>
                    <Grid item xs={15} sm={4}>
                        <Button sx={{ width: "100%", height: "100%" }} variant="outlined" href='/LaborEfficiencyAnalysis' endIcon={<ArrowOutwardIcon />}>
                            Labor Efficiency Analysis
                        </Button>
                    </Grid>
                    <Grid item xs={15} sm={4}>
                        <Button sx={{ width: "100%", height: "100%" }} variant="outlined" href='/LookUpPerformance' endIcon={<ArrowOutwardIcon />}>
                            Lookup Performance
                        </Button>
                    </Grid>
                    <Grid item xs={15} sm={4}>
                        <Button sx={{ width: "100%", height: "100%" }} variant="outlined" href='/DynamicSeatPlanner' endIcon={<ArrowOutwardIcon />}>
                            Dynamic Seat Planner
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </PageMain>

    )
}

export default WorkforceMapDashboard;
