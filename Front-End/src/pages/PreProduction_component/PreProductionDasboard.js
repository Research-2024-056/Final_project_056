import React from 'react';
import PageMain from '../../components/PageMain'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid, Box } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { LineChart } from '@mui/x-charts/LineChart';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function PreProduction_component() {
  // line chart

  const uData = [26.36, 28.17, 29.73, 26.01, 26.88, 27.98,27.94];

  const xLabels = [
    'Cotton',
    'Silk',
    'Polyester',
    'Nylon',
    'Rayon',
    'Wool',
    'Linen'

  ];

  return (
    <PageMain>
      {/* Your Home page content goes here */}
      <Typography Heading sx={{ letterSpacing: ".130rem", color: "#818ea3", fontSize: ".625rem" }}>
        DASHBOARD
      </Typography>
      <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.625rem", fontFamily: "poppins" }}>
        Pre Prodction Dashboard
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "30px" }}>
          <Grid item xs={12} sm={6}>
            <Button sx={{ width: "80%", height: "100%" }} variant="outlined" href='/Durabilitycheck' endIcon={<ArrowOutwardIcon />}>
              Check Fabric Durability
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button sx={{ width: "80%", height: "100%" }} variant="outlined"  href='/PreProductDecision' endIcon={<ArrowOutwardIcon />}>
              Get Pre Production Decisions
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.325rem", fontFamily: "poppins", marginTop: "30px", marginBottom: "20px" }}>
        Commonly Using Fabric Durability
      </Typography>
      <LineChart
        sx={{ width: "100%" }}
        height={300}
        series={[
          { data: uData, label: 'Durability For T Shirts (Most Common)' },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />

      <Typography Heading sx={{ lineHeight: 1, fontWeight: "500", fontSize: "1.325rem", fontFamily: "poppins", marginTop: "30px", marginBottom: "20px" }}>
        Latest Fabric Thread Combinations
      </Typography>
      <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            sx={{ marginTop: "30px" }}
          >
            <Grid item xs={12} sm={3}>
              <Card
                sx={{
                  maxWidth: 340,
                  cursor: "pointer",
                  height:200,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardMedia sx={{ height: 52 }} title="green iguana" />
                <CardContent>
                  <Typography fontWeight={600} sx={{marginTop:"-12px"}}>End Use :</Typography>
                  <Typography gutterBottom variant="h5" component="div"  sx={{color:' #006666'}}>
                     Boat Neck T-shirt{" "}
                    <svg
                      width="21"
                      height="19"
                      viewBox="0 0 21 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.27653 18.0217C5.04548 18.0217 4.86394 17.8402 4.86394 17.6091V7.27794L3.7087 8.25164C3.69219 8.26815 3.67569 8.26815 3.67569 8.28465C3.51066 8.38367 3.32912 8.44968 3.14758 8.44968C2.81751 8.44968 2.52045 8.28465 2.33891 8.0206L0.573041 5.36354C0.275978 4.91794 0.408006 4.32382 0.8536 4.02676L5.75513 0.610541C5.78813 0.594038 5.82114 0.561031 5.87065 0.561031C5.88716 0.561031 6.33275 0.4125 6.95988 0.395996H7.47149C7.58701 0.395996 7.70254 0.445506 7.76855 0.528024C7.85107 0.610541 7.88407 0.726065 7.86757 0.84159C7.86757 0.858093 7.86757 0.8911 7.85107 0.907603C7.88407 2.14536 9.18785 3.3006 10.5741 3.3006C11.9604 3.3006 13.2642 2.14536 13.2972 0.907603C13.2972 0.8911 13.2972 0.858093 13.2807 0.84159C13.2642 0.726065 13.3137 0.610541 13.3797 0.528024C13.4457 0.445506 13.5613 0.395996 13.6768 0.395996H14.6835C15.0796 0.395996 15.3931 0.577534 15.4262 0.594038C15.4427 0.594038 15.4427 0.610541 15.4592 0.610541L20.1957 4.02676C20.6247 4.30732 20.7568 4.91794 20.4597 5.36354L18.6938 7.87206C18.5288 8.13612 18.2152 8.30115 17.8852 8.30115C17.6871 8.30115 17.5056 8.25164 17.3571 8.13612C17.3406 8.13612 17.3406 8.11962 17.3241 8.10311L16.2678 7.22843L16.2348 17.6091C16.2348 17.8402 16.0533 18.0217 15.8222 18.0217H5.27653Z"
                        fill="white"
                      />
                      <path
                        d="M14.7001 0.85818C14.9972 0.85818 15.2117 1.00671 15.2117 1.00671L19.9482 4.40642C20.2123 4.57146 20.2783 4.91803 20.0968 5.18209L18.3309 7.67411C18.2319 7.83914 18.0503 7.92166 17.8688 7.92166C17.7698 7.92166 17.6543 7.88865 17.5552 7.82264L15.8224 6.40334L15.7894 17.6587H5.27665V6.43635L3.42827 7.98768C3.32925 8.05369 3.23023 8.0867 3.1147 8.0867C2.93316 8.0867 2.75162 8.00418 2.6526 7.83914L0.903237 5.18209C0.738202 4.91803 0.804216 4.58796 1.05177 4.40642L5.9533 0.990208C5.9533 0.990208 6.34938 0.85818 6.9105 0.841676H7.4221V0.874683V0.90769C7.4221 2.393 8.92392 3.76279 10.5578 3.76279C12.1916 3.76279 13.6934 2.393 13.6934 0.90769V0.874683V0.841676H14.6671H14.7001C14.6836 0.85818 14.7001 0.85818 14.7001 0.85818ZM14.7001 0.0330069H14.6671H13.6934C13.4624 0.0330069 13.2478 0.132028 13.0828 0.297062C12.9343 0.462097 12.8517 0.693145 12.8682 0.924194V0.990208C12.8187 1.99692 11.6965 2.95412 10.5578 2.95412C9.41902 2.95412 8.29679 1.99692 8.24728 0.990208V0.924194C8.26378 0.693145 8.19777 0.462097 8.03273 0.297062C7.8842 0.132028 7.65315 0.0330069 7.4221 0.0330069H6.9105H6.89399C6.23386 0.0495104 5.75525 0.198042 5.68924 0.214545C5.60672 0.247552 5.54071 0.280559 5.4747 0.330069L0.606175 3.72978C-0.0209569 4.15887 -0.185992 5.00055 0.226595 5.64418L1.99247 8.30124C2.25652 8.68082 2.68561 8.91187 3.14771 8.91187C3.41176 8.91187 3.67582 8.82935 3.90687 8.68082C3.93987 8.66432 3.95638 8.64781 3.98938 8.63131L4.46798 8.21872V17.6587C4.46798 18.1208 4.83106 18.4839 5.29316 18.4839H15.8224C16.2845 18.4839 16.6475 18.1208 16.6475 17.6587L16.664 8.13621L17.0436 8.44977C17.0601 8.46628 17.0931 8.48278 17.1096 8.49928C17.3407 8.64781 17.6047 8.73033 17.8688 8.73033C18.3309 8.73033 18.76 8.49928 19.0075 8.1197L20.7569 5.64418L20.7734 5.62768C21.186 5.00055 21.021 4.14237 20.3938 3.72978L15.7729 0.280559C15.7564 0.264055 15.7398 0.264055 15.7233 0.247552C15.6738 0.214545 15.2943 0 14.7992 0L14.7001 0.0330069Z"
                        fill="black"
                      />
                    </svg>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Selected Fabric : Modal
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Selected Thread : Cotton
                  </Typography>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Card
                sx={{
                  maxWidth: 345,
                  height:200,
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 32 }}
                  image={``}
                  title="green iguana"
                />
                <CardContent>
                <Typography fontWeight={600} sx={{marginTop:"10px"}}>End Use :</Typography>
                  <Typography gutterBottom variant="h5" component="div"  sx={{color:' #006666'}}>
                     Long Sleeve T-shirt{" "}
                    <svg
                      width="23"
                      height="20"
                      viewBox="0 0 23 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.88531 3.93691L5.80842 4.22986V19.2221H17.1915V4.22986L16.1827 3.90698"
                        stroke="black"
                        stroke-width="0.75"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2.12506 9.9704L5.80853 8.8454V4.22986L1.00006 6.47986L2.12506 9.9704Z"
                        stroke="black"
                        stroke-width="0.75"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.875 9.9704L17.1915 8.8454V4.22986L22 6.47986L20.875 9.9704Z"
                        stroke="black"
                        stroke-width="0.75"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.1294 2.87058L10.8189 4.68772L9.61567 6.6246C6.93131 3.30457 7.85047 2.39358 7.85047 2.39358C11.7666 -0.741979 15.2346 2.39358 15.2346 2.39358C15.2346 2.39358 16.1537 3.30457 13.4694 6.6246L12.2661 4.68772L13.9582 2.86777"
                        stroke="black"
                        stroke-width="0.75"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.5426 6.66983C11.3659 6.66983 11.2228 6.52663 11.2228 6.34999C11.2228 6.17335 11.3659 6.03015 11.5426 6.03015C11.7192 6.03015 11.8624 6.17335 11.8624 6.34999C11.8624 6.52663 11.7192 6.66983 11.5426 6.66983Z"
                        fill="black"
                      />
                      <path
                        d="M11.5426 7.89492C11.3659 7.89492 11.2228 7.75173 11.2228 7.57509C11.2228 7.39845 11.3659 7.25525 11.5426 7.25525C11.7192 7.25525 11.8624 7.39845 11.8624 7.57509C11.8624 7.75173 11.7192 7.89492 11.5426 7.89492Z"
                        fill="black"
                      />
                      <path
                        d="M11.5426 9.12002C11.3659 9.12002 11.2228 8.97683 11.2228 8.80018C11.2228 8.62354 11.3659 8.48035 11.5426 8.48035C11.7192 8.48035 11.8624 8.62354 11.8624 8.80018C11.8624 8.97683 11.7192 9.12002 11.5426 9.12002Z"
                        fill="black"
                      />
                    </svg>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Selected Fabric : Merino Wool 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Selected Thread :
                    Cotton
</Typography>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Card
                sx={{
                  maxWidth: 345,
                  height:200,
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                {" "}
                <CardMedia
                  sx={{ height: 40 }}
                  image={``}
                  title="green iguana"
                />
                <CardContent>
                <Typography fontWeight={600}>End Use :</Typography>
                  <Typography gutterBottom variant="h5" component="div"  sx={{color:' #006666'}}>
                    Dresses Cotton{" "}
                    <svg
                      width="21"
                      height="23"
                      viewBox="0 0 21 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.55985 5.46011C7.55985 5.32319 7.49307 5.19508 7.38093 5.11654C7.2692 5.03799 7.12556 5.01867 6.99703 5.06529L4.83521 5.84569C3.96368 6.1943 3.22739 6.79156 2.70699 7.57279L0.0705441 11.5277C0.00754163 11.6222 -0.0142994 11.7381 0.00922154 11.849C0.0327424 11.9599 0.101205 12.0565 0.196969 12.1169L3.5571 14.217C3.74989 14.3367 4.00316 14.2826 4.12916 14.094L5.03976 12.7281V22.2608C5.03976 22.4926 5.2275 22.6808 5.45977 22.6808H15.5402C15.7724 22.6808 15.9602 22.4926 15.9602 22.2608V12.7277L16.8708 14.0935C16.9968 14.2821 17.2488 14.3367 17.4428 14.2166L20.803 12.1165C20.8991 12.056 20.9672 11.9594 20.9907 11.8486C21.0142 11.7377 20.9928 11.6217 20.9294 11.5272L18.2929 7.57237C17.7725 6.79114 17.0363 6.19388 16.1513 5.84023L14.0025 5.06446C13.8735 5.01783 13.7303 5.03715 13.6186 5.1157C13.5069 5.19508 13.4401 5.32319 13.4401 5.46011C13.4401 6.6181 12.1208 7.56019 10.5 7.56019C8.87912 7.56019 7.55985 6.6181 7.55985 5.46011ZM14.2083 6.03217L15.8531 6.62566C16.5658 6.91085 17.1681 7.39933 17.5945 8.03859L19.9911 11.6335L17.3433 13.288L15.8896 11.1072C15.7871 10.9531 15.5952 10.8838 15.4184 10.9384C15.2411 10.9917 15.1201 11.1555 15.1201 11.3403V21.8407H5.87979V11.3403C5.87979 11.1555 5.75882 10.9917 5.58158 10.9384C5.40517 10.8842 5.2128 10.9535 5.11032 11.1072L3.65664 13.288L1.00886 11.6335L3.40547 8.03859C3.83179 7.39933 4.43367 6.91085 5.13342 6.6307L6.79122 6.03217C7.13438 7.38042 8.66702 8.40022 10.4995 8.40022C12.3321 8.40022 13.8651 7.38042 14.2083 6.03217Z"
                        fill="black"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.5 3.36013C10.2678 3.36013 10.08 3.5483 10.08 3.78015V5.0402H8.81998C8.58771 5.0402 8.39996 5.22836 8.39996 5.46021C8.39996 5.69206 8.58771 5.88023 8.81998 5.88023H12.1801C12.4124 5.88023 12.6001 5.69206 12.6001 5.46021C12.6001 5.22836 12.4124 5.0402 12.1801 5.0402H10.9201V4.15774C11.8773 3.96243 12.6001 3.11442 12.6001 2.10008C12.6001 0.942097 11.658 0 10.5 0C9.34206 0 8.39996 0.942097 8.39996 2.10008C8.39996 2.33193 8.58771 2.5201 8.81998 2.5201C9.05225 2.5201 9.24 2.33193 9.24 2.10008C9.24 1.40537 9.80534 0.840033 10.5 0.840033C11.1948 0.840033 11.7601 1.40537 11.7601 2.10008C11.7601 2.79479 11.1948 3.36013 10.5 3.36013Z"
                        fill="black"
                      />
                    </svg>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Selected  Fabric : Cotton 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Selected Thread :
                    Polyester
</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Card
                sx={{
                  maxWidth: 345,
                  cursor: "pointer",
                  height:200,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                {" "}
                <CardMedia
                  sx={{ height: 40 }}
                  image={``}
                  title="green iguana"
                />
                <CardContent>
                <Typography fontWeight={600}>End Use :</Typography>
                  <Typography gutterBottom variant="h5" component="div" sx={{color:' #006666'}}>
                     Tank Top{" "}
                     <svg width="14" height="21" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.18909 13.7168V6.83487C2.81878 6.78016 2.71034 2.84512 2.71034 2.84512L2.71992 1.0177H3.89447C3.89447 1.82971 4.21704 2.60845 4.79121 3.18263C5.36539 3.7568 6.14413 4.07937 6.95614 4.07937C7.76814 4.07937 8.54689 3.7568 9.12107 3.18263C9.69524 2.60845 10.0178 1.82971 10.0178 1.0177H11.2926V2.8547C11.2926 2.8547 11.1671 6.83487 12.8234 6.83487V20H1.18909V15.4841" stroke="black" stroke-width="0.612334" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.77471 2.02877C8.23669 2.43182 7.58103 2.64671 6.90882 2.6403C6.2366 2.63388 5.58516 2.40653 5.05493 1.99329" stroke="black" stroke-width="0.612334" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M0.597229 15.4049V13.8818C5.43237 13.8818 10.039 8.10594 10.039 1.0127H11.3258C11.3258 8.946 6.27212 15.4049 0.597229 15.4049Z" stroke="black" stroke-width="0.612334" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Selected  Fabric : Cotton 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">

                  Selected Thread :
                    Wool
</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>


    </PageMain>
  );
}

export default PreProduction_component;
