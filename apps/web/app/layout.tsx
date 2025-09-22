import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spreesy",
  description: "AI-powered creator matching for revenue-focused brands"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-dark">
      <body className={clsx(inter.className, "min-h-screen bg-dark text-white")}>{children}</body>
    </html>
  );
}
