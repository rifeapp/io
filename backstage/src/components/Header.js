"use client"

import { AppBar, Toolbar, Typography, IconButton, Box, useTheme, useMediaQuery } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import NotificationsIcon from "@mui/icons-material/Notifications"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

function Header({ toggleDrawer }) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    return (
        <AppBar
            position="fixed"
            sx={{
                width: "100%",
                bgcolor: "background.paper",
                color: "text.primary",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={toggleDrawer}
                    sx={{ mr: 2, display: { md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    rife admin
                </Typography>
                <Box sx={{ display: "flex" }}>
                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header

