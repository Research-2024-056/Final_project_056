import React from 'react'

import PageMain from '../../components/PageMain'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function Labor_efficiency_analysis() {
    return (

        <PageMain>

            <Typography Heading sx={{ letterSpacing: ".130rem", color: "#818ea3", fontSize: ".625rem" }}>
                DASHBOARD
            </Typography>
            <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.625rem", fontFamily: "poppins" }}>
                Labor Efficiency Analysis
            </Typography>

            <TextField
                id="filled-multiline-flexible"
                label="ID"
                multiline
                maxRows={4}
                variant="filled"
            />
            <TextField
                id="filled-multiline-flexible"
                label="Name"
                multiline
                maxRows={4}
                variant="filled"
            />
            <TextField
                id="filled-multiline-flexible"
                label="Operations"
                multiline
                maxRows={4}
                variant="filled"
            />
            <TextField
                id="filled-multiline-flexible"
                label="SMV"
                multiline
                maxRows={4}
                variant="filled"
            />
            <TextField
                id="filled-multiline-flexible"
                label="Good Quality Pieces"
                multiline
                maxRows={4}
                variant="filled"
            />

        </PageMain>
    )
}
