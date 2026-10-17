"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifyAdminKey } from "@/lib/api/admin/request";
import {
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  updateCategory,
  updateProduct,
} from "@/lib/api/admin/catalog";
import {
  createCourier,
  deleteCourier,
  setOrderStatus,
  setShipment,
  setShippingCost,
  updateCourier,
} from "@/lib/api/admin/fulfilment";
import { runAction } from "@/lib/actions";
import { clearAdminKey, setAdminKey } from "@/lib/auth/session";
import { ROUTES } from "@/lib/routes";
import type { ActionState } from "@/types/actions";
import type { OrderStatus } from "@/types/api";

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();

/** Every admin mutation refreshes both the admin pages and the public storefront. */
function refresh() {
  revalidatePath("/", "layout");
}

/** Runs an admin mutation, refreshes cached pages, and reports `success` text. */
function mutate(body: () => Promise<void>, success?: string): Promise<ActionState> {
  return runAction(async () => {
    await body();
    refresh();
    return success ? { success } : {};
  });
}

export async function adminLoginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const key = String(formData.get("key") ?? "").trim();
  if (!key) return { error: "Admin key is required." };

  return runAction(async () => {
    if (!(await verifyAdminKey(key))) return { error: "Missing or invalid admin key." };
    await setAdminKey(key);
    redirect(ROUTES.admin.dashboard);
  });
}

export async function adminLogoutAction(): Promise<void> {
  await clearAdminKey();
  redirect(ROUTES.admin.login);
}

// Categories

export async function saveCategoryAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = text(formData, "id");
  const input = { name: text(formData, "name"), description: text(formData, "description") };
  return id
    ? mutate(() => updateCategory(id, input), "Category updated")
    : mutate(() => createCategory(input), "Category added");
}

export async function deleteCategoryAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  return mutate(() => deleteCategory(text(formData, "id")));
}

// Products

export async function saveProductAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = text(formData, "id");
  const input = {
    name: text(formData, "name"),
    description: text(formData, "description"),
    price: Number(text(formData, "price")),
    stock: Number(text(formData, "stock")),
    categoryId: text(formData, "categoryId"),
    images: text(formData, "images")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean),
    isActive: formData.get("isActive") === "on",
  };

  return runAction(async () => {
    if (id) await updateProduct(id, input);
    else await createProduct(input);
    refresh();
    redirect(ROUTES.admin.products);
  });
}

export async function deleteProductAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  return mutate(() => deleteProduct(text(formData, "id")));
}

// Orders

export async function shippingCostAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const cost = Number(text(formData, "shippingCost"));
  return mutate(() => setShippingCost(text(formData, "orderId"), cost), "Shipping cost saved");
}

export async function shipmentAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  return mutate(
    () => setShipment(text(formData, "orderId"), text(formData, "courierId"), text(formData, "trackingNumber")),
    "Shipment saved",
  );
}

export async function orderStatusAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  return mutate(() => setOrderStatus(text(formData, "orderId"), text(formData, "status") as OrderStatus));
}

// Couriers

export async function saveCourierAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = text(formData, "id");
  const name = text(formData, "name");
  const code = text(formData, "code");
  return id
    ? mutate(() => updateCourier(id, { name, code, isActive: formData.get("isActive") === "on" }), "Courier updated")
    : mutate(() => createCourier({ name, code }), "Courier added");
}

export async function deleteCourierAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  return mutate(() => deleteCourier(text(formData, "id")));
}
