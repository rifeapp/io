import { Link, useLocation } from "react-router-dom"
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import EmailIcon from "@mui/icons-material/Email"
import PeopleIcon from "@mui/icons-material/People"
import PaymentsIcon from "@mui/icons-material/Payments"
import ChatIcon from "@mui/icons-material/Chat"
import CloseIcon from "@mui/icons-material/Close"

const drawerWidth = 240

function Sidebar({ mobileOpen, handleDrawerToggle }) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const location = useLocation()

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
        { text: "Email Management", icon: <EmailIcon />, path: "/emails" },
        {
            text: "Email List",
            icon: <EmailIcon />,
            path: "/email-list",
            indent: true,
        },
        {
            text: "Send Email",
            icon: <EmailIcon />,
            path: "/send-email",
            indent: true,
        },
        {
            text: "Add Subscriber",
            icon: <EmailIcon />,
            path: "/add-subscriber",
            indent: true,
        },
        { text: "User Management", icon: <PeopleIcon />, path: "/users", disabled: true },
        { text: "Payment Processing", icon: <PaymentsIcon />, path: "/payments", disabled: true },
        { text: "Messaging", icon: <ChatIcon />, path: "/messaging", disabled: true },
    ]

    const drawer = (
        <div>
            <Toolbar>
                {isMobile && (
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            ml: "auto",
                            color: "text.primary",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
            </Toolbar>
            <List sx={{ px: 2 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ display: "block", mb: 0.5 }}>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            disabled={item.disabled}
                            selected={location.pathname === item.path}
                            sx={{
                                minHeight: 48,
                                px: item.indent ? 4 : 2,
                                borderRadius: "8px",
                                "&.Mui-selected": {
                                    bgcolor: `${theme.palette.primary.main}15`,
                                    color: theme.palette.primary.main,
                                    "&:hover": {
                                        bgcolor: `${theme.palette.primary.main}25`,
                                    },
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: 2,
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
        </div>
    )

    return (
        <Box
            component="nav"
            sx={{
                width: { md: drawerWidth },
                flexShrink: { md: 0 },
            }}
        >
            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                {drawer}
            </Drawer>
            {/* Desktop drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        borderRight: "none",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    )
}

export default Sidebar

