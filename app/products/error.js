// app/products/error.js
'use client';
import Link from 'next/link';
import { useEffect } from 'react';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error('Error caught:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      {/* Icone d'erreur */}
      <div className="text-6xl mb-6">⚠️</div>

      {/* Titre */}
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Oups ! Une erreur est survenue
      </h1>

      {/* Message d'erreur (dev uniquement) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6 text-left max-w-2xl mx-auto">
          <p className="font-mono text-sm text-red-800">
            {error.message}
          </p>
          {error.digest && (
            <p className="text-xs text-red-600 mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      )}

      {/* Message utilisateur (production) */}
      {process.env.NODE_ENV === 'production' && (
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Nous rencontrons des difficultés techniques.
          Nos équipes ont été notifiées et travaillent sur le problème.
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Réessayer
        </button>

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