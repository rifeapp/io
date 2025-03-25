import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Box, Typography, Grid, Card, CardContent, Button, useTheme, useMediaQuery } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import PeopleIcon from "@mui/icons-material/People"
import PaymentsIcon from "@mui/icons-material/Payments"
import ChatIcon from "@mui/icons-material/Chat"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

function Dashboard() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [stats, setStats] = useState({
        totalSubscribers: 0,
        newSubscribers: 0,
        pendingTasks: 0,
        totalGrowth: 0,
        newGrowth: 0,
        tasksChange: 0,
        loading: true,
    })

    // Fetch real data from backend
    useEffect(() => {
        const fetchStats = async () => {
            try {
                console.log("Fetching stats from API...")
                const response = await fetch("http://localhost:8101/api/stats")
                console.log("API response status:", response.status)

                if (response.ok) {
                    const data = await response.json()
                    console.log("API data received:", data)

                    setStats({
                        totalSubscribers: data.totalSubscribers || 0,
                        newSubscribers: data.newSubscribers || 0,
                        pendingTasks: data.pendingTasks || 0,
                        totalGrowth: data.totalGrowth || 0,
                        newGrowth: data.newGrowth || 0,
                        tasksChange: data.tasksChange || 0,
                        loading: false,
                    })
                } else {
                    console.error("Error fetching stats:", response.statusText)
                    // Fallback to mock data if API fails
                    setStats({
                        totalSubscribers: 1254,
                        newSubscribers: 145,
                        pendingTasks: 24,
                        totalGrowth: 12,
                        newGrowth: 8,
                        tasksChange: -5,
                        loading: false,
                    })
                }
            } catch (error) {
                console.error("Error fetching stats:", error)
                // Fallback to mock data if API fails
                setStats({
                    totalSubscribers: 1254,
                    newSubscribers: 145,
                    pendingTasks: 24,
                    totalGrowth: 12,
                    newGrowth: 8,
                    tasksChange: -5,
                    loading: false,
                })
            }
        }

        fetchStats()
    }, [])

    const statCards = [
        {
            title: "Total Subscribers",
            value: stats.totalSubscribers.toLocaleString(),
            icon: <EmailIcon />,
            color: theme.palette.primary.main,
            trend: `${stats.totalGrowth >= 0 ? "+" : ""}${stats.totalGrowth}%`,
            trendDirection: stats.totalGrowth >= 0 ? "up" : "down",
        },
        {
            title: "New Subscribers",
            value: stats.newSubscribers.toLocaleString(),
            icon: <PeopleIcon />,
            color: theme.palette.success.main,
            trend: `${stats.newGrowth >= 0 ? "+" : ""}${stats.newGrowth}%`,
            trendDirection: stats.newGrowth >= 0 ? "up" : "down",
        },
        {
            title: "Pending Tasks",
            value: stats.pendingTasks.toLocaleString(),
            icon: <ChatIcon />,
            color: theme.palette.warning.main,
            trend: `${stats.tasksChange >= 0 ? "+" : ""}${stats.tasksChange}%`,
            trendDirection: stats.tasksChange >= 0 ? "up" : "down",
        },
    ]

    const modules = [
        {
            title: "Email Management",
            description: "Manage email subscriptions, send newsletters, and track subscriber activity.",
            icon: <EmailIcon />,
            color: theme.palette.primary.main,
            path: "/emails",
            active: true,
        },
        {
            title: "User Management",
            description: "Manage user accounts, roles, permissions, and authentication settings.",
            icon: <PeopleIcon />,
            color: theme.palette.info.main,
            path: "/users",
            active: false,
        },
        {
            title: "Payment Processing",
            description: "Manage transactions, payment methods, invoices, and financial reports.",
            icon: <PaymentsIcon />,
            color: theme.palette.success.main,
            path: "/payments",
            active: false,
        },
        {
            title: "Messaging",
            description: "Manage customer communications, chat support, and automated messaging.",
            icon: <ChatIcon />,
            color: theme.palette.warning.main,
            path: "/messaging",
            active: false,
        },
    ]

    return (
        <Box>
            <Box sx={{ mb: 6 }}>
                <Typography variant="h1" sx={{ mb: 1, fontSize: { xs: "2rem", md: "2.5rem" } }}>
                    Welcome to rife admin
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage your platform with our powerful admin tools
                </Typography>
            </Box>

            <Typography variant="h2" sx={{ mb: 3, fontSize: { xs: "1.5rem", md: "2rem" } }}>
                Overview
            </Typography>

            <Grid container spacing={3} sx={{ mb: 6 }}>
                {statCards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                height: "100%",
                                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
                                },
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                    <Box
                                        sx={{
                                            bgcolor: `${card.color}15`,
                                            borderRadius: "12px",
                                            width: 48,
                                            height: 48,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: card.color,
                                        }}
                                    >
                                        {card.icon}
                                    </Box>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                    {card.title}
                                </Typography>
                                <Typography variant="h3" sx={{ mb: 1 }}>
                                    {stats.loading ? "Loading..." : card.value}
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            color: card.trendDirection === "up" ? "success.main" : "error.main",
                                            mr: 1,
                                        }}
                                    >
                                        {card.trendDirection === "up" ? (
                                            <TrendingUpIcon fontSize="small" />
                                        ) : (
                                            <TrendingDownIcon fontSize="small" />
                                        )}
                                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                                            {stats.loading ? "..." : card.trend}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        vs last month
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h2" sx={{ mb: 3, fontSize: { xs: "1.5rem", md: "2rem" } }}>
                Admin Modules
            </Typography>

            <Grid container spacing={3}>
                {modules.map((module, index) => (
                    <Grid item xs={12} sm={6} lg={3} key={index}>
                        <Card
                            sx={{
                                height: "100%",
                                opacity: module.active ? 1 : 0.7,
                                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                                "&:hover": {
                                    transform: module.active ? "translateY(-4px)" : "none",
                                    boxShadow: module.active ? "0px 8px 24px rgba(0, 0, 0, 0.08)" : "none",
                                },
                            }}
                        >
                            <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                <Box
                                    sx={{
                                        bgcolor: `${module.color}15`,
                                        borderRadius: "12px",
                                        width: 56,
                                        height: 56,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: module.color,
                                        mb: 2,
                                    }}
                                >
                                    {module.icon}
                                </Box>
                                <Typography variant="h5" sx={{ mb: 1 }}>
                                    {module.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                                    {module.description}
                                </Typography>
                                {module.active ? (
                                    <Button
                                        component={Link}
                                        to={module.path}
                                        variant="contained"
                                        color="primary"
                                        endIcon={<ArrowForwardIcon />}
                                        fullWidth
                                    >
                                        Manage
                                    </Button>
                                ) : (
                                    <Button variant="outlined" disabled fullWidth>
                                        Coming Soon
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Dashboard

