import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "./providers";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const SITE_URL = process.env.SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Netflix Like",
  description: "An application for film fanatics",
  openGraph: {
    title: "Netflix Like",
    description: "An Application for Movie Enthusiasts",
    url: SITE_URL,
    siteName: "Netflix Like",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.jpg`,
        width: 1024,
        height: 580,
        alt: "Open Graph Image Alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Netflix Like",
    description: "An Application for Movie Enthusiasts",
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.jpg`,
        width: 1024,
        height: 580,
        alt: "Open Graph Image Alt",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-900 antialiased`}
      >
        <ReactQueryProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <footer className="bg-lightDark p-4 text-center text-sm">
              © {new Date().getFullYear()} Netflix Like - Tous droits réservés.
            </footer>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
