// app/products/page.js

import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts } from '../lib/api';

// Metadata pour SEO
export const metadata = {
  title: 'Tous nos Produits | E-Commerce Store',
  description: 'Découvrez notre catalogue complet de produits de qualité',
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function ProductsPage() {
  // Fetch products côté serveur
  await delay(2000);
  const products = await getAllProducts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <header className="mb-16 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight 
                       bg-[linear-gradient(135deg,var(--foreground),rgba(59,130,246,0.6),var(--foreground))]
                       bg-clip-text text-transparent mb-6">
          Nos Produits
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-4">
          {products.length} produits disponibles
        </p>
      </header>

      {/* Grid produits */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group"
          >
            <article className="relative rounded-2xl overflow-hidden 
                               shadow-lg hover:shadow-2xl 
                               transition-all duration-300
                               bg-[linear-gradient(135deg,var(--background),#122130,var(--background))]
                               border border-gray-800/50
                               hover:scale-[1.02]">
              
              {/* Image Container */}
              <div className="relative h-64 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-6 
                           group-hover:scale-110 group-hover:rotate-2
                           transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 
                              bg-gradient-to-t from-black/20 to-transparent
                              opacity-0 group-hover:opacity-100
                              transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                {/* Badge categorie */}
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1.5 
                                 bg-gradient-to-r from-blue-500/20 to-indigo-500/20
                                 backdrop-blur-sm
                                 border border-blue-500/30
                                 text-blue-300 text-xs font-semibold
                                 rounded-full uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>

                {/* Titre */}
                <h2 className="text-base font-semibold 
                             text-gray-100 
                             line-clamp-2 
                             min-h-[3rem]
                             group-hover:text-blue-400 
                             transition-colors duration-300">
                  {product.title}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400 text-sm">
                    {'⭐'.repeat(Math.round(product.rating.rate))}
                    {'☆'.repeat(5 - Math.round(product.rating.rate))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.rating.count})
                  </span>
                </div>

                {/* Prix et CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
                  <span className="text-2xl font-bold 
                                 bg-[linear-gradient(135deg,#60a5fa,#3b82f6,#2563eb)]
                                 bg-clip-text text-transparent">
                    {product.price.toFixed(2)} €
                  </span>
                  
                  <span className="inline-flex items-center gap-1
                                 text-sm text-gray-400 
                                 group-hover:text-blue-400
                                 group-hover:gap-2
                                 transition-all duration-300">
                    Détails
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 
                            bg-gradient-to-r from-transparent via-white/5 to-transparent
                            translate-x-[-100%] group-hover:translate-x-[100%]
                            transition-transform duration-1000
                            pointer-events-none" />
            </article>
          </Link>
        ))}
      </div>

      {/* Empty state si pas de produits */}
      {products.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">
            Aucun produit disponible
          </h3>
          <p className="text-gray-500">
            Revenez plus tard pour découvrir nos nouveautés !
          </p>
        </div>
      )}
    </div>
  );
}