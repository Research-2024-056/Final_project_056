import React from 'react'

import PageMain from '../../components/PageMain'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function LookUp_performance() {
    return (

        <PageMain>

            <Typography Heading sx={{ letterSpacing: ".130rem", color: "#818ea3", fontSize: ".625rem" }}>
                DASHBOARD
            </Typography>
            <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.625rem", fontFamily: "poppins", marginBottom: "60px" }}>
                LookUp Performance
            </Typography>

            <center>
                <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.425rem", fontFamily: "poppins", marginTop: "60px" }}>
                    Lookup Labor Performance Data
                </Typography>
                <TextField
                    id="outlined-password-input"
                    label="Enter the Labor ID"
                    type="text"
                    autoComplete="current-password"
                    sx={{
                        width: "60%",
                        marginTop: "35px"
                    }}
                />
                <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "18px", fontFamily: "poppins", marginTop: "60px" }}>
                    *Provide the ID of the labor you want to check efficiency
                </Typography>
            </center>

        </PageMain>
    )
}
