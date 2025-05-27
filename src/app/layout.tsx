import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"

const geistSans = Nunito({
  weight: ["500", "700", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: 'Курьер',
  description: 'Интерфейс для курьера доставки еды',
}

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} antialiased`}
      >
        <div className="flex justify-center">
          {children}
        </div>
      </body>
    </html>
  )
}
