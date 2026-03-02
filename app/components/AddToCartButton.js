"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addToCart } from "@/app/actions/cart";

export default function AddToCartButton({ productId, disabled = false }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAddToCart() {
    // Vérifier si connecté
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=" + window.location.pathname);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result = await addToCart(productId, 1);

      if (result.success) {
        setMessage("✓ Ajouté au panier !");
        setTimeout(() => setMessage(""), 2000);
      } else {
        setMessage(result.error || "Erreur");
      }
    } catch (error) {
      setMessage("Erreur lors de l'ajout");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={loading || status === "loading" || disabled}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Ajout en cours..." : disabled ? "Rupture de stock" : "Ajouter au panier"}
      </button>

      {message && (
        <p className={`text-center mt-2 ${message.includes("✓") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}