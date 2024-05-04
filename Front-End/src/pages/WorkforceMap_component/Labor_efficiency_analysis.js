import React, { useState } from 'react';
import PageMain from '../../components/PageMain';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

export default function Labor_efficiency_analysis() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        workingMinutes: '600',
        smv: '',
        goodQualityPieces: '',
    });
    const [errors, setErrors] = useState({});
    const [laborEfficiency, setLaborEfficiency] = useState(null);
    const [efficiencyGrade, setEfficiencyGrade] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!formData.id) validationErrors.id = 'ID is required';
        if (!formData.name) validationErrors.name = 'Name is required';
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
            id: '',
            name: '',
            workingMinutes: '600',
            smv: '',
            goodQualityPieces: '',
        });
        setErrors({});
        setLaborEfficiency(null);
        setEfficiencyGrade('');
    };

    return (
        <PageMain>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
                Labor Efficiency Analysis
            </Typography>
            <FormControl>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="id"
                            label="ID"
                            variant="outlined"
                            fullWidth
                            value={formData.id}
                            onChange={handleChange}
                            error={!!errors.id}
                            helperText={errors.id}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
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
                            multiline
                            rows={4}
                            fullWidth
                            value={formData.goodQualityPieces}
                            onChange={handleChange}
                            error={!!errors.goodQualityPieces}
                            helperText={errors.goodQualityPieces}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginRight: 2 }}>
                            Calculate
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleClear}>
                            Clear
                        </Button>
                    </Grid>
                    {errors.calculation && (
                        <Grid item xs={12}>
                            <Typography variant="body1" color="error">
                                {errors.calculation}
                            </Typography>
                        </Grid>
                    )}
                    {laborEfficiency !== null && (
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                Labor Efficiency: {laborEfficiency}%
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Efficiency Grade: {efficiencyGrade}
                            </Typography>
                            <Gauge
                                value={parseFloat(laborEfficiency)}
                                startAngle={-110}
                                endAngle={110}
                                sx={{
                                    width: '100%',
                                    height: '200px',
                                    margin: '20px 0',
                                    [`& .${gaugeClasses.valueText}`]: {
                                        fontSize: 24,
                                        position: 'absolute',
                                        top: '%',
                                        left: '50%',
                                        transform: 'translate(0%, 0%)',
                                    },
                                }}
                                text={({ value, valueMax }) => `${value.toFixed(2)} / ${valueMax}`}
                            />
                        </Grid>
                    )}
                </Grid>
            </FormControl>
        </PageMain>
    );
}
