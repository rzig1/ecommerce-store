// app/products/[id]/not-found.js

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="text-9xl mb-6">404</div>
      
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Produit non trouvé
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Le produit que vous recherchez n&apos;existe pas ou a été supprimé.
      </p>

      <div className="flex gap-4 justify-center">
        <Link
          href="/products"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Voir tous les produits
        </Link>

        <Link
          href="/"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}