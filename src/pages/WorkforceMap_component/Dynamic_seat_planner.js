import React from 'react'

import PageMain from '../../components/PageMain'
import Typography from '@mui/material/Typography';


export default function Dynamic_seat_planner() {
    return (

        <PageMain>

            <Typography Heading sx={{ letterSpacing: ".130rem", color: "#818ea3", fontSize: ".625rem" }}>
                DASHBOARD
            </Typography>
            <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.625rem", fontFamily: "poppins" }}>
                Dynamic Seat Planner
            </Typography>

        </PageMain>
    )
}
