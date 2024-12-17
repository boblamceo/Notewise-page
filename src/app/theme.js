"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ffffff", // Set primary color to white
        },
        secondary: {
            main: "#1976d2", // You can set other colors as needed
        },
        background: {
            default: "#21232e", // Light background color
        },
        text: {
            primary: "#000",
        },
    },
});

export default theme;
