/*
 app/api/categories/route.js
 - GET : liste des catégories
 - POST : création d'une catégorie
*/

import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma"

// Fonction utilitaire pour créer un slug
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // supprime caractères spéciaux
    .replace(/\s+/g, "-")     // espaces -> tirets
    .replace(/-+/g, "-");     // plusieurs tirets -> un seul
}

// ======================
// GET /api/categories
// ======================
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur lors de la récupération des catégories." },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/categories
// ======================
export async function POST(request) {
  try {
    const body = await request.json();
    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json(
        { message: "Le nom de la catégorie est obligatoire." },
        { status: 400 }
      );
    }

    const slug = body.slug?.trim() || slugify(name);

    const created = await prisma.category.create({
      data: { name, slug },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur lors de la création de la catégorie." },
      { status: 500 }
    );
  }
}
