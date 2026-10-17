import "server-only";
import type { Category, Meta, Paginated, Product, ProductInput } from "@/types/api";
import { adminRequest } from "./request";

export async function getAdminCategories(): Promise<Category[]> {
  const { data } = await adminRequest<Category[]>("/admin/categories");
  return data;
}

export async function createCategory(input: { name: string; description?: string }) {
  await adminRequest("/admin/categories", { method: "POST", body: input });
}

export async function updateCategory(id: string, input: { name?: string; description?: string }) {
  await adminRequest(`/admin/categories/${id}`, { method: "PUT", body: input });
}

export async function deleteCategory(id: string) {
  await adminRequest(`/admin/categories/${id}`, { method: "DELETE" });
}

export async function getAdminProducts(
  query: { page?: number; limit?: number; categoryId?: string; q?: string } = {},
): Promise<Paginated<Product>> {
  const { data, meta } = await adminRequest<Product[]>("/admin/products", { query });
  return { items: data, meta: meta as Meta };
}

export async function getAdminProduct(id: string): Promise<Product> {
  const { data } = await adminRequest<Product>(`/admin/products/${id}`);
  return data;
}

export async function createProduct(input: ProductInput) {
  await adminRequest("/admin/products", { method: "POST", body: input });
}

export async function updateProduct(id: string, input: Partial<ProductInput>) {
  await adminRequest(`/admin/products/${id}`, { method: "PUT", body: input });
}

export async function deleteProduct(id: string) {
  await adminRequest(`/admin/products/${id}`, { method: "DELETE" });
}
