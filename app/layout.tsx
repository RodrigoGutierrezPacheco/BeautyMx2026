import React from "react"
import type { Metadata } from 'next'
import { Outfit, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'

const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Beautyy MX | Makeup & Skincare',
  description: 'Tu destino de belleza con las mejores marcas: Glossier, Rhode, Patrick Ta, One Size y Beauty Creations',
  icons: {
    icon: '/logo.png',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} ${playfair.variable} font-sans antialiased bg-background`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
