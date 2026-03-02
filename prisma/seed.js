// prisma/seed.js
// Remplissage initial : categories + produits

import { PrismaClient } from "@prisma/client"; 

const prisma = new PrismaClient();

async function main() {
  // Nettoyage (attention : supprime toutes les données !)
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Création des catégories
  await prisma.category.createMany({
    data: [
      { name: "Vetements", slug: "vetements" },
      { name: "Electronique", slug: "electronique" },
      { name: "Accessoires", slug: "accessoires" },
    ],
  });

  const catList = await prisma.category.findMany();

  const getCatId = (slug) => catList.find((c) => c.slug === slug)?.id;

  // Création des produits
  await prisma.product.createMany({
    data: [
      {
        title: "T-shirt noir",
        slug: "t-shirt-noir",
        description: "T-shirt 100% coton, coupe regular.",
        price: 29.9,
        stock: 50,
        imageUrl: "https://picsum.photos/seed/tshirt/800/600",
        categoryId: getCatId("vetements"),
      },
      {
        title: "Casque Bluetooth",
        slug: "casque-bluetooth",
        description: "Casque audio sans fil, réduction de bruit.",
        price: 199.0,
        stock: 15,
        imageUrl: "https://picsum.photos/seed/headphones/800/600",
        categoryId: getCatId("electronique"),
      },
      {
        title: "Sac à dos",
        slug: "sac-a-dos",
        description: "Sac robuste, idéal pour ordinateur portable.",
        price: 89.0,
        stock: 20,
        imageUrl: "https://picsum.photos/seed/bag/800/600",
        categoryId: getCatId("accessoires"),
      },
    ],
  });

  console.log("Seed terminé : catégories et produits insérés.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
