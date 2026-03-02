import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/auth-utils";
import Link from "next/link";
import Image from "next/image";

export default async function AdminProductsPage() {
  await requireAdmin();

  const products = await prisma.product.findMany({
    include: {
      category: true
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestion des Produits
        </h1>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nouveau produit
        </Link>
      </div>

      {/* Tableau des produits */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Produit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Prix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
  {products.map((product) => (
    <tr key={product.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="relative w-12 h-12">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover rounded"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-gray-400" 
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
      </td>
      <td className="px-6 py-4">
        <div className="font-medium text-gray-900">
          {product.title}
        </div>
        <div className="text-sm text-gray-500 truncate max-w-xs">
          {product.description}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
        {product.category?.name || "-"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
        {product.price.toFixed(2)} DT
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={
          product.stock > 10
            ? "text-green-600"
            : product.stock > 0
            ? "text-orange-600"
            : "text-red-600"
        }>
          {product.stock}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={
          product.isActive
            ? "px-2 py-1 bg-green-100 text-green-800 rounded text-sm"
            : "px-2 py-1 bg-red-100 text-red-800 rounded text-sm"
        }>
          {product.isActive ? "Actif" : "Inactif"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <Link
          href={`/admin/products/${product.id}`}
          className="text-blue-600 hover:underline mr-3"
        >
          Modifier
        </Link>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
}