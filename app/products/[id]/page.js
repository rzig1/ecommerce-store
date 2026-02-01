// app/products/[id]/page.js

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById, getAllProducts } from '@/app/lib/api';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Générer les routes statiques au build (SSG)
export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map(product => ({
    id: product.id.toString()
  }));
}

// Metadata dynamique (SEO)
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  
  try {
    const product = await getProductById(resolvedParams.id);

    return {
      title: `${product.title} | E-Commerce Store`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [
          {
            url: product.image,
            width: 800,
            height: 800,
            alt: product.title,
          }
        ],
        type: 'website',
        siteName: 'E-Commerce Store',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description: product.description,
        images: [product.image],
      },
    };
  } catch (error) {
    return {
      title: 'Produit non trouvé',
      description: 'Le produit demandé n\'existe pas',
    };
  }
}

// Page produit
export default async function ProductPage({ params }) {
  delay(1500)  
  const resolvedParams = await params;
  let product;

  try {
    product = await getProductById(resolvedParams.id);
  } catch (error) {
    notFound();
  }

  // JSON-LD Schema pour SEO e-commerce
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.image,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.rate,
      reviewCount: product.rating.count,
    },
  };

  return (
    <>
      
      {/* JSON-LD pour SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Accueil
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/products" className="hover:text-blue-400 transition-colors">
              Produits
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-200">{product.title}</span>
          </div>
        </nav>

        {/* Conteneur principal avec fond gradient */}
        <div className="relative rounded-3xl overflow-hidden
                       bg-[linear-gradient(135deg,var(--background),#122130,var(--background))]
                       shadow-2xl border border-gray-800/50 p-8">
          
          {/* Layout 2 colonnes */}
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Colonne gauche : Image */}
            <div className="relative">
              <div className="sticky top-8">
                <div className="relative aspect-square 
                              bg-gradient-to-br from-gray-900 to-gray-800 
                              rounded-2xl overflow-hidden
                              border border-gray-700/50
                              shadow-xl">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-8 
                             hover:scale-110 transition-transform duration-500"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 
                                bg-gradient-to-tr from-transparent via-white/5 to-transparent
                                opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>

            {/* Colonne droite : Informations */}
            <div className="space-y-6">
              
              {/* Badge catégorie */}
              <div>
                <span className="inline-block px-4 py-2 
                               bg-gradient-to-r from-blue-500/20 to-indigo-500/20
                               backdrop-blur-sm
                               border border-blue-500/30
                               text-blue-300 text-sm font-semibold
                               rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
              </div>

              {/* Titre */}
              <h1 className="text-4xl lg:text-5xl font-extrabold 
                           bg-[linear-gradient(135deg,var(--foreground),rgba(59,130,246,0.6),var(--foreground))]
                           bg-clip-text text-transparent
                           leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 pb-6 border-b border-gray-700/50">
                <div className="flex text-yellow-400 text-2xl">
                  {'⭐'.repeat(Math.round(product.rating.rate))}
                  {'☆'.repeat(5 - Math.round(product.rating.rate))}
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="font-semibold text-lg">
                    {product.rating.rate}
                  </span>
                  <span className="text-gray-500">/</span>
                  <span className="text-gray-400">5</span>
                </div>
                <span className="text-gray-500">
                  ({product.rating.count} avis)
                </span>
              </div>

              {/* Prix */}
              <div className="py-6 border-b border-gray-700/50">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl lg:text-6xl font-bold 
                                 bg-[linear-gradient(135deg,#60a5fa,#3b82f6,#2563eb)]
                                 bg-clip-text text-transparent">
                    {product.price.toFixed(2)}
                  </span>
                  <span className="text-3xl text-gray-400">€</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  TVA incluse • Livraison gratuite
                </p>
              </div>

              {/* Description */}
              <div className="py-6 border-b border-gray-700/50">
                <h2 className="text-2xl font-bold text-gray-100 mb-4">
                  Description
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-4 pt-4">
                <button className="w-full 
                                 bg-gradient-to-r from-blue-600 to-indigo-600
                                 hover:from-blue-700 hover:to-indigo-700
                                 text-white px-8 py-5 rounded-xl 
                                 font-bold text-lg 
                                 shadow-lg hover:shadow-2xl
                                 transform hover:scale-[1.02]
                                 transition-all duration-300
                                 flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Ajouter au panier
                </button>

                <button className="w-full 
                                 bg-gray-800 hover:bg-gray-700
                                 text-gray-200 px-8 py-5 rounded-xl 
                                 font-semibold text-lg 
                                 border border-gray-700
                                 hover:border-gray-600
                                 shadow-md hover:shadow-lg
                                 transform hover:scale-[1.02]
                                 transition-all duration-300
                                 flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Ajouter aux favoris
                </button>
              </div>

              {/* Informations supplémentaires */}
              <div className="mt-8 p-6 
                            bg-gradient-to-br from-gray-900/50 to-gray-800/50
                            backdrop-blur-sm
                            rounded-2xl border border-gray-700/50">
                <h3 className="text-xl font-bold text-gray-100 mb-4 
                             flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Informations produit
                </h3>
                <dl className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-700/30">
                    <dt className="font-semibold text-gray-300">Catégorie</dt>
                    <dd className="text-gray-400 capitalize">{product.category}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700/30">
                    <dt className="font-semibold text-gray-300">Prix unitaire</dt>
                    <dd className="text-gray-400">{product.price.toFixed(2)} €</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700/30">
                    <dt className="font-semibold text-gray-300">Note moyenne</dt>
                    <dd className="text-gray-400">{product.rating.rate} / 5</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="font-semibold text-gray-300">Nombre d&apos;avis</dt>
                    <dd className="text-gray-400">{product.rating.count} clients</dd>
                  </div>
                </dl>
              </div>

              {/* Badges de confiance */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 rounded-xl 
                              bg-gradient-to-br from-green-500/10 to-emerald-500/10
                              border border-green-500/20">
                  <div className="text-2xl mb-1">✓</div>
                  <p className="text-xs text-gray-400">Garantie 2 ans</p>
                </div>
                <div className="text-center p-4 rounded-xl 
                              bg-gradient-to-br from-blue-500/10 to-cyan-500/10
                              border border-blue-500/20">
                  <div className="text-2xl mb-1">🚚</div>
                  <p className="text-xs text-gray-400">Livraison rapide</p>
                </div>
                <div className="text-center p-4 rounded-xl 
                              bg-gradient-to-br from-purple-500/10 to-pink-500/10
                              border border-purple-500/20">
                  <div className="text-2xl mb-1">↩️</div>
                  <p className="text-xs text-gray-400">Retour 30 jours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton retour */}
        <div className="mt-12">
          <Link
            href="/products"
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
            Retour aux produits
          </Link>
        </div>
      </div>
    </>
  );
}