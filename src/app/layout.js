import localFont from "next/font/local";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "Notewise",
    description: "The wise way of learning",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <CookiesProvider>{children}</CookiesProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
