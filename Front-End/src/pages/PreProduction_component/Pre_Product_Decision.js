import React, { useState, useEffect } from 'react';
import PageMain from '../../components/PageMain';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import Autocomplete from '@mui/material/Autocomplete';
import GestureIcon from '@mui/icons-material/Gesture';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LineChart } from '@mui/x-charts/LineChart';
import jsPDF from 'jspdf';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'white',
  maxHeight: '600px',
  overflowY: 'auto',  // Added for scrollable content
  boxShadow: 24,
  borderRadius: '12px',
  p: 4,
};


function DicisionMake() {
  const [showCards, setShowCards] = useState(false);
  const [endUse, setEndUse] = useState('');
  const [fabricsDurabilities, setFabricsDurabilities] = useState([]);
  const [fabricprice, setFabricprice] = useState([]);
  const [threadprice, setThreadprice] = useState([]);

  const [fabricdata, setFabricData] = useState([]);
  const [fabricfuturedata, setFabricfutureData] = useState([]);
  const [fabricfuture25data, setFabricfuture25Data] = useState("");
  const [fabricfuture26data, setFabricfuture26Data] = useState("");
  const [fabricfuture27data, setFabricfuture27Data] = useState("");

  const [thread1data, setthread1data] = useState([]);
  const [thread2data, setthread2data] = useState([]);
  const [thread3data, setthread3data] = useState([]);

  const [threadfuture25data, setThreadfuture25Data] = useState("");
  const [threadfuture26data, setThreadfuture26Data] = useState("");
  const [threadfuture27data, setThreadfuture27Data] = useState("");



  const handleSendRequestfabric = () => {
    if (!endUse) {
      console.error('End use is empty or undefined');
      return;
    }
    const requestData = {
      'end_use': endUse
    }

    axios.post('http://127.0.0.1:5000/get_fabrics_for_end_use', requestData)
      .then(response => {
        console.log('Fabrics and Durabilities:', response.data.fabrics_durabilities);
        setFabricsDurabilities(response.data.fabrics_durabilities);
      })
      .catch(error => {
        console.error('Error fetching fabrics and durabilities:', error);
      });
  };





  useEffect(() => {
    // Fetch End Use values from the backend
    axios.get('http://127.0.0.1:5000/load_all_fabric_data')
      .then(response => {
        setFabricprice(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching End Use values:', error);
      });

  }, []);

  useEffect(() => {
    // Fetch End Use values from the backend
    axios.get('http://127.0.0.1:5000/load_all_thread_data')
      .then(response => {
        setThreadprice(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching End Use values:', error);
      });

  }, []);
  // Call the function

  const handleSendRequest = () => {
    setShowCards(true);
  };

  const [sortedBy, setSortedBy] = useState(null);
  const handleSortDurabilities = (order) => {
    const sortedFabrics = [...fabricsDurabilities].sort((a, b) => {
      if (order === 'asc') {
        return a.Durability - b.Durability;
      } else {
        return b.Durability - a.Durability;
      }
    });
    setFabricsDurabilities(sortedFabrics);
    setSortedBy(order);
  };





  //model

  const [open, setOpen] = React.useState(false);
  const handleOpen = (fabricpriced,thread1priced,thread2priced,thread3priced) => {
    setFabricData(
      fabricpriced
    );
    console.log(fabricpriced)
    setthread1data(
      thread1priced
    );
    setthread2data(
      thread2priced    );
    setthread3data(
      thread3priced
    );
    console.log(fabricdata)
    setOpen(true)

  };
  useEffect(() => {
    if (fabricdata) {
      console.log(fabricdata.Y2020);
    } if(thread1data){
      console.log(thread1data.Y2020);

    } if(thread2data){
      console.log(thread2data.Y2020);

    }
    if(thread3data){
      console.log(thread3data.Y2020);

    }
  }, [fabricdata,thread1data,thread2data,thread3data]);
  const handleClose = () => {
    setOpen(false)
  
    setFabricfutureData("");
    setFabricfuture25Data("");
    setFabricfuture26Data("");
    setFabricfuture27Data("");
  };

  //select
  const [thread, setThread] = React.useState('');

  const handleChange = (event) => {
    setThread(event.target.value);
  };

  //line chart for threads

  const uData = [26.36, 28.17, 29.73, 26.01, 26.88, 27.98, 27.94];

  const xLabels = [
    '2025',
    '2026',
    '2027',

  ];


  //line chart for Fabric

  const fData = [26.36, 28.17, 29.73, 26.01, 26.88, 27.98, 27.94];

  const fLabels = [
    '2025',
    '2026',
    '2027',
  ];



  const [endUseValues, setEndUseValues] = useState([]);
  const [selectedthread, setselectedthread] = useState("");


  useEffect(() => {
    // Fetch End Use values from the backend
    axios.get('http://127.0.0.1:5000/get_end_use')
      .then(response => {
        setEndUseValues(response.data.end_use_values);
      })
      .catch(error => {
        console.error('Error fetching End Use values:', error);
      });


  }, []);// Empty dependency array ensures useEffect runs only once on component mount


  const handleClickFabricprice = (Fabrics) => {
    // const fabricdata = [
    //   { Y2020: 200, Y2021: 220, Y2022: 250, Y2023: 280, Y2024: 320 },
    //   // Add more objects if needed
    // ];

    const postData = Fabrics.map((data) => {
      return `2020:${data.Y2020},2021:${data.Y2021},2022:${data.Y2022},2023:${data.Y2023},2024:${data.Y2024}`;
    }).join(";");

    const post2 = {
      "input": postData
    };

    console.log(post2);

    axios.post('http://127.0.0.1:5000/predict_futurePrice', post2)
      .then(response => {
        console.log(response.data);
        setFabricfutureData(response.data)
        console.log(fabricfuturedata);
        setFabricfuture25Data(response.data.Y2025)
        setFabricfuture26Data(response.data.Y2026)
        setFabricfuture27Data(response.data.Y2027)
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error here
      });
  };

  const handleClickThreadprice = (label) => {
    // const fabricdata = [
    //   { Y2020: 200, Y2021: 220, Y2022: 250, Y2023: 280, Y2024: 320 },
    //   // Add more objects if needed
    // ];
    console.log(label)
    const postData = `2020:${label.Y2020},2021:${label.Y2021},2022:${label.Y2022},2023:${label.Y2023},2024:${label.Y2024}`;

    const post2 = {
      "input": postData
    };

    console.log(post2);

    axios.post('http://127.0.0.1:5000/predict_futurePrice', post2)
      .then(response => {
        console.log(response.data);
        setFabricfutureData(response.data)
        console.log(fabricfuturedata);
        setThreadfuture25Data(response.data.Y2025)
        setThreadfuture26Data(response.data.Y2026)
        setThreadfuture27Data(response.data.Y2027)
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error here
      });
  };

  const generatePDF = async ({
    fabricPrices,
    threadPrices,
    totalPrice,
    selectedthread,
    fabricNames,
    needle,
    SewingMachine,
    TensionLevel
  }) => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();
  
    const margin = 16; // Updated margin
    const startX = margin;
    const startY = 30;
    const lineHeight = 7;
    const contentWidth = doc.internal.pageSize.getWidth() - 2 * margin;
    const borderColor = [227, 232, 238]; // RGB for #E3E8EE
    const borderRadius = 2; // Border radius
  
    // Fetches an image and converts it to a base64 encoded string
    const fetchImageAsBase64 = async (imageUrl) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", imageUrl, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
          if (xhr.status === 200) {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(xhr.response);
          } else {
            reject(new Error(`Failed to fetch image. Status: ${xhr.status}`));
          }
        };
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send();
      });
    };
  
    // Function to draw a rounded rectangle
    function drawRoundedRect(doc, x, y, width, height, radius) {
      doc.setLineJoin("round"); // Set the line join style to 'round'
  
      // Draw the rounded rectangle
      doc.roundedRect(x, y, width, height, radius, radius, 'S');
    }
  
    // Get the page height
    const pageHeight = doc.internal.pageSize.getHeight();
    const borderHeight = pageHeight - startY - margin; // Calculate the height to go to the bottom
  
    // Draw border
    doc.setDrawColor(...borderColor); // Set the border color
    doc.setLineWidth(0.1); // Set line width
    drawRoundedRect(doc, margin, startY - 10, contentWidth, borderHeight, borderRadius);
  
    // Image
    let imageUrl = "https://res.cloudinary.com/hiruniherath/image/upload/v1725898172/Screenshot_2024-09-09_213820_ifbsvg.png";
    const x = 30; // X-coordinate
    const y = 40; // Y-coordinate
    const radius = 9; // Radius of the circle
    const width = 3.3 * radius; // Width of the image
    const height = 3.3 * radius; // Height of the image
  
    // Function to get circular image in Base64
    const getCircularImageBase64 = async (imageUrl, radius) => {
      const imageBase64 = await fetchImageAsBase64(imageUrl);
      const img = new Image();
      img.src = imageBase64;
      return new Promise((resolve) => {
        img.onload = () => {
          const scaleFactor = 30;
          const scaledRadius = radius * scaleFactor;
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 2 * scaledRadius;
          canvas.height = 2 * scaledRadius;
          ctx.beginPath();
          ctx.arc(scaledRadius, scaledRadius, scaledRadius, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/png'));
        };
      });
    };
  
    // Fetch and add circular image to PDF
    const circularImageBase64 = await getCircularImageBase64(imageUrl, radius);
    doc.addImage(circularImageBase64, "PNG", x, y, width, height, undefined, 'FAST');
  


    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text(`End Use: ${endUse}`, 30, 85, null, null);

    doc.setDrawColor(227, 232, 238);
    doc.line(30, 95, 180, 95);
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(`Fabric Name `, 30, 105, null, null);
    doc.setTextColor(105, 115, 134);
    doc.text(`${fabricNames}`,  115, 105);
  
    doc.setTextColor(0, 0, 0);
    doc.text("Selected Thread", 30, 115, null, null);
    doc.setTextColor(105, 115, 134);
    doc.text(` ${selectedthread}` ,  115, 115);

    doc.setDrawColor(227, 232, 238);
    doc.line(30, 120, 180, 120);

    doc.setTextColor(0, 0, 0);
    doc.text("Fabric Price", 30, 130, null, null);
    doc.setTextColor(105, 115, 134);
    doc.text(` ${fabricPrices}` ,  115, 130);

    doc.setTextColor(0, 0, 0);
    doc.text("Thread Price", 30, 140, null, null);
    doc.setTextColor(105, 115, 134);
    doc.text(` ${threadPrices}` ,  115, 140);

    doc.setTextColor(0, 0, 0);
    doc.text("Total Price", 30, 150, null, null);
    doc.setTextColor(105, 115, 134);
    doc.text(`LKR ${totalPrice}` ,  115, 150);

    doc.setDrawColor(227, 232, 238);
    doc.line(30, 160, 180, 160);

    doc.setTextColor(0, 0, 0);
    doc.text("Needle", 30, 170, null, null);
    doc.setTextColor(105, 115, 134);
    doc.text(` ${needle}` ,  115, 170);


    doc.setTextColor(0, 0, 0);
    doc.text("Sewing Machine", 30, 180, null, null);
    doc.setTextColor(105, 115, 134);
    doc.text(` ${SewingMachine}` ,  115, 180);


    doc.setTextColor(0, 0, 0);
    doc.text("Tension Level", 30, 190, null, null);
    doc.setTextColor(105, 115, 134);
    doc.text(` ${TensionLevel}` ,  115, 190);

    // Save the PDF
    doc.save('Technical_Report.pdf');
  };
  

  return (
    <PageMain>
      {/* Your Home page content goes here */}
      <Typography Heading sx={{ letterSpacing: ".130rem", color: "#818ea3", fontSize: ".625rem" }}>
        DASHBOARD
      </Typography>
      <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.625rem", fontFamily: "poppins" }}>
        Decision Make Dashboard
      </Typography>
      <br />
      <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.425rem", fontFamily: "poppins", marginTop: "10px" }}>
        To find the most durable fabrics suitable for your needs, please provide the needed end Use.
      </Typography>



      <Box sx={{ paddingTop: "20px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={8}>
            <Autocomplete
              id="endUseAutocomplete"
              disablePortal
              options={endUseValues}
              value={endUse}
              onChange={(event, newValue) => setEndUse(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter End Use"
                  sx={{ width: "100%" }}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" endIcon={<SendIcon />} sx={{ marginTop: "10px" }} onClick={handleSendRequestfabric}>
              Send Request
            </Button>
          </Grid>
        </Grid>


        <Box sx={{ marginTop: "20px" }}>
          <Button variant="outlined" onClick={() => handleSortDurabilities('asc')}>Sort Durability (Asc)</Button>

          <Button variant="outlined" sx={{ marginLeft: "20px" }} onClick={() => handleSortDurabilities('desc')}>Sort Durability (Desc)</Button>
        </Box>


        <Box sx={{ marginTop: "20px" }}>
          <Grid container spacing={2}>
            {fabricsDurabilities.map((fabricDurability, index) => {
              return (
                <Grid item xs={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)', // Adjust the scale factor as per your preference
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)', // Add shadow on hover
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div" marginBottom="10px" marginTop="10px">
                        <b>SELECTION {index + 1}</b>{' '}
                      </Typography>

                      <Typography component="div" marginBottom="5px" marginTop="5px" marginLeft="320px" fontWeight={500} color="#475467" fontSize="16px">
                        <b>Current Price </b>{' '}
                      </Typography>

                      <Grid container>
                        <Grid Item xs={9}>
                        <Typography sx={{ color: '#008000' }}>
                        <b>Fabric :</b> &nbsp;{fabricDurability['Fiber Content']}


                      </Typography>

                        </Grid>
                        <Grid Item xs={3} color="#008000">
                        {fabricprice
                          .filter(label => label.Fabric === fabricDurability['Fiber Content'])
                          .map((label, index) => (
                            <div key={index}  >
                              LKR: {label.Y2024}
                            </div>
                          ))
                        }
                          
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid Item xs={9}>
                        
                        <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ display: 'flex', alignItems: 'center', color: '#0066CC' }}
                      >
                        <GestureIcon sx={{ marginRight: '5px' }} /> <b>Thread option 1:</b>&nbsp;
                        {fabricDurability['Thread 1']}

                       

                      </Typography>

                        </Grid>
                        <Grid Item xs={3}>
                          
                      {threadprice
                          .filter(label => label.Thread === fabricDurability['Thread 1'])
                          .map((label, index) => (
                            <div key={index}>
                              LKR: {label.Y2024}
                            </div>
                          ))
                        }

</Grid>
                      </Grid>


                      <Grid container>
                        <Grid Item xs={9}>
                        <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ display: 'flex', alignItems: 'center', color: '#004D99' }}
                      >
                        <GestureIcon sx={{ marginRight: '5px' }} />
                        <b> Thread option 2:</b>&nbsp;{fabricDurability['Thread 2']}
                        
                      </Typography>

                        </Grid>
                        <Grid Item xs={3} >
                          
                      {threadprice
                          .filter(label => label.Thread === fabricDurability['Thread 2'])
                          .map((label, index) => (
                            <div key={index}>
                              LKR: {label.Y2024}
                            </div>
                          ))
                        }

</Grid>
                      </Grid>
                      

                      <Grid container>
                        <Grid Item xs={9}>
                          
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ display: 'flex', alignItems: 'center', color: '#001A33' }}
                      >
                        <GestureIcon sx={{ marginRight: '5px' }} /> <b>Thread option 3: </b>&nbsp;
                        {fabricDurability['Thread 3']}
                        
                      </Typography>

                        </Grid>
                        <Grid Item xs={3}>
                           
                      {threadprice
                          .filter(label => label.Thread === fabricDurability['Thread 3'])
                          .map((label, index) => (
                            <div key={index}>
                              LKR: {label.Y2024}
                            </div>
                          ))
                        }

</Grid>
                      </Grid>
                      
                      

                      


                    
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ display: 'flex', alignItems: 'center', color: '#C41E3A' }}
                      >
                        <CallMissedOutgoingIcon sx={{ marginRight: '5px' }} />
                        <b> Durability:</b>&nbsp;{fabricDurability['Durability'].toFixed(3)} %
                      </Typography>

                      <Grid container marginTop="10px" >
                        <Grid item xs="auto" marginRight="70px">
                          <Button variant="outlined" onClick={() => {
                            
                            handleClickFabricprice(fabricprice.filter(label => label.Fabric === fabricDurability['Fiber Content']))

                            handleOpen(
                              fabricprice.filter(label => label.Fabric === fabricDurability['Fiber Content']),
                              threadprice.filter(label => label.Thread === fabricDurability['Thread 1']),
                              threadprice.filter(label => label.Thread === fabricDurability['Thread 2']),
                              threadprice.filter(label => label.Thread === fabricDurability['Thread 3'])
                            );
                          }} >View Price Fluctuation & Select </Button>
                        </Grid>
                      </Grid>

                    </CardContent>
                  </Card>
                </Grid>
              );
            })}

          </Grid>


          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography component="div" marginBottom="20px" marginTop="5px" fontWeight={500} color="#475467" fontSize="20px">

                <b>Price Fluctiation of Combination </b>{' '}
              </Typography>
              <Typography component="div" marginBottom="10px" marginTop="5px" fontWeight={500} color="#475467" fontSize="16px">

                <b>Fabric : {fabricdata.map((label, index) => (
                  <>{label.Fabric}</>
                ))}</b>{' '}

              </Typography>

              <br></br>
              {/* Graph for Fabric */}

              <LineChart

                sx={{ width: "100%" }}
                height={300}
                series={[
                  { data: [fabricfuture25data, fabricfuture26data, fabricfuture27data], label: 'Fabric Price ' },
                ]}
                xAxis={[{ scaleType: 'point', data: fLabels }]}
              />



              <Typography component="div" marginBottom="30px" marginTop="10px" fontWeight={500} color="#475467" fontSize="16px">

                <b>Select the thread to get future price  : </b>{' '}
              </Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth  >
                  <InputLabel id="demo-simple-select-label">Thread</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={thread}
                    label="Thread"
                    onChange={handleChange}
                  >
                    {thread1data.map((label, index) => (
                      <MenuItem onClick={() => {
                        handleClickThreadprice(label);
                        setselectedthread(label.Thread);
                      }} value={10}>{label.Thread}</MenuItem>
                    ))}
                    {thread2data.map((label, index) => (
                      <MenuItem onClick={() => {
                        handleClickThreadprice(label);
                        setselectedthread(label.Thread);
                      }} value={20}>{label.Thread}</MenuItem>
                    ))}
                    {thread3data.map((label, index) => (
                      <MenuItem onClick={() => {
                        handleClickThreadprice(label);
                        setselectedthread(label.Thread);
                      }} value={30}>{label.Thread}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {/* Graph for thread*/}
              <br></br>

              <LineChart

                sx={{ width: "100%" }}
                height={300}
                series={[
                  { data: [threadfuture25data, threadfuture26data, threadfuture27data], label: 'Thread Price ' },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
              />

              <b>Fabric current price : {fabricdata.map((label, index) => (
                <>LKR {label.Y2024}</>
              ))}
                {threadprice
                  .filter(label => label.Thread === selectedthread)
                  .map((label, index) => (
                    <div key={index}>
                      Selected thread current price : LKR {label.Y2024}
                    </div>
                  ))
                }
                <div>
                  Total:
                  LKR {fabricdata.reduce((acc, label) => acc + label.Y2024, 0) +
                    threadprice
                      .filter(label => label.Thread === selectedthread)
                      .reduce((acc, label) => acc + label.Y2024, 0)}
                </div>
              </b>{' '} <br />
              <Button variant="contained" onClick={() => {
  const fabricPrices = fabricdata.map((label) => `LKR ${label.Y2024}`);
  const threadPrices = threadprice
    .filter((label) => label.Thread === selectedthread)
    .map((label) => `LKR ${label.Y2024}`);
  const totalPrice =
    fabricdata.reduce((acc, label) => acc + label.Y2024, 0) +
    threadprice
      .filter((label) => label.Thread === selectedthread)
      .reduce((acc, label) => acc + label.Y2024, 0);
      const fabricNames = fabricdata.map((label) => label.Fabric);
     const needle=  fabricdata.map((label) => label.Needle);   
     const SewingMachine=  fabricdata.map((label) => label.SewingMachine);      
     const TensionLevel=  fabricdata.map((label) => label.TensionLevel
    );                         
  generatePDF({
    fabricPrices,
    threadPrices,
    totalPrice,selectedthread,fabricNames,needle,SewingMachine,TensionLevel
  });
}} sx={{ backgroundColor: "#349361", "&:hover": { backgroundColor: "#349361" } }}>Select & Generate Report</Button>


            </Box>



          </Modal>

        </Box>
      </Box>







    </PageMain>
  );
}

export default DicisionMake;
