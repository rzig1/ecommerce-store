// app/products/[id]/error.js
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error('Product error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="text-6xl mb-6">😞</div>
      
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Erreur de chargement du produit
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Impossible de charger les informations de ce produit.
      </p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Réessayer
        </button>

        <Link
          href="/products"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
        >
          Retour aux produits
        </Link>
      </div>
    </div>
  );
}