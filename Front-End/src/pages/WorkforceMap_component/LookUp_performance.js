// import React, { useState, useEffect } from 'react';
// import PageMain from '../../components/PageMain';
// import Typography from '@mui/material/Typography';
// import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input, Box, CircularProgress, TextField, InputAdornment } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { grey } from '@mui/material/colors';
// import * as XLSX from 'xlsx';
// import defaultExcelFile from '../../assets/baaa.xlsx';
// import SearchIcon from '@mui/icons-material/Search';


// export default function LookUp_performance() {
//     const [excelData, setExcelData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [fileName, setFileName] = useState('');

//     useEffect(() => {
//         const readDefaultFile = async () => {
//             const response = await fetch(defaultExcelFile);
//             const data = await response.arrayBuffer();
//             const workbook = XLSX.read(data, { type: 'array' });
//             const sheetName = workbook.SheetNames[0];
//             const sheet = workbook.Sheets[sheetName];
//             const jsonData = XLSX.utils.sheet_to_json(sheet);
//             setExcelData(jsonData);
//             setFileName(defaultExcelFile.split('/').pop());
//             setLoading(false);
//         };

//         readDefaultFile();
//     }, []);

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];

//         if (file) {
//             setLoading(true);
//             const reader = new FileReader();

//             reader.onload = (event) => {
//                 const data = new Uint8Array(event.target.result);
//                 const workbook = XLSX.read(data, { type: 'array' });
//                 const sheetName = workbook.SheetNames[0];
//                 const sheet = workbook.Sheets[sheetName];
//                 const jsonData = XLSX.utils.sheet_to_json(sheet);
//                 setExcelData(jsonData);
//                 setFileName(file.name);
//                 setLoading(false);
//             };

//             reader.readAsArrayBuffer(file);
//         }
//     };

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const highlightSearchTerm = (text, term) => {
//         const regex = new RegExp(`(${term})`, 'gi');
//         return text.split(regex).map((part, index) => 
//             regex.test(part) ? <span key={index} style={{ backgroundColor: '#FFC107', fontWeight: 'bold' }}>{part}</span> : part
//         );
//     };

//     const filteredData = excelData ? excelData.filter(row => {
//         return Object.values(row).some(cell => cell.toString().toLowerCase().includes(searchTerm.toLowerCase()));
//     }) : [];

//     return (
//         <PageMain>
//             <Typography variant="h2" sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.625rem", fontFamily: "poppins", marginBottom: "40px" }}>
//                 LookUp Performance
//             </Typography>

//             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
//                 <Input
//                     type="file"
//                     onChange={handleFileChange}
//                     accept=".xlsx, .xls"
//                     style={{ display: 'none' }}
//                     id="fileInput"
//                 />
//                 <label htmlFor="fileInput">
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         component="span"
//                         startIcon={<CloudUploadIcon />}
//                         size="large"
//                         disabled={loading}
//                     >
//                         {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload Excel File'}
//                     </Button>
//                 </label>
//                 {fileName && <Typography variant="body1" mt={2}>File: {fileName}</Typography>}
//             </Box>

//             {excelData && (
//                 <Box sx={{ marginBottom: '40px' }}>
//                     <TextField
//                         label="Search"
//                         variant="outlined"
//                         fullWidth
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         sx={{ marginBottom: '20px' }}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon />
//                                 </InputAdornment>
//                             ),
//                         }}
//                     />
//                     <TableContainer component={Paper}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow sx={{ backgroundColor: grey[200] }}>
//                                     {Object.keys(excelData[0]).map((header, index) => (
//                                         <TableCell key={index} sx={{ fontWeight: 'bold', color: grey[700] }}>{header}</TableCell>
//                                     ))}
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {filteredData.map((row, rowIndex) => (
//                                     <TableRow key={rowIndex}>
//                                         {Object.values(row).map((cell, cellIndex) => (
//                                             <TableCell key={cellIndex}>
//                                                 {typeof cell === 'string' ? highlightSearchTerm(cell, searchTerm) : cell}
//                                             </TableCell>
//                                         ))}
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Box>
//             )}
//         </PageMain>
//     );
// }