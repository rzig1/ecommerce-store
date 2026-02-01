// app/layout.js

import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'E-Commerce Store',
  description: 'Catalogue de produits avec Next.js et FakeStore API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className="antialiased
                   bg-[var(--background)]
                   text-[var(--foreground)]"
      >

        {/* Navigation */}
        <nav
          className="sticky top-0 z-50
                     backdrop-blur
                     bg-[linear-gradient(135deg,var(--background),rgba(59,130,246,0.08),var(--background))]
                     border-b border-gray-200/60
                     shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">

              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2
                           text-xl font-extrabold tracking-tight
                           bg-[linear-gradient(135deg,var(--foreground),rgba(59,130,246,0.6),var(--foreground))]
                           bg-clip-text text-transparent
                           transition-colors"
              >
                
                E-Commerce Store
              </Link>

              {/* Menu */}
              <div className="flex items-center gap-8">
                <Link
                  href="/"
                  className="relative font-medium
                             bg-[linear-gradient(135deg,var(--foreground),rgba(59,130,246,0.6),var(--foreground))]
                             font-extrabold
                             bg-clip-text text-transparent
                             hover:text-blue-600 transition
                             after:absolute after:left-0 after:-bottom-1
                             after:h-[2px] after:w-0 after:bg-blue-600
                             after:transition-all hover:after:w-full"
                >
                  Accueil
                </Link>

                <Link
                  href="/products"
                  className="relative font-medium
                            bg-[linear-gradient(135deg,var(--foreground),rgba(59,130,246,0.6),var(--foreground))]
                           bg-clip-text text-transparent
                             hover:text-blue-600 transition
                             after:absolute after:left-0 after:-bottom-1
                             after:h-[2px] after:w-0 after:bg-blue-600
                             after:transition-all hover:after:w-full"
                >
                  Produits
                </Link>
              </div>

            </div>
          </div>
        </nav>

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

      </body>
    </html>
  )
}
