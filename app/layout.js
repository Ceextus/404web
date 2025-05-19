// app/layout.js
import { 
  Inter, 
  Raleway, 
  JetBrains_Mono, 
  Outfit,
  Montserrat
} from "next/font/google";
import "./globals.css";

// Load the fonts with weight options
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"], // Include desired weights
});

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
  weight: ["400", "500", "600", "700", "800"], // Include desired weights
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"], // Include desired weights
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit", 
  weight: ["400", "500", "600", "700"], // Include desired weights
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"], // Include desired weights
});

export const metadata = {
  title: "404Services",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  description: "IT Services and Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`
      ${inter.variable} 
      ${jetbrainsMono.variable} 
      ${raleway.variable} 
      ${outfit.variable}
      ${montserrat.variable}
    `}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}