import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DataDelimited CNC Estimator - AI-Powered Manufacturing Estimates",
  description: "Upload STEP files and get instant, accurate CNC manufacturing estimates with AI-powered feature recognition and cost analysis.",
  keywords: "CNC, estimator, manufacturing, AI, STEP files, machining, cost estimation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
