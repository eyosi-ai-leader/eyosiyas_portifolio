import { Unbounded, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Display font: headings, logo, big text
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

// Body font: everything else
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata = {
  title: "Eyosiyas Hailemichael — Software Developer",
  description:
     "Portfolio of Eyosiyas Hailemichael: software developer specializing in full-stack web development, databases and AI-powered systems.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${unbounded.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}