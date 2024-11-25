import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";

// Local Geist fonts
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

// Metadata
export const metadata = {
  title: "Uber Clone Web App - Hafeez Baig Project",
  description: "Project made by Hafeez Baig",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Add Google Fonts (Roboto) */}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/uber-clone-favicon.ico" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          style={{
            fontFamily: `var(--font-geist-sans), var(--font-geist-mono), Roboto, sans-serif`,
          }}
        >
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
