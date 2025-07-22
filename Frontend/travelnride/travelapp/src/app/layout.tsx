import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/sidebar-responsive.css";
import { Header } from "@/component/Header/Header";
import { LayoutProvider } from "@/component/Layout/LayoutProvider";
import { ToastProvider } from "@/component/Admin/Error-alert/Error-alert";
import { AuthProvider } from "@/contexts/AuthContext";
import { QuickLogin } from "@/component/Auth/QuickLogin";
import Footer from "@/component/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travel Ride Tourism",
  description: "Create your own travel experience with Travel Ride Tourism",
  openGraph: {
    title: "Travel Ride Tourism",
    description: "Create your own travel experience with Travel Ride Tourism"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ToastProvider>
            <LayoutProvider>
              <Header/>
              {children}
            </LayoutProvider>
            <QuickLogin />
          </ToastProvider>
        </AuthProvider>
        <Footer/>
      </body>
    </html>
  );
}
