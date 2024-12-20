import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GridViewIcon from "@mui/icons-material/GridView";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import SettingsIcon from "@mui/icons-material/Settings";
import InsightsIcon from "@mui/icons-material/Insights";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";


const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function SideNav({ open, handleDrawerClose }) {
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1c2434",
        },
        "& .css-153gm7s-MuiPaper-root-MuiDrawer-paper": {
          backgroundColor: "#1c2434",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
      <img src="https://res.cloudinary.com/hiruniherath/image/upload/v1726677908/WhatsApp_Image_2024-09-18_at_21.13.29_78908614-removebg-preview_kto2k2.png" alt="logo" style={{width:"150px" ,marginRight:"50px"}}/>
        <IconButton onClick={handleDrawerClose} sx={{ color: "#ffffff" }}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
     
      {/* Nav items */}
      <List>
        <ListItem
          disablePadding
          sx={{
            "&:hover": {
              backgroundColor: "#333a48",
            },
          }}
        >


          <ListItemButton to="/dashboard">
            <ListItemIcon>
              <InsightsIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText
              primary="Summary"
              sx={{
                color: "#ffffff",
                fontWeight: 400,
                textTransform: "uppercase",
                "& .css-10hburv-MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            "&:hover": {
              backgroundColor: "#333a48",
            },
          }}
        >
          <ListItemButton to="/PreProductionMain">
            <ListItemIcon>
              <GridViewIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText
              primary="Pre Production Pannel"
              sx={{
                color: "#ffffff",
                fontWeight: 400,
                textTransform: "uppercase",
                "& .css-10hburv-MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            "&:hover": {
              backgroundColor: "#333a48",
            },
          }}
        >
          <ListItemButton to="/WorkforceMapDash">
            <ListItemIcon>
              <WorkspacePremiumIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText
              primary="Workforce Map"
              sx={{
                color: "#ffffff",
                fontWeight: 400,
                textTransform: "uppercase",
                "& .css-10hburv-MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            "&:hover": {
              backgroundColor: "#333a48",
            },
          }}
        >
          <ListItemButton to="/machineselect">
            <ListItemIcon>
              <StackedLineChartIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText
              primary="Needle Performance"
              sx={{
                color: "#ffffff",
                fontWeight: 400,
                textTransform: "uppercase",
                "& .css-10hburv-MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            "&:hover": {
              backgroundColor: "#333a48",
            },
          }}
        >
          <ListItemButton to="/SewingDashboard">
            <ListItemIcon>
              <LeaderboardIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText
              primary="Machine Maintenance"
              sx={{
                color: "#ffffff",
                fontWeight: 400,
                textTransform: "uppercase",
                "& .css-10hburv-MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            "&:hover": {
              backgroundColor: "#333a48",
            },
          }}
        >
          <ListItemButton to="/order">
            <ListItemIcon>
              <ContentPasteGoIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText
              primary="Order "
              sx={{
                color: "#ffffff",
                fontWeight: 400,
                textTransform: "uppercase",
                "& .css-10hburv-MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem
          disablePadding
          sx={{
            marginTop: "85%",
            "&:hover": {
              backgroundColor: "#333a48",
            },
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <NotificationsActiveIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText
              primary="Feedback"
              sx={{
                color: "#ffffff",
                fontWeight: 400,
                textTransform: "uppercase",
                "& .css-10hburv-MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            "&:hover": {
              backgroundColor: "#333a48",
            },
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText
              primary="Setting"
              sx={{
                color: "#ffffff",
                fontWeight: 400,
                textTransform: "uppercase",
                "& .css-10hburv-MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SideNav;
