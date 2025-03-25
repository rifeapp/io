import { Card, CardHeader, CardContent, CardActions, Typography, Box, IconButton, Divider } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EmailIcon from "@mui/icons-material/Email"

function EmailCard({ email, onDelete }) {
    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
                },
            }}
        >
            <CardHeader
                title={email.customerName}
                subheader={email.emailAddress}
                action={
                    <IconButton aria-label="delete" onClick={() => onDelete(email.id)} color="error" size="small">
                        <DeleteIcon />
                    </IconButton>
                }
                titleTypographyProps={{ variant: "h6" }}
                subheaderTypographyProps={{ variant: "body2" }}
                sx={{ pb: 1 }}
            />
            <Divider />
            <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                {email.subject && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Subject
                        </Typography>
                        <Typography variant="body1">{email.subject}</Typography>
                    </Box>
                )}
                {email.content && (
                    <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Content
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {email.content}
                        </Typography>
                    </Box>
                )}
            </CardContent>
            <CardActions
                sx={{
                    bgcolor: "grey.50",
                    p: 2,
                    borderTop: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <EmailIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                        Subscribed on: {formatDate(email.createdAt)}
                    </Typography>
                </Box>
            </CardActions>
        </Card>
    )
}

export default EmailCard

