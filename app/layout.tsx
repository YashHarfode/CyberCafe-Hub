import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navbar"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CyberCafe Hub",
  description: "Simplify Your Service Tasks with a Click",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="min-h-screen bg-gray-900">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

