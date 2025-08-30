import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pruthviraj Thorbole — Developer Portfolio",
  description:
    "A modern, minimal, and elegant portfolio showcasing projects, experience, and contact.",
  metadataBase: new URL("https://example.com"),
  keywords: [
    "Pruthviraj Thorbole",
    "Portfolio",
    "Full-Stack Developer",
    "Next.js",
    "React",
  ],
  openGraph: {
    title: "Pruthviraj Thorbole — Developer Portfolio",
    description:
      "A modern, minimal, and elegant portfolio showcasing projects, experience, and contact.",
    type: "website",
    url: "https://example.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pruthviraj Thorbole — Developer Portfolio",
    description:
      "A modern, minimal, and elegant portfolio showcasing projects, experience, and contact.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased scroll-smooth`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
