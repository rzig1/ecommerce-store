// app/admin/products/new-action/page.jsx
import { createProduct } from "@/app/actions/product";
import Link from "next/link";

export default function NewProductActionPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight 
                       bg-[linear-gradient(135deg,var(--foreground),rgba(59,130,246,0.6),var(--foreground))]
                       bg-clip-text text-transparent mb-4">
          Créer un Nouveau Produit
        </h1>
        <p className="text-lg text-gray-400">
          Utilisez les Server Actions pour ajouter un produit à votre catalogue
        </p>
      </div>

      {/* Formulaire */}
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden
                       bg-[linear-gradient(135deg,var(--background),#122130,var(--background))]
                       shadow-2xl border border-gray-800/50 p-8">
          
          <form action={createProduct} className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Titre du produit *
              </label>
              <input
                name="title"
                className="w-full bg-gray-900/50 border border-gray-700 
                         rounded-xl px-4 py-3
                         text-gray-100 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-300"
                placeholder="Ex: Smartphone Galaxy S24"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                rows={5}
                className="w-full bg-gray-900/50 border border-gray-700 
                         rounded-xl px-4 py-3
                         text-gray-100 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-300
                         resize-none"
                placeholder="Décrivez votre produit en détail..."
                required
              />
            </div>

            {/* Prix et Stock - Grid 2 colonnes */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Prix */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Prix (TND) *
                </label>
                <div className="relative">
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    className="w-full bg-gray-900/50 border border-gray-700 
                             rounded-xl px-4 py-3 pl-10
                             text-gray-100 placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-300"
                    placeholder="0.00"
                    required
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Stock disponible
                </label>
                <div className="relative">
                  <input
                    name="stock"
                    type="number"
                    className="w-full bg-gray-900/50 border border-gray-700 
                             rounded-xl px-4 py-3 pl-10
                             text-gray-100 placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-300"
                    defaultValue="0"
                    placeholder="0"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    
                  </div>
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                URL de l&apos;image
              </label>
              <div className="relative">
                <input
                  name="imageUrl"
                  type="url"
                  className="w-full bg-gray-900/50 border border-gray-700 
                           rounded-xl px-4 py-3 pl-10
                           text-gray-100 placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-300"
                  placeholder="https://example.com/image.jpg"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Optionnel - Laissez vide pour utiliser l&apos;image par défaut
              </p>
            </div>

            {/* Bouton Submit */}
            <div className="pt-4">
              <button 
                type="submit"
                className="w-full 
                         bg-gradient-to-r from-blue-600 to-indigo-600
                         hover:from-blue-700 hover:to-indigo-700
                         text-white px-8 py-4 rounded-xl 
                         font-bold text-lg 
                         shadow-lg hover:shadow-2xl
                         transform hover:scale-[1.02]
                         transition-all duration-300
                         flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 4v16m8-8H4" />
                </svg>
                Créer le Produit
              </button>
            </div>

            {/* Info message */}
            <div className="mt-6 p-4 rounded-xl
                          bg-gradient-to-br from-blue-500/10 to-cyan-500/10
                          border border-blue-500/20">
              <p className="text-sm text-gray-400 flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  Après création, visitez <code className="px-2 py-1 bg-gray-800 rounded text-blue-300">/products</code> pour voir votre nouveau produit avec revalidation automatique.
                </span>
              </p>
            </div>
          </form>
        </div>

        {/* Bouton retour */}
        <div className="mt-8 text-center">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 
                     px-6 py-3 rounded-xl
                     bg-gray-800 hover:bg-gray-700
                     text-gray-200 font-semibold
                     border border-gray-700
                     hover:border-gray-600
                     shadow-md hover:shadow-lg
                     transition-all duration-300
                     group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            
            Retour au catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}