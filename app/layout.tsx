import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../css/globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lock & Key Solution Denver CO | Denver Locksmith",
  description: "we are providing 24/7 locksmith entire Denver co and sorounding areas",
  generator: "Rakib Ahmed",
  icons: {
    icon: [
      {
        url: "./public/favicon-96x96.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "./public/favicon-96x96.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "./public/favicon-96x96.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  )
}
