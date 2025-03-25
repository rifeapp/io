"use client"

import { useState } from "react"
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import DashboardIcon from "@mui/icons-material/Dashboard"
import EmailIcon from "@mui/icons-material/Email"
import PeopleIcon from "@mui/icons-material/People"
import PaymentsIcon from "@mui/icons-material/Payments"
import ChatIcon from "@mui/icons-material/Chat"
import { Link, useLocation } from "react-router-dom"

const drawerWidth = 240

function Layout({ children }) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
        { text: "Email Management", icon: <EmailIcon />, path: "/emails" },
        { text: "Email List", icon: <EmailIcon />, path: "/email-list", indent: true },
        { text: "Send Email", icon: <EmailIcon />, path: "/send-email", indent: true },
        { text: "Add Subscriber", icon: <EmailIcon />, path: "/add-subscriber", indent: true },
        { text: "User Management", icon: <PeopleIcon />, path: "/users", disabled: true },
        { text: "Payment Processing", icon: <PaymentsIcon />, path: "/payments", disabled: true },
        { text: "Messaging", icon: <ChatIcon />, path: "/messaging", disabled: true },
    ]

    const drawer = (
        <>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    rife admin
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            disabled={item.disabled}
                            selected={location.pathname === item.path}
                            sx={{
                                pl: item.indent ? 4 : 2,
                                "&.Mui-selected": {
                                    bgcolor: `${theme.palette.primary.main}15`,
                                    color: theme.palette.primary.main,
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: location.pathname === item.path ? theme.palette.primary.main : "inherit",
                                    opacity: item.disabled ? 0.5 : 1,
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    opacity: item.disabled ? 0.5 : 1,
                                    "& .MuiTypography-root": {
                                        fontSize: item.indent ? "0.875rem" : "1rem",
                                    },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    )

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: "background.paper",
                    color: "text.primary",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {isMobile && "rife admin"}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                {/* Mobile drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Desktop drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: "64px", // Height of AppBar
                }}
            >
                {children}
            </Box>
        </Box>
    )
}

export default Layout

