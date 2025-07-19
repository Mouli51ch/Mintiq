import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Mintellect - Revolutionizing Research with AI and Blockchain",
  description:
    "Verify your work, mint your proof, and join a decentralized research ecosystem. AI-powered originality scoring and blockchain verification for researchers.",
  keywords: ["research", "AI", "blockchain", "Web3", "plagiarism detection", "NFT", "academic publishing"],
  authors: [{ name: "Mintellect Team" }],
  creator: "Mintellect",
  publisher: "Mintellect",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mintellect.com",
    title: "Mintellect - Revolutionizing Research with AI and Blockchain",
    description: "Verify your work, mint your proof, and join a decentralized research ecosystem.",
    siteName: "Mintellect",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mintellect - Revolutionizing Research with AI and Blockchain",
    description: "Verify your work, mint your proof, and join a decentralized research ecosystem.",
    creator: "@mintellect",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
