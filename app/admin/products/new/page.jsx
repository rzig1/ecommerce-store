"use client";

/*
 app/admin/products/new/page.jsx
 Formulaire simple pour créer un produit via /api/products
 - Récupère les catégories depuis /api/categories
 - Envoie le produit en POST
*/

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Charger les catégories
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }
    load();
  }, []);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      categoryId: form.categoryId || null,
      imageUrl: form.imageUrl || null,
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setMessage(err.message || "Erreur lors de la création.");
      setLoading(false);
      return;
    }

    setMessage("Produit créé avec succès.");
    setLoading(false);

    // Redirection après 1.5s
    setTimeout(() => {
      router.push("/admin/products");
    }, 1500);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight 
                       bg-[linear-gradient(135deg,var(--foreground),rgba(59,130,246,0.6),var(--foreground))]
                       bg-clip-text text-transparent mb-4">
          Créer un Nouveau Produit
        </h1>
        <p className="text-lg text-gray-400">
          Ajoutez un produit à votre catalogue via l&apos;API
        </p>
      </div>

      {/* Formulaire */}
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden
                       bg-[linear-gradient(135deg,var(--background),#122130,var(--background))]
                       shadow-2xl border border-gray-800/50 p-8">
          
          {/* Message de succès/erreur */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl flex items-start gap-3
                          ${message.includes('succès') 
                            ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20' 
                            : 'bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20'}`}>
              <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${message.includes('succès') ? 'text-green-400' : 'text-red-400'}`} 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {message.includes('succès') ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                )}
              </svg>
              <span className={message.includes('succès') ? 'text-green-300' : 'text-red-300'}>
                {message}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Titre du produit *
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full bg-gray-900/50 border border-gray-700 
                         rounded-xl px-4 py-3
                         text-gray-100 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-300"
                placeholder="Ex: Smartphone Galaxy S24"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                className="w-full bg-gray-900/50 border border-gray-700 
                         rounded-xl px-4 py-3
                         text-gray-100 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-300
                         resize-none"
                placeholder="Décrivez votre produit en détail..."
                required
              />
            </div>

            {/* Prix et Stock - Grid 2 colonnes */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Prix */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Prix (TND) *
                </label>
                <div className="relative">
                  <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    type="number"
                    step="0.01"
                    className="w-full bg-gray-900/50 border border-gray-700 
                             rounded-xl px-4 py-3 pl-10
                             text-gray-100 placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-300"
                    placeholder="0.00"
                    required
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Stock disponible *
                </label>
                <div className="relative">
                  <input
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    type="number"
                    className="w-full bg-gray-900/50 border border-gray-700 
                             rounded-xl px-4 py-3 pl-10
                             text-gray-100 placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-300"
                    placeholder="0"
                    required
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    
                  </div>
                </div>
              </div>
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Catégorie
              </label>
              <div className="relative">
                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 
                           rounded-xl px-4 py-3 pl-10
                           text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-300
                           appearance-none cursor-pointer"
                >
                  <option value="">Aucune catégorie</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  
                </div>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                URL de l&apos;image
              </label>
              <div className="relative">
                <input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  type="url"
                  className="w-full bg-gray-900/50 border border-gray-700 
                           rounded-xl px-4 py-3 pl-10
                           text-gray-100 placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-300"
                  placeholder="https://example.com/image.jpg"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Optionnel - Laissez vide pour utiliser l&apos;image par défaut
              </p>
            </div>

            {/* Bouton Submit */}
            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="w-full 
                         bg-gradient-to-r from-blue-600 to-indigo-600
                         hover:from-blue-700 hover:to-indigo-700
                         disabled:from-gray-600 disabled:to-gray-700
                         disabled:cursor-not-allowed
                         text-white px-8 py-4 rounded-xl 
                         font-bold text-lg 
                         shadow-lg hover:shadow-2xl
                         transform hover:scale-[1.02]
                         disabled:transform-none
                         transition-all duration-300
                         flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création en cours...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 4v16m8-8H4" />
                    </svg>
                    Créer le Produit
                  </>
                )}
              </button>
            </div>

            {/* Info message */}
            <div className="mt-6 p-4 rounded-xl
                          bg-gradient-to-br from-blue-500/10 to-cyan-500/10
                          border border-blue-500/20">
              <p className="text-sm text-gray-400 flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  Les produits créés via cette interface utilisent l&apos;API <code className="px-2 py-1 bg-gray-800 rounded text-blue-300">/api/products</code> pour être enregistrés dans la base de données.
                </span>
              </p>
            </div>
          </form>
        </div>

        {/* Bouton retour */}
        <div className="mt-8 text-center">
          <Link
            href="/admin/products"
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
            Retour à l&apos;administration
          </Link>
        </div>
      </div>
    </div>
  );
}