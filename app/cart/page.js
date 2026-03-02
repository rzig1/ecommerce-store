import { requireAuth } from "@/app/lib/auth-utils";
import { prisma } from "@/app/lib/prisma";
import CartItemRow from "@/app/components/CartItemRow";
import Link from "next/link";

export const metadata = {
  title: "Mon Panier - E-Commerce Store",
  description: "Gérez votre panier d'achats"
};

export default async function CartPage() {
  // Vérifier que l'utilisateur est connecté
  const session = await requireAuth();

  // Récupérer les items du panier
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
    include: {
      product: true
    },
    orderBy: { createdAt: "desc" }
  });

  // Calculer le total
  const total = cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Mon Panier
      </h1>

      {cartItems.length === 0 ? (
        // Panier vide
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="mb-4">
            <svg 
              className="w-24 h-24 mx-auto text-gray-300" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
          </div>
          <p className="text-gray-600 text-lg mb-4">
            Votre panier est vide
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Continuer mes achats
          </Link>
        </div>
      ) : (
        <div>
          {/* Liste des produits */}
          <div className="space-y-4 mb-8">
            {cartItems.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          {/* Résumé du panier */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold">Sous-total :</span>
                <span className="text-2xl font-bold text-blue-600">
                  {total.toFixed(2)} DT
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-6">
                <p>• Frais de livraison calculés lors du paiement</p>
                <p>• Tous les prix sont TTC</p>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/products"
                  className="flex-1 text-center border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
                >
                  Continuer mes achats
                </Link>
                <Link
                  href="/checkout"
                  className="flex-1 text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Passer commande
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}