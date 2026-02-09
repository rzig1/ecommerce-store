# 🛒 E-Commerce Store - Next.js Full-Stack

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?style=for-the-badge&logo=next.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=for-the-badge&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)

> Application e-commerce full-stack moderne construite avec Next.js 16, Prisma ORM et PostgreSQL.  
> Projet réalisé dans le cadre du module **Framework Frontend II** - Master 1 SWM - ISITCOM (2025-2026).

## 📋 Table des Matières

- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [API Routes](#-api-routes)
- [Base de Données](#-base-de-données)
- [Déploiement](#-déploiement)
- [Difficultés Résolues](#-difficultés-résolues)
- [Roadmap](#-roadmap)
- [Auteur](#-auteur)

## 🎯 Aperçu

Cette application démontre la création d'un système e-commerce complet en utilisant les dernières fonctionnalités de Next.js 16 :

- **App Router** avec Server Components
- **Route Handlers** pour les API REST
- **Server Actions** pour les formulaires
- **Prisma ORM** pour la gestion de la base de données
- **PostgreSQL** conteneurisé avec Docker
- **ISR** (Incremental Static Regeneration)
- **Tailwind CSS** pour le design moderne

### 📸 Captures d'écran
```
[Insérer vos screenshots ici]
```

## ✨ Fonctionnalités

### ✅ Implémentées (Séances 2 & 3)

- [x] Catalogue produits dynamique depuis l'API FakeStore
- [x] Pages détaillées pour chaque produit (SSG + ISR)
- [x] Base de données PostgreSQL avec Prisma
- [x] CRUD complet pour les produits
- [x] CRUD complet pour les catégories
- [x] Interface admin de création de produits
- [x] Server Actions pour les formulaires
- [x] Loading states avec skeletons animés
- [x] Error handling robuste
- [x] SEO optimisé (metadata dynamique)
- [x] Design responsive et moderne

### 🚧 À venir (Séance 4)

- [ ] Authentification (NextAuth / Auth.js)
- [ ] Gestion des rôles (ADMIN / USER)
- [ ] Panier d'achat fonctionnel
- [ ] Système de commandes
- [ ] Paiement (Stripe)
- [ ] Dashboard admin avancé

## 🛠 Technologies

### Frontend
- **Next.js 16.1.4** - Framework React avec App Router
- **React 18+** - Bibliothèque UI
- **Tailwind CSS 3** - Framework CSS utility-first
- **TypeScript** (optionnel)

### Backend
- **Next.js API Routes** - Route Handlers
- **Server Actions** - Actions serveur
- **Prisma 5** - ORM moderne
- **PostgreSQL 16** - Base de données relationnelle

### DevOps
- **Docker** - Conteneurisation PostgreSQL
- **Git** - Versioning
- **Vercel** - Déploiement (recommandé)

## 🏗 Architecture
```
ecommerce-store/
├── app/
│   ├── api/                    # API Routes (REST)
│   │   ├── products/
│   │   │   ├── route.js        # GET/POST produits
│   │   │   └── [id]/
│   │   │       └── route.js    # GET/PUT/DELETE produit
│   │   └── categories/
│   │       └── route.js        # CRUD catégories
│   ├── admin/                  # Interface admin
│   │   └── products/
│   │       ├── new/
│   │       │   └── page.jsx    # Formulaire client
│   │       └── new-action/
│   │           └── page.jsx    # Server Action
│   ├── products/               # Pages publiques
│   │   ├── page.jsx            # Liste produits
│   │   ├── loading.js          # Loading state
│   │   ├── error.js            # Error boundary
│   │   └── [id]/
│   │       ├── page.js         # Détail produit
│   │       ├── loading.js
│   │       ├── error.js
│   │       └── not-found.js
│   ├── layout.js               # Layout principal
│   ├── page.js                 # Page d'accueil
│   └── globals.css
├── lib/
│   └── prisma.js               # Singleton Prisma
├── actions/
│   └── products.js             # Server Actions
├── prisma/
│   ├── schema.prisma           # Schéma DB
│   ├── seed.js                 # Seed données
│   └── migrations/
├── public/
├── .env                        # Variables d'environnement
├── next.config.js
├── tailwind.config.js
└── package.json
```

## 📦 Installation

### Prérequis

- Node.js 18+ LTS
- npm ou yarn
- Docker Desktop (recommandé)
- Git

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/rzig1/ecommerce-store.git
cd ecommerce-store
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer PostgreSQL avec Docker**
```bash
docker run --name isitcom-postgres \
  -e POSTGRES_USER=isitcom \
  -e POSTGRES_PASSWORD=isitcom123 \
  -e POSTGRES_DB=isitcom_shop \
  -p 5432:5432 \
  -d postgres:16
```

4. **Configurer les variables d'environnement**

Créer un fichier `.env` à la racine :
```env
DATABASE_URL="postgresql://isitcom:isitcom123@localhost:5432/isitcom_shop"
NODE_ENV=development
```

5. **Initialiser Prisma**
```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

6. **Lancer le serveur de développement**
```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) 🚀

## ⚙️ Configuration

### Variables d'Environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URL` | URL de connexion PostgreSQL | `postgresql://user:pass@localhost:5432/db` |
| `NODE_ENV` | Environnement d'exécution | `development` / `production` |
| `NEXTAUTH_URL` | URL de l'app (pour auth) | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Secret pour NextAuth | `your-secret-key` |

### Prisma Studio

Pour visualiser et gérer la base de données graphiquement :
```bash
npx prisma studio
```

Accessible sur [http://localhost:5555](http://localhost:5555)

## 🚀 Utilisation

### Développement
```bash
# Lancer en mode développement
npm run dev

# Lancer PostgreSQL
docker start isitcom-postgres

# Ouvrir Prisma Studio
npx prisma studio

# Créer une nouvelle migration
npx prisma migrate dev --name migration_name

# Regénérer le client Prisma
npx prisma generate

# Re-seed la base de données
npx prisma db seed
```

### Production
```bash
# Build de production
npm run build

# Lancer en production
npm start
```

## 🔌 API Routes

### Produits

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/products` | Liste tous les produits |
| `POST` | `/api/products` | Créer un produit |
| `GET` | `/api/products/:id` | Récupérer un produit |
| `PUT` | `/api/products/:id` | Mettre à jour un produit |
| `DELETE` | `/api/products/:id` | Supprimer un produit |

### Catégories

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/categories` | Liste toutes les catégories |
| `POST` | `/api/categories` | Créer une catégorie |

### Exemples d'utilisation

**Créer un produit :**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nouveau Produit",
    "description": "Description du produit",
    "price": 99.99,
    "stock": 10,
    "categoryId": "cat_123"
  }'
```

**Récupérer tous les produits :**
```bash
curl http://localhost:3000/api/products
```

## 💾 Base de Données

### Schéma Prisma

Le projet utilise 6 modèles principaux :

- **User** - Utilisateurs (préparation auth)
- **Category** - Catégories de produits
- **Product** - Produits du catalogue
- **CartItem** - Articles du panier
- **Order** - Commandes
- **OrderItem** - Détails des commandes

### Migrations
```bash
# Créer une migration
npx prisma migrate dev --name description

# Appliquer les migrations
npx prisma migrate deploy

# Reset la base de données (ATTENTION: supprime tout)
npx prisma migrate reset
```

### Seed

Le fichier `prisma/seed.js` contient des données de test :
- 3 catégories (Vêtements, Électronique, Accessoires)
- 3 produits avec images
```bash
npx prisma db seed
```

## 🌐 Déploiement

### Vercel (Recommandé)

1. **Pusher sur GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connecter à Vercel**

- Aller sur [vercel.com](https://vercel.com)
- Importer le repository GitHub
- Configurer les variables d'environnement

3. **Configurer PostgreSQL**

Utiliser un service comme :
- [Neon](https://neon.tech/) (recommandé)
- [Supabase](https://supabase.com/)
- [Railway](https://railway.app/)

4. **Déployer** ✨

Vercel déploie automatiquement à chaque push !

### Variables d'environnement Vercel

Ajouter dans les paramètres du projet :
```
DATABASE_URL=postgresql://...
NODE_ENV=production
```

## 🐛 Difficultés Résolues

### 1. Params en tant que Promise (Next.js 15+)

**Problème :** `params.id` génère une erreur

**Solution :**
```javascript
// ❌ Incorrect
const product = await getProductById(params.id);

// ✅ Correct
const resolvedParams = await params;
const product = await getProductById(resolvedParams.id);
```

### 2. Type OpenGraph invalide

**Problème :** `type: 'product'` non supporté

**Solution :**
```javascript
openGraph: {
  type: 'website', // Utiliser 'website' au lieu de 'product'
}
```

### 3. Trop de connexions Prisma

**Problème :** Hot Module Replacement crée trop de connexions

**Solution :** Utiliser un singleton dans `lib/prisma.js`

### 4. Configuration images Next.js

**Problème :** Images externes non chargées

**Solution :**
```javascript
// next.config.js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'fakestoreapi.com',
    },
  ],
}
```

## 🗺 Roadmap

### Phase 1 : Fondations ✅
- [x] Setup Next.js + Tailwind
- [x] Catalogue depuis FakeStore API
- [x] Pages dynamiques produits
- [x] SEO et metadata

### Phase 2 : Backend ✅
- [x] PostgreSQL + Docker
- [x] Prisma ORM
- [x] API Routes CRUD
- [x] Server Actions
- [x] Interface admin

### Phase 3 : Authentication 🚧 (En cours)
- [ ] NextAuth.js
- [ ] Rôles ADMIN/USER
- [ ] Protection des routes
- [ ] Middleware

### Phase 4 : E-Commerce 📅 (Prévu)
- [ ] Panier fonctionnel
- [ ] Système de commandes
- [ ] Paiement Stripe
- [ ] Gestion des stocks

### Phase 5 : Optimisations 📅 (Futur)
- [ ] Cache avancé
- [ ] Recherche et filtres
- [ ] Pagination
- [ ] Dashboard analytics

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Cours ISITCOM](https://github.com/isitcom)

## 👤 Auteur

**AbdelHedi Rziga**
- Master 1 SWM - ISITCOM
- GitHub: [@rzig1](https://github.com/rzig1)
- Projet: [ecommerce-store](https://github.com/rzig1/ecommerce-store)

## 📄 Licence

Ce projet est réalisé dans un cadre pédagogique - ISITCOM 2025-2026

---

<div align="center">

**⭐ Si ce projet vous a été utile, n'hésitez pas à lui donner une étoile ! ⭐**

Fait avec ❤️ par AbdelHedi Rziga

</div>
