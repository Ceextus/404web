import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Admin | 404 Services",
  description: "Content Management System",
};

export default function AdminLayout({ children }) {
  return (
    <div className={`${inter.variable} min-h-screen bg-[#050b14] text-white font-sans`}>
      {children}
    </div>
  );
}
