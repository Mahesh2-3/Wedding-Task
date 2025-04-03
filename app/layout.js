import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
//font-[family-name:var(--font-geist-mono)]
export const metadata = {
  title: "Shadi Vibes",
  description: "Your Perfect Wedding Partner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  bg-[#F5F5DC] antialiased min-h-screen relative pb-24`}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
