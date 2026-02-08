/*
 app/api/products/[id]/route.js
 CRUD sur un produit unique
*/

import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// ======================
// GET /api/products/:id
// ======================
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Produit introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur lors de la récupération du produit." },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/products/:id
// ======================
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // Validation minimale
    const title = body.title?.trim();
    const description = body.description?.trim();
    const price =
      body.price !== undefined ? Number(body.price) : undefined;
    const stock =
      body.stock !== undefined ? Number(body.stock) : undefined;
    const categoryId =
      body.categoryId !== undefined ? body.categoryId : undefined;
    const imageUrl =
      body.imageUrl !== undefined
        ? body.imageUrl?.trim() || null
        : undefined;
    const isActive =
      body.isActive !== undefined ? Boolean(body.isActive) : undefined;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(price !== undefined && !Number.isNaN(price)
          ? { price }
          : {}),
        ...(stock !== undefined && !Number.isNaN(stock)
          ? { stock }
          : {}),
        ...(categoryId !== undefined ? { categoryId } : {}),
        ...(imageUrl !== undefined ? { imageUrl } : {}),
        ...(isActive !== undefined ? { isActive } : {}),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur lors de la mise à jour du produit." },
      { status: 500 }
    );
  }
}

// ======================
// DELETE /api/products/:id
// ======================
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Produit supprimé." });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur lors de la suppression du produit." },
      { status: 500 }
    );
  }
}
