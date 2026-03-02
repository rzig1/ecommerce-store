import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

// Récupérer la session côté serveur
export async function getSession() {
  return await getServerSession(authOptions);
}

// Vérifier que l'utilisateur est connecté
export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return session;
}

// Vérifier que l'utilisateur a le role ADMIN
export async function requireAdmin() {
  const session = await requireAuth();

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return session;
}

// Vérifier un role spécifique
export async function requireRole(role) {
  const session = await requireAuth();

  if (session.user.role !== role) {
    redirect("/unauthorized");
  }

  return session;
}