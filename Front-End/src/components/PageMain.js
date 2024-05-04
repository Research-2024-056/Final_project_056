import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SideNav from "../components/SideNav";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

export default function PageMain({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
     setAnchorElUser(event.currentTarget);
   };
 
   const handleCloseUserMenu = () => {
     setAnchorElUser(null);
   };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'rgb(242,242,242,0.2)' }}>
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={1} lg={1}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon sx={{ color: "#000000" }} />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={10}
              lg={10}
              display={{
                lg: open ? "block" : "block",
                xs: open ? "none" : "block",
              }}
              
            >
              <Box sx={{marginLeft:{lg:open ?'-110px':'-60px'}}}>
                <InputBase
                  sx={{ ml: 1, flex: 1, fontSize: "14px" }}
                  placeholder="Search Here"
                  inputProps={{ "aria-label": "search Here" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px", opacity: 0.2, fontSize: "14px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={1} lg={1}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginLeft: {
                    lg: open ? "0px" : "0px",
                    xs: open ? "84px" : "0px",
                  },
                }}
              >
                <Avatar sx={{cursor:'pointer'}} alt="Travis Howard" src="/static/images/avatar/2.jpg" onClick={handleOpenUserMenu} />
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    sx={{
                      ...(Boolean(anchorElUser) && {
                        boxShadow: "0px 4px 6px -2px #10182808",
                      }),
                      mt: "45px",
                      "& .MuiMenu-list": {
                        minWidth: "auto",
                      },
                      ".MuiPopover-paper": {
                        boxShadow:
                          "0px 4px 6px -2px #10182808, 0px 12px 16px -4px #10182814",
                        width: "auto",
                        minWidth: "245px",
                        borderRadius: "6px",
                        marginTop: "8px",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        border: "1px solid #EAECF0",
                        backgroundColor: "#ffffff",
                        "& .MuiMenuItem-root:hover": {
                          backgroundColor:"#EAECF0",
                          borderRadius: "6px",
                        },
                      },
                    }}
                  >
                    <Grid container marginLeft={{lg:'8px',xs:'8px'}} marginTop="4px">
                      <Grid item xs="auto">
                        <IconButton sx={{ p: 0 }}>
                        <Avatar width="38px"
                            height="38px" alt="Travis Howard" src="/static/images/avatar/2.jpg"  />
                          
                        </IconButton>
                      </Grid>
                      <Grid item xs="auto" marginLeft="12px">
                       
                        <Typography
                          sx={{
                            color:"black",
                            marginTop:'8px'
                          }}
                        >
                          User Name
                        </Typography>
                      </Grid>
                    </Grid>
                    
                    <MenuItem
                          key={"vp"}
                         sx={{marginTop:'16px'}}
                        >
                          <Grid container>
                            
                            <Grid item xs="auto" marginLeft={theme.space_2}>
                              <Typography
                                
                              >
                                My Profile
                              </Typography>
                            </Grid>{" "}
                          </Grid>
                        </MenuItem>
                        <MenuItem
                          key={"vs"}
                         
                        >
                          <Grid container>
                            
                            <Grid item xs="auto" marginLeft={theme.space_2}>
                              <Typography
                                
                              >
                                Settings
                              </Typography>
                            </Grid>{" "}
                          </Grid>
                        </MenuItem>
                    </Menu>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <SideNav open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open} sx={{ marginTop: "60px" }}>
        {/* Render the child component (page) */}
        {children}
      </Main>
    </Box>
  );
}
