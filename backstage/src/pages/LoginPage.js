import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    CircularProgress,
    Alert,
} from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

function LoginPage() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            setError("Please enter both email and password")
            return
        }

        setLoading(true)
        setError("")

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // For demo purposes, hardcode a successful login
            if (formData.email === "admin@rife.com" && formData.password === "password") {
                // Navigate to dashboard on successful login
                navigate("/")
            } else {
                setError("Invalid email or password")
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f9fafb",
                p: 3,
            }}
        >
            <Card
                sx={{
                    maxWidth: 450,
                    width: "100%",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
                    borderRadius: 3,
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}>
                            admin
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Sign in to your account
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 4 }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                fontSize: "1rem",
                                fontWeight: 600,
                            }}
                        >
                            {loading ? <CircularProgress size={24} /> : "Sign In"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default LoginPage

