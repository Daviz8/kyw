/** @format */
import { Playfair_Display } from "next/font/google";
import { ReactNode } from "react";

const playfairItalic = Playfair_Display({
  subsets: ["latin"],
  style:"italic",
  variable: "--font-play-italic",
});

export function PlayfairDisplayText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${className} ${playfairItalic.className} antialiased`}>
      {children}
    </div>
  );
}
