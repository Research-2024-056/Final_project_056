import React, { useState, useEffect } from 'react';
import PageMain from '../../components/PageMain';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { gaugeClasses } from '@mui/x-charts/Gauge';
import Gauge from 'react-gauge-component';
import {
    Typography,
    Paper,
    Divider,
    Box,
    Switch,
    FormControlLabel,
} from '@mui/material';


export default function Labor_efficiency_analysis() {

    const [EmpNoOptions, setEmpNoOptions] = useState([]);
    
    const [formData, setFormData] = useState({
        Emp_No: '',
        Name: '',
        workingMinutes: '600',
        smv: '',
        goodQualityPieces: '',
    });
    const [errors, setErrors] = useState({});
    const [laborEfficiency, setLaborEfficiency] = useState(null);
    const [efficiencyGrade, setEfficiencyGrade] = useState('');
    const [showGauge, setShowGauge] = useState(true);
    const [gaugeSize, setGaugeSize] = useState(200);

    useEffect(() => {
        const fetchEmpNoOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get_emp_no');
                setEmpNoOptions(response.data.Emp_No);
            } catch (error) {
                console.error('Error fetching Emp_No options:', error);
            }
        };
        fetchEmpNoOptions();
    }, []);

    const handleEmpNoChange = async (e) => {
        const empNo = e.target.value;
        setFormData((prevData) => ({ ...prevData, Emp_No: empNo }));

        try {
            const response = await axios.post('http://localhost:5000/get_employee_name', { Emp_No: empNo });
            setFormData((prevData) => ({ ...prevData, Name: response.data.Name }));
        } catch (error) {
            console.error('Error fetching Employee Name:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!formData.Emp_No) validationErrors.Emp_No = 'Emp No is required';
        if (!formData.Name) validationErrors.Name = 'Name is required';
        if (!formData.workingMinutes) validationErrors.workingMinutes = 'Working Minutes is required';
        if (!formData.smv) validationErrors.smv = 'SMV is required';
        if (!formData.goodQualityPieces) validationErrors.goodQualityPieces = 'Good Quality Pieces is required';

        if (Object.keys(validationErrors).length === 0) {
            const goodQualityPieces = parseFloat(formData.goodQualityPieces);
            const smv = parseFloat(formData.smv);
            const workingMinutes = parseFloat(formData.workingMinutes);

            if (isNaN(goodQualityPieces) || isNaN(smv) || isNaN(workingMinutes)) {
                setErrors({ ...validationErrors, calculation: 'Invalid input for calculation' });
                setLaborEfficiency(null);
                setEfficiencyGrade('');
            } else {
                const efficiency = ((goodQualityPieces * smv) / workingMinutes) * 100;
                setLaborEfficiency(efficiency.toFixed(2));

                if (efficiency >= 91) {
                    setEfficiencyGrade('A (Highly Efficient)');
                } else if (efficiency >= 81) {
                    setEfficiencyGrade('B (Very Efficient)');
                } else if (efficiency >= 71) {
                    setEfficiencyGrade('C (Moderately Efficient)');
                } else if (efficiency >= 61) {
                    setEfficiencyGrade('D (Low Efficiency)');
                } else {
                    setEfficiencyGrade('E (Poor Efficiency)');
                }

                setErrors({});
            }
        } else {
            setErrors(validationErrors);
            setLaborEfficiency(null);
            setEfficiencyGrade('');
        }
    };

    const handleClear = () => {
        setFormData({
            Emp_No: '',
            Name: '',
            workingMinutes: '600',
            smv: '',
            goodQualityPieces: '',
        });
        setErrors({});
        setLaborEfficiency(null);
        setEfficiencyGrade('');
    };


    //Prediction
    
    const [Evolution_01Performance, setEvolution_01] = useState('');
    const [Evolution_02Performance, setEvolution_02] = useState('');
    const [Evolution_03Performance, setEvolution_03] = useState('');
    const [Evolution_04Performance, setEvolution_04] = useState('');
    const [Evolution_05Performance, setEvolution_05] = useState('');
    const [predictedPerformance, setPredictedPerformance] = useState('');

    
    const handleSubmitPredict = async (e) => {
        e.preventDefault();

        const inputData = {
            Evolution_01: Evolution_01Performance,
            Evolution_02: Evolution_02Performance,
            Evolution_03: Evolution_03Performance,
            Evolution_04: Evolution_04Performance,
            Evolution_05: Evolution_05Performance,
        };

        try {
            const response = await axios.post('http://localhost:5000/predict', inputData);
            setPredictedPerformance(response.data.predicted_next_performance);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <PageMain>
            <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.5rem", fontFamily: "poppins", marginBottom: '2%' }}>
                Labor Efficiency Analysis
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.5rem", fontFamily: "poppins" }}>
                            Efficiency Calculator
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <FormControl fullWidth>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        name="Emp_No"
                                        label="Emp No"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.Emp_No}
                                        onChange={handleEmpNoChange}
                                        error={!!errors.Emp_No}
                                        helperText={errors.Emp_No}
                                    >
                                        {EmpNoOptions.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="Name"
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.Name}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="workingMinutes"
                                        label="Working Minutes"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.workingMinutes}
                                        onChange={handleChange}
                                        error={!!errors.workingMinutes}
                                        helperText={errors.workingMinutes}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="smv"
                                        label="SMV"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.smv}
                                        onChange={handleChange}
                                        error={!!errors.smv}
                                        helperText={errors.smv}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="goodQualityPieces"
                                        label="Good Quality Pieces"
                                        variant="outlined"
                                        fullWidth
                                        value={formData.goodQualityPieces}
                                        onChange={handleChange}
                                        error={!!errors.goodQualityPieces}
                                        helperText={errors.goodQualityPieces}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                        sx={{ mr: 2 }}
                                    >
                                        Calculate
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={handleClear}
                                    >
                                        Clear
                                    </Button>
                                </Grid>
                            </Grid>
                        </FormControl>
                        {laborEfficiency !== null && (
                            <Box mt={4}>
                                <Typography fontSize={17} gutterBottom>
                                    Efficiency: {laborEfficiency}%
                                </Typography>
                                <Typography fontSize={17} gutterBottom>
                                    Grade: {efficiencyGrade}
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={showGauge}
                                            onChange={(e) => setShowGauge(e.target.checked)}
                                        />
                                    }
                                    label="Show Gauge"
                                />
                                {showGauge && (
                                    <>
                                         <Gauge
                                            value={parseFloat(laborEfficiency)}
                                            startAngle={-110}
                                            endAngle={110}
                                            sx={{
                                                width: gaugeSize,
                                                height: gaugeSize / 2,
                                                margin: '20px 0',
                                                [`& .${gaugeClasses.valueText}`]: {
                                                    fontSize: 24,
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                },
                                            }}
                                            text={({ value, valueMax }) =>
                                                `${value.toFixed(2)} / ${valueMax}`
                                            }
                                        />

                                    </>
                                )}
                            </Box>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Performance Prediction Section */}
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.5rem", fontFamily: "poppins" }}>
                            Performance Prediction
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <FormControl fullWidth>
                            <Grid item xs={12}>
                                <TextField
                                    name="Evolution_01"
                                    label="Evolution 01"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                    value={Evolution_01Performance}
                                    onChange={(e) => setEvolution_01(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="Evolution_02"
                                    label="Evolution 02"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                    value={Evolution_02Performance}
                                    onChange={(e) => setEvolution_02(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="Evolution_03"
                                    label="Evolution 03"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                    value={Evolution_03Performance}
                                    onChange={(e) => setEvolution_03(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="Evolution_04"
                                    label="Evolution 04"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                    value={Evolution_04Performance}
                                    onChange={(e) => setEvolution_04(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="Evolution_05"
                                    label="Evolution05"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                    value={Evolution_05Performance}
                                    onChange={(e) => setEvolution_05(e.target.value)}
                                />
                            </Grid>
                            <form onSubmit={handleSubmitPredict}>
                                {/* Add input fields for prediction */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Predict Performance
                                </Button>
                            </form>
                        </FormControl>
                        <div style={{ textAlign: 'center' }} >
                        {predictedPerformance && (
                            <Box mt={4}>
                                <Typography fontSize={15} gutterBottom>
                                    Predicted Next Performance:
                                </Typography>
                                <Typography color="error" variant="h6" gutterBottom>
                                    {predictedPerformance}
                                </Typography>
                            </Box>
                        )}
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </PageMain>
    );
};
