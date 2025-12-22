import type { Metadata } from "next";
import { Geist, Geist_Mono , Playfair_Display, Poppins , Calligraffitti,Lato} from "next/font/google";
import "./globals.css";


const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-play",
});

const lato = Lato({
     subsets: ["latin"],
       weight:["400"],
       style:"normal",
   variable: "--font-lat"
})


const calligraffitti = Calligraffitti({
  subsets: ["latin"],
  variable: "--font-cal",
  style:"normal",
  weight: "400"
});

const playfairItalic = Playfair_Display({
  subsets: ["latin"],
  style:"italic",
  variable: "--font-play-italic",
});

const pop = Poppins({
  subsets: ["latin"],
  weight:["100","200","300","400","500","600","700","800","900"],
  variable: "--font-pop",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KYW wellness | Home",
  description: "KYW wellness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairItalic.variable} ${geistMono.variable}   ${pop.variable}  ${playfair.variable} ${calligraffitti.variable} ${lato.variable} antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
