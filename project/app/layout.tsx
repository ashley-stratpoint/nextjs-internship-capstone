import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono} from "next/font/google"
import "./globals.css"
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: { 
    default: "Balangkas | Project Management Tool",
    template: "%s | Balangkas",
  },
  description: "Balangkas is a project management tool designed to help teams organize, track, and manage their projects effectively.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Balangkas",
    description: "Project Management Tool",
    type: "website",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <ThemeProvider >{children}</ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}
