import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

// Générer les métadonnées dynamiquement
export async function generateMetadata({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id }
  });

  if (!product) {
    return { title: "Produit non trouvé" };
  }

  return {
    title: `${product.title} - E-Commerce Store`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.imageUrl ? [{ url: product.imageUrl }] : []
    }
  };
}

export default async function ProductPage({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: true }
  });

  if (!product || !product.isActive) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image produit optimisée */}
        <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <svg 
                className="w-32 h-32 text-gray-400" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          )}
        </div>

        {/* Détails produit */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 font-heading">
            {product.title}
          </h1>

          {product.category && (
            <div className="mt-3">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {product.category.name}
              </span>
            </div>
          )}

          <div className="mt-6 border-t border-b py-4">
            <p className="text-4xl font-bold text-blue-600">
              {product.price.toFixed(2)} DT
            </p>
          </div>

          <div className="mt-4">
            {product.stock > 0 ? (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-600 font-semibold">
                  En stock ({product.stock} disponible{product.stock > 1 ? 's' : ''})
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-600 font-semibold">
                  Rupture de stock
                </span>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-8">
            <AddToCartButton 
              productId={product.id} 
              disabled={product.stock === 0} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}