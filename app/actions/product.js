// app/actions/products.js
"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

// Utility to create a slug
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-")     // spaces -> dashes
    .replace(/-+/g, "-");     // multiple dashes -> single dash
}

// ======================
// Create a product
// ======================
export async function createProduct(formData) {
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock") || 0);

  if (!title || !description || Number.isNaN(price)) {
    throw new Error("Champs invalides : title, description et price sont obligatoires.");
  }

  const slug = slugify(title);

  await prisma.product.create({
    data: {
      title,
      slug,
      description,
      price,
      stock: Number.isNaN(stock) ? 0 : stock,
      isActive: true,
    },
  });

  // Revalidate server cache for the products page
  revalidatePath("/products");
}
