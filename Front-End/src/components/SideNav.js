import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GridViewIcon from '@mui/icons-material/GridView';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';
import InsightsIcon from '@mui/icons-material/Insights';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const drawerWidth = 240;


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function SideNav({ open, handleDrawerClose }) {
    const theme = useTheme();

    return (
        <Drawer
            sx={{

                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                '& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper': {
                    backgroundColor: "#1c2434",
                }
            }}
            variant="persistent"
            anchor="left"
            open={open}

        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose} sx={{ color: "#ffffff" }}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            {/* Nav items */}
            <List>
                <ListItem disablePadding sx={{
                    '&:hover': {
                        backgroundColor: '#333a48',

                    }
                }}>
                    <ListItemButton to='/'>
                        <ListItemIcon>
                            <InsightsIcon sx={{ color: "#ffffff" }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Summary"
                            sx={{
                                color: "#ffffff",
                                fontWeight: 400,
                                textTransform: "uppercase",
                                '& .css-10hburv-MuiTypography-root': {
                                    fontSize: "14px"
                                }
                            }}
                        />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{
                    '&:hover': {
                        backgroundColor: '#333a48',

                    }
                  
                }}>
                    <ListItemButton to='/PreProductionMain'>
                        <ListItemIcon>
                            <GridViewIcon sx={{ color: "#ffffff" }} />
                        </ListItemIcon>
                        <ListItemText primary="Pre Production Pannel" sx={{
                            color: "#ffffff",
                            fontWeight: 400,
                            textTransform: "uppercase",
                            '& .css-10hburv-MuiTypography-root': {
                                fontSize: "14px"
                            }
                        }} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{
                    '&:hover': {
                        backgroundColor: '#333a48',

                    }
                }}>
                    <ListItemButton to='/WorkforceMapDash'>
                        <ListItemIcon>
                            < WorkspacePremiumIcon sx={{ color: "#ffffff" }} />
                        </ListItemIcon>
                        <ListItemText primary="Workforce Map" sx={{
                            color: "#ffffff",
                            fontWeight: 400,
                            textTransform: "uppercase",
                            '& .css-10hburv-MuiTypography-root': {
                                fontSize: "14px"
                            }
                        }} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{
                    '&:hover': {
                        backgroundColor: '#333a48',

                    }
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <StackedLineChartIcon sx={{ color: "#ffffff" }} />
                        </ListItemIcon>
                        <ListItemText primary="Needle Performance" sx={{
                            color: "#ffffff",
                            fontWeight: 400,
                            textTransform: "uppercase",
                            '& .css-10hburv-MuiTypography-root': {
                                fontSize: "14px"
                            }
                        }} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{
                    '&:hover': {
                        backgroundColor: '#333a48',

                    }
                }}>
                    <ListItemButton to='/SewingDashboard'>
                        <ListItemIcon>
                            <LeaderboardIcon sx={{ color: "#ffffff" }} />
                        </ListItemIcon>
                        <ListItemText primary="Machine Performance" sx={{
                            color: "#ffffff",
                            fontWeight: 400,
                            textTransform: "uppercase",
                            '& .css-10hburv-MuiTypography-root': {
                                fontSize: "14px"
                            }
                        }} />
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider />

            <List>
                <ListItem disablePadding sx={{
                    '&:hover': {
                        backgroundColor: '#333a48',

                    }
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <NotificationsActiveIcon sx={{ color: "#ffffff" }} />
                        </ListItemIcon>
                        <ListItemText primary="Feedback" sx={{
                            color: "#ffffff",
                            fontWeight: 400,
                            textTransform: "uppercase",
                            '& .css-10hburv-MuiTypography-root': {
                                fontSize: "14px"
                            }
                        }} />
                    </ListItemButton>
                </ListItem>
                
                <ListItem disablePadding sx={{
                    '&:hover': {
                        backgroundColor: '#333a48',

                    }
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsIcon sx={{ color: "#ffffff" }} />
                        </ListItemIcon>
                        <ListItemText primary="Setting" sx={{
                            color: "#ffffff",
                            fontWeight: 400,
                            textTransform: "uppercase",
                            '& .css-10hburv-MuiTypography-root': {
                                fontSize: "14px"
                            }
                        }} />
                    </ListItemButton>
                </ListItem>

            </List>

        </Drawer>
    );
}

export default SideNav;
