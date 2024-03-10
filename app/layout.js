import { Inter } from "next/font/google";
import './globals.css'
import Header from "./components/Header";
import AuthProvider from "./components/AuthProvider";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "adminDashboard",
  description: "That is the admin dashboard website",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-200`}>
        <AuthProvider>
        <Header/>
        {children}
        <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
