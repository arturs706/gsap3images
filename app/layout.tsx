import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import NavButton from "@/components/NavButton";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Stelfort Ltd - Estate Agent",
  description: "Estate Agents Archway, Camden, Islington, Tufnell Park, Upper Holloway, North London",
};

const ivyMode = localFont({
  src: "./fonts/ivy-mode.woff",
  variable: "--font-ivy-mode"
  });

  const ivyModeBoldItalic = localFont({
    src: "./fonts/ivy-mode-bold-italic.woff",
    variable: "--font-ivy-mode-bold-italic"
    });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className={`${ivyMode.variable} ${ivyModeBoldItalic.variable} antialiased`}
      >
        <NavButton />
        <Nav />
        {children}
      </body>
    </html>
  );
}
