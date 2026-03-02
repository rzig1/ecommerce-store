import { prisma } from "@/app/lib/prisma";
import ProductCard from "@/app/components/ProductCard";

export const metadata = {
  title: "Nos Produits - My Shop",
  description: "Découvrez notre sélection de produits"
};

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Nos Produits
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Aucun produit disponible pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}