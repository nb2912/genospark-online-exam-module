// app/layout.tsx
import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Demo - Pearson VUE Test Driver'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
