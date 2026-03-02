import './globals.css'
import { Inter, Poppins } from "next/font/google"
import Link from 'next/link'
import Providers from './providers'
import Header from './components/Header'

// Police principale : Inter
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
})

// Police secondaire : Poppins pour les titres
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-poppins"
})

export const metadata = {
  title: 'E-Commerce Store',
  description: 'Catalogue de produits avec Next.js et FakeStore API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`scroll-smooth ${inter.variable} ${poppins.variable}`}>
      <body
        className="antialiased font-sans
                   bg-[var(--background)]
                   text-[var(--foreground)]"
      >
        <Providers>
          <Header/>

          {/* Contenu principal */}
          <main className="min-h-screen max-w-7xl mx-auto px-6 py-12">
            {children}
          </main>

          {/* Footer */}
          <footer
            className="border-t border-gray-200/60
                       bg-[linear-gradient(180deg,var(--background),#020617)]
                       text-gray-400"
          >
            <div className="max-w-7xl mx-auto px-6 py-10 text-center">
              <p className="font-semibold text-gray-200">
                © 2025 E-Commerce Store
              </p>

              <p className="text-sm mt-2">
                TP Next.js — Master SWM ISITCOM
              </p>

              <div className="mt-4 text-xs text-gray-500">
                Powered by FakeStore API
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
} 