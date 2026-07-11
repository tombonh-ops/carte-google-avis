"use server";

import { revalidatePath } from "next/cache";
import type { ActionState } from "@/lib/action-state";
import { isValidGoogleReviewUrl, normalizeSlug } from "@/lib/merchants";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type MerchantInput = {
  business_name: string;
  slug: string;
  google_review_url: string;
  is_active: boolean;
};

function readMerchantForm(formData: FormData): MerchantInput | ActionState {
  const businessName = String(formData.get("business_name") ?? "").trim();
  const slug = normalizeSlug(String(formData.get("slug") ?? ""));
  const googleReviewUrl = String(formData.get("google_review_url") ?? "").trim();
  const isActive = formData.get("is_active") === "on";

  if (businessName.length < 2 || businessName.length > 120) {
    return { status: "error", message: "Le nom doit contenir entre 2 et 120 caractères." };
  }

  if (!slug || slug.length > 80) {
    return { status: "error", message: "Le slug est vide ou trop long." };
  }

  if (!isValidGoogleReviewUrl(googleReviewUrl)) {
    return { status: "error", message: "Saisissez une URL HTTPS Google Avis valide." };
  }

  return {
    business_name: businessName,
    slug,
    google_review_url: googleReviewUrl,
    is_active: isActive,
  };
}

function databaseErrorMessage(error: { code?: string; message: string }): string {
  if (error.code === "23505") return "Ce slug est déjà utilisé par un autre commerçant.";
  return "Une erreur est survenue. Vérifiez la configuration Supabase puis réessayez.";
}

export async function addMerchant(_previousState: ActionState, formData: FormData): Promise<ActionState> {
  const input = readMerchantForm(formData);
  if ("status" in input) return input;

  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("merchants").insert(input);

    if (error) {
      console.error("Erreur lors de la création du commerçant", error);
      return { status: "error", message: databaseErrorMessage(error) };
    }

    revalidatePath("/admin");
    return { status: "success", message: "Commerçant ajouté avec succès." };
  } catch (error) {
    console.error("Configuration Supabase indisponible", error);
    return { status: "error", message: "La connexion à Supabase n’est pas configurée." };
  }
}

export async function updateMerchant(
  merchantId: string,
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const input = readMerchantForm(formData);
  if ("status" in input) return input;

  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("merchants").update(input).eq("id", merchantId);

    if (error) {
      console.error("Erreur lors de la mise à jour du commerçant", error);
      return { status: "error", message: databaseErrorMessage(error) };
    }

    revalidatePath("/admin");
    return { status: "success", message: "Modifications enregistrées." };
  } catch (error) {
    console.error("Configuration Supabase indisponible", error);
    return { status: "error", message: "La connexion à Supabase n’est pas configurée." };
  }
}

export async function toggleMerchant(formData: FormData): Promise<void> {
  const merchantId = String(formData.get("merchant_id") ?? "");
  const nextStatus = formData.get("next_status") === "true";

  if (!merchantId) return;

  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase
      .from("merchants")
      .update({ is_active: nextStatus })
      .eq("id", merchantId);

    if (error) console.error("Erreur lors du changement de statut", error);
    revalidatePath("/admin");
  } catch (error) {
    console.error("Configuration Supabase indisponible", error);
  }
}
