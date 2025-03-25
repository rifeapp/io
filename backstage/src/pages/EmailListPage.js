
import { useState, useEffect } from "react"
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Button,
    TextField,
    InputAdornment,
    CircularProgress,
    Alert,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import { Link } from "react-router-dom"

function EmailListPage() {
    const [emails, setEmails] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchEmails()
    }, [])

    const fetchEmails = async () => {
        setLoading(true)
        try {
            const response = await fetch("http://localhost:8101/api/emails")
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }
            const data = await response.json()
            setEmails(data)
            setError(null)
        } catch (err) {
            console.error("Failed to fetch emails:", err)
            setError("Failed to load emails. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteEmail = async (id) => {
        if (window.confirm("Are you sure you want to delete this email?")) {
            try {
                const response = await fetch(`http://localhost:8101/api/emails/${id}`, {
                    method: "DELETE",
                })
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`)
                }
                // Remove the deleted email from the state
                setEmails(emails.filter((email) => email.id !== id))
            } catch (err) {
                console.error("Failed to delete email:", err)
                alert("Failed to delete email. Please try again.")
            }
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(Number.parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
        setPage(0)
    }

    const filteredEmails = emails.filter(
        (email) =>
            email.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.customerName.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const formatDate = (dateString) => {
        if (!dateString) return "N/A"
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h1" sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
                    Email Subscribers
                </Typography>
                <Button component={Link} to="/add-subscriber" variant="contained" color="primary" startIcon={<AddIcon />}>
                    Add Subscriber
                </Button>
            </Box>

            <Paper sx={{ mb: 4, p: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2 }}
                />

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Date Added</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredEmails.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                No subscribers found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredEmails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((email) => (
                                            <TableRow key={email.id}>
                                                <TableCell>{email.customerName}</TableCell>
                                                <TableCell>{email.emailAddress}</TableCell>
                                                <TableCell>{formatDate(email.createdAt)}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton color="error" onClick={() => handleDeleteEmail(email.id)} size="small">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredEmails.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                )}
            </Paper>
        </Box>
    )
}

export default EmailListPage

