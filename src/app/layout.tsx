import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CompareDrawer } from "@/components/CompareDrawer";
import { ProfileFab } from "@/components/ProfileFab";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Tools Hub - Discover the Best AI & SaaS Tools",
    template: "%s | AI Tools Hub",
  },
  description:
    "Discover, compare, and find the best AI and SaaS tools. Browse trending tools, filter by category, and make informed decisions with our comprehensive directory.",
  keywords: [
    "AI tools",
    "SaaS tools",
    "AI directory",
    "developer tools",
    "productivity tools",
    "open source tools",
  ],
  openGraph: {
    title: "AI Tools Hub - Discover the Best AI & SaaS Tools",
    description:
      "Discover, compare, and find the best AI and SaaS tools for your workflow.",
    type: "website",
    locale: "en_US",
    siteName: "AI Tools Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools Hub - Discover the Best AI & SaaS Tools",
    description:
      "Discover, compare, and find the best AI and SaaS tools for your workflow.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("ai-tools-hub-theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme:dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CompareDrawer />
          <ProfileFab />
        </Providers>
      </body>
    </html>
  );
}
