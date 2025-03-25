import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#4ECCA3", // Rife teal color
            light: "#7EDEBB",
            dark: "#35B88A",
            contrastText: "#000000",
        },
        secondary: {
            main: "#333333",
            light: "#555555",
            dark: "#111111",
            contrastText: "#FFFFFF",
        },
        background: {
            default: "#FFFFFF",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#111111",
            secondary: "#555555",
        },
        error: {
            main: "#FF4D4F",
        },
        warning: {
            main: "#FAAD14",
        },
        info: {
            main: "#1890FF",
        },
        success: {
            main: "#52C41A",
        },
    },
    typography: {
        fontFamily: [
            "SF Pro Display",
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Roboto",
            "Helvetica Neue",
            "Arial",
            "sans-serif",
        ].join(","),
        h1: {
            fontWeight: 700,
            fontSize: "2.5rem",
            letterSpacing: "-0.01562em",
        },
        h2: {
            fontWeight: 600,
            fontSize: "2rem",
            letterSpacing: "-0.00833em",
        },
        h3: {
            fontWeight: 600,
            fontSize: "1.5rem",
            letterSpacing: "0em",
        },
        h4: {
            fontWeight: 600,
            fontSize: "1.25rem",
            letterSpacing: "0.00735em",
        },
        h5: {
            fontWeight: 600,
            fontSize: "1rem",
            letterSpacing: "0em",
        },
        h6: {
            fontWeight: 600,
            fontSize: "0.875rem",
            letterSpacing: "0.0075em",
        },
        button: {
            textTransform: "none",
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "8px 16px",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none",
                    },
                },
                contained: {
                    "&:hover": {
                        boxShadow: "none",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                    borderRadius: 16,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundImage: "none",
                    border: "none",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 8,
                    },
                },
            },
        },
    },
})

export default theme

