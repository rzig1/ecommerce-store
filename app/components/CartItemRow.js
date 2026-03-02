"use client";

import { useState } from "react";
import Image from "next/image";
import { updateCartItem, removeFromCart } from "@/app/actions/cart";

export default function CartItemRow({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  // Modifier la quantité
  async function handleQuantityChange(newQuantity) {
    if (newQuantity < 1) return;
    
    setLoading(true);
    setQuantity(newQuantity);

    await updateCartItem(item.id, newQuantity);
    setLoading(false);
  }

  // Supprimer l'item
  async function handleRemove() {
    setLoading(true);
    await removeFromCart(item.id);
  }

  const subtotal = item.product.price * quantity;

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
      {/* Image produit */}
      <div className="relative w-24 h-24 flex-shrink-0">
        {item.product.imageUrl ? (
          <Image
            src={item.product.imageUrl}
            alt={item.product.title}
            fill
            className="object-cover rounded"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Infos produit */}
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">
          {item.product.title}
        </h3>
        <p className="text-gray-600 text-sm">
          {item.product.price.toFixed(2)} DT × {quantity}
        </p>
        {item.product.stock < quantity && (
          <p className="text-red-600 text-xs mt-1">
            ⚠️ Stock insuffisant ({item.product.stock} disponibles)
          </p>
        )}
      </div>

      {/* Contrôles quantité */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={loading || quantity <= 1}
          className="w-8 h-8 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          -
        </button>
        <span className="w-12 text-center font-semibold">{quantity}</span>
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={loading || quantity >= item.product.stock}
          className="w-8 h-8 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>

      {/* Sous-total */}
      <div className="w-28 text-right font-bold text-lg">
        {subtotal.toFixed(2)} DT
      </div>

      {/* Supprimer */}
      <button
        onClick={handleRemove}
        disabled={loading}
        className="text-red-600 hover:text-red-800 p-2 disabled:opacity-50"
        title="Supprimer"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}