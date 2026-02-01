// app/page.js

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto p-7">
        <div
  className="absolute inset-0 -z-10 rounded-3xl shadow-2xl
             bg-[linear-gradient(135deg,var(--background),#122130,var(--background))]"
/>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight  bg-[linear-gradient(135deg,var(--foreground),rgba(59,130,246,0.6),var(--foreground))] bg-clip-text text-transparent mb-6">
          Bienvenue sur notre
          <span className=" bg-[linear-gradient(135deg,var(--foreground),rgba(59,130,246,0.6),var(--foreground))]
                           bg-clip-text text-transparent"> E-Commerce Store</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
          Découvrez notre catalogue de produits de qualité avec des prix compétitifs.
          Une navigation rapide, une interface moderne et une expérience fluide.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/products"
            className="px-8 py-4 rounded-xl 
              bg-[#5278b5]
              text-white font-semibold text-lg 
              shadow-lg hover:shadow-2xl 
              hover:from-blue-700 hover:to-indigo-700 
              transition-all"
          >
            Voir tous les produits
          </Link>

          <Link
            href="/products"
            className="px-8 py-4 rounded-xl 
              bg-white text-gray-800 font-semibold text-lg 
              border border-gray-200 
              shadow-md hover:shadow-xl 
              hover:bg-gray-50 
              transition-all"
          >
            Explorer les catégories
          </Link>
        </div>
      </section>

    

    </div>
  )
}
