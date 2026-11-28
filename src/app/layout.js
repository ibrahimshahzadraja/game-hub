import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "GameHub - Game Store",
  description: "Buy PC, PlayStation, Xbox and Switch games online at GameHub.",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/about", label: "About" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Navbar links={navLinks} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
        <footer className="mt-auto border-t border-zinc-800 bg-zinc-950">
          <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-zinc-400">
            <p>© 2026 GameHub.</p>
            <p className="mt-1">Get games at best price.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}