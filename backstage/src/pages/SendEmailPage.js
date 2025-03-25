import { useState } from "react"
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    CircularProgress,
    Alert,
    Snackbar,
    Autocomplete,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"

function SendEmailPage() {
    const [emailType, setEmailType] = useState("all")
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const [selectedEmails, setSelectedEmails] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [availableEmails, setAvailableEmails] = useState([])
    const [loadingEmails, setLoadingEmails] = useState(false)

    // Fetch available emails for selection
    const fetchAvailableEmails = async () => {
        if (availableEmails.length > 0) return // Only fetch once

        setLoadingEmails(true)
        try {
            const response = await fetch("http://localhost:8101/api/emails")
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }
            const data = await response.json()
            setAvailableEmails(
                data.map((email) => ({
                    id: email.id,
                    label: `${email.customerName} (${email.emailAddress})`,
                    email: email.emailAddress,
                })),
            )
        } catch (err) {
            console.error("Failed to fetch emails:", err)
            setError("Failed to load email list. Please try again later.")
        } finally {
            setLoadingEmails(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!subject || !content) {
            setError("Please fill in all required fields")
            return
        }

        setLoading(true)
        setError(null)

        try {
            // This is a placeholder for the actual API call
            // In a real implementation, you would send this data to your backend

            const payload = {
                subject,
                content,
                emailType,
                recipients: emailType === "selected" ? selectedEmails.map((email) => email.email) : [],
            }

            console.log("Sending email with payload:", payload)

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Show success message
            setSuccess(true)

            // Reset form
            setSubject("")
            setContent("")
            setSelectedEmails([])
        } catch (err) {
            console.error("Failed to send email:", err)
            setError("Failed to send email. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleEmailTypeChange = (e) => {
        setEmailType(e.target.value)
        if (e.target.value === "selected") {
            fetchAvailableEmails()
        }
    }

    const handleCloseSnackbar = () => {
        setSuccess(false)
    }

    return (
        <Box>
            <Typography variant="h1" sx={{ mb: 4, fontSize: { xs: "1.5rem", md: "2rem" } }}>
                Send Email
            </Typography>

            <Paper sx={{ p: 3 }}>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <FormControl component="fieldset" sx={{ mb: 3 }}>
                        <FormLabel component="legend">Recipients</FormLabel>
                        <RadioGroup row value={emailType} onChange={handleEmailTypeChange}>
                            <FormControlLabel value="all" control={<Radio />} label="All Subscribers" />
                            <FormControlLabel value="selected" control={<Radio />} label="Selected Subscribers" />
                        </RadioGroup>
                    </FormControl>

                    {emailType === "selected" && (
                        <Autocomplete
                            multiple
                            options={availableEmails}
                            loading={loadingEmails}
                            value={selectedEmails}
                            onChange={(event, newValue) => {
                                setSelectedEmails(newValue)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Select Recipients"
                                    placeholder="Search by name or email"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {loadingEmails ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                            sx={{ mb: 3 }}
                        />
                    )}

                    <TextField
                        fullWidth
                        label="Subject"
                        variant="outlined"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Content"
                        variant="outlined"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        multiline
                        rows={8}
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
                        startIcon={<SendIcon />}
                        disabled={loading}
                        sx={{ minWidth: 150 }}
                    >
                        {loading ? <CircularProgress size={24} /> : "Send Email"}
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
                    Email sent successfully!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default SendEmailPage

