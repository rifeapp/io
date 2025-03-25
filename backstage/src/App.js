"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Box, CssBaseline, Container } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./theme"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Dashboard from "./pages/Dashboard"
import EmailList from "./pages/EmailListPage"
import SendEmail from "./pages/SendEmailPage"
import AddSubscriber from "./pages/AddSubscriber"

const drawerWidth = 240

function App() {
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Box sx={{ display: "flex", minHeight: "100vh" }}>
                    <CssBaseline />
                    <Header drawerWidth={drawerWidth} toggleDrawer={handleDrawerToggle} />
                    <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            bgcolor: "#f9fafb",
                            minHeight: "100vh",
                            width: "100%",
                            pt: 8, // Add padding top to account for the header
                        }}
                    >
                        <Container
                            maxWidth="lg"
                            sx={{
                                py: 3,
                                px: { xs: 2, sm: 3 },
                                flexGrow: 1,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/emails" element={<EmailList />} />
                                <Route path="/email-list" element={<EmailList />} />
                                <Route path="/send-email" element={<SendEmail />} />
                                <Route path="/add-subscriber" element={<AddSubscriber />} />
                            </Routes>
                        </Container>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    )
}

export default App

