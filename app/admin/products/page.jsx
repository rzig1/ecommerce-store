// app/products/page.jsx
// Liste des produits depuis PostgreSQL via Prisma (Server Component)

import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic"; 

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <header className="mb-16 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight 
                       bg-[linear-gradient(135deg,var(--foreground),rgba(59,130,246,0.6),var(--foreground))]
                       bg-clip-text text-transparent mb-6">
          Catalogue Produits
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-4">
          {products.length} produits disponibles depuis notre base de données
        </p>
      </header>

      {/* Grid produits */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
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
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-contain p-6 
                             group-hover:scale-110 group-hover:rotate-2
                             transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-20 h-20 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 
                              bg-gradient-to-t from-black/20 to-transparent
                              opacity-0 group-hover:opacity-100
                              transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                {/* Badge stock */}
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-3 py-1.5 
                                   backdrop-blur-sm
                                   text-xs font-semibold
                                   rounded-full uppercase tracking-wide
                                   ${product.stock > 0 
                                     ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300' 
                                     : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-300'}`}>
                    {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
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

                {/* Description */}
                <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem]">
                  {product.description}
                </p>

                {/* Prix et CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
                  <span className="text-2xl font-bold 
                                 bg-[linear-gradient(135deg,#60a5fa,#3b82f6,#2563eb)]
                                 bg-clip-text text-transparent">
                    {product.price.toFixed(2)} TND
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

      {/* Empty state */}
      {products.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">
            Aucun produit disponible
          </h3>
          <p className="text-gray-500 mb-6">
            Commencez par créer votre premier produit !
          </p>
          <Link 
            href="/admin/products/new-action"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                     bg-gradient-to-r from-blue-600 to-indigo-600
                     hover:from-blue-700 hover:to-indigo-700
                     text-white font-semibold
                     shadow-lg hover:shadow-2xl
                     transform hover:scale-[1.02]
                     transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Créer un produit
          </Link>
        </div>
      )}
    </div>
  );
}