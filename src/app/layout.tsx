import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../store/Provider";
import AuthModal from "../components/AuthModal/AuthModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Summarist | Frontend Simplified Virtual Internship",
  description:
    "A multi-route book summary application built by Rebecca Aaland as a Frontend Simplified virtual internship project.",
  authors: [{ name: "Rebecca Aaland" }],
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ReduxProvider>
          {children}
          <AuthModal />
        </ReduxProvider>
      </body>
    </html>
  );
}
