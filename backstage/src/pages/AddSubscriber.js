"use client"

import { useState } from "react"
import { Box, Typography, Paper, TextField, Button, CircularProgress, Alert, Snackbar } from "@mui/material"
import PersonAddIcon from "@mui/icons-material/PersonAdd"

function AddSubscriber() {
    const [formData, setFormData] = useState({
        customerName: "",
        emailAddress: "",
        subject: "",
        content: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.customerName || !formData.emailAddress) {
            setError("Name and email address are required")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch("http://localhost:8101/api/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => null)
                throw new Error(errorData?.message || `Error: ${response.status}`)
            }

            // Show success message
            setSuccess(true)

            // Reset form
            setFormData({
                customerName: "",
                emailAddress: "",
                subject: "",
                content: "",
            })
        } catch (err) {
            console.error("Failed to add subscriber:", err)
            setError(err.message || "Failed to add subscriber. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleCloseSnackbar = () => {
        setSuccess(false)
    }

    return (
        <Box>
            <Typography variant="h1" sx={{ mb: 4, fontSize: { xs: "1.5rem", md: "2rem" } }}>
                Add New Subscriber
            </Typography>

            <Paper sx={{ p: 3 }}>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        fullWidth
                        label="Name"
                        name="customerName"
                        variant="outlined"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Email Address"
                        name="emailAddress"
                        type="email"
                        variant="outlined"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        required
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Subject (Optional)"
                        name="subject"
                        variant="outlined"
                        value={formData.subject}
                        onChange={handleChange}
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Message (Optional)"
                        name="content"
                        variant="outlined"
                        value={formData.content}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        sx={{ mb: 3 }}
                    />

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<PersonAddIcon />}
                        disabled={loading}
                        sx={{ minWidth: 180 }}
                    >
                        {loading ? <CircularProgress size={24} /> : "Add Subscriber"}
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
                    Subscriber added successfully!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default AddSubscriber

