import type { Metadata } from "next";
import { Geist_Mono, Playfair_Display, Poppins, Calligraffitti, Fraunces } from "next/font/google";
import "./globals.css";
import GoogleOAuthProviderWrapper from "./components/GoogleOAuthProviderWrapper";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-play",
  display: "swap",
});

// FIXED: Renamed to fraunces
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: "normal",
  variable: "--font-fraunces",
  display: "swap",
});

const calligraffitti = Calligraffitti({
  subsets: ["latin"],
  variable: "--font-cal",
  style: "normal",
  weight: "400",
  display: "swap",
});

const playfairItalic = Playfair_Display({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-play-italic",
  display: "swap",
});

const pop = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-pop",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KYW Wellness | Home",
  description: "Mental health counseling, child psychology, and professional wellness support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairItalic.variable} ${geistMono.variable} ${pop.variable} ${playfair.variable} ${calligraffitti.variable} ${fraunces.variable} antialiased`}
      >
        <GoogleOAuthProviderWrapper> 
           {children}
        </GoogleOAuthProviderWrapper> 
      </body>
    </html>
  );
}