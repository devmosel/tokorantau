import "server-only";
import type { Category, Meta, Paginated, Product } from "@/types/api";
import { ApiError, apiRequest } from "./client";

export interface ProductQuery {
  page?: number;
  limit?: number;
  categoryId?: string;
  q?: string;
}

export async function getProducts(query: ProductQuery = {}): Promise<Paginated<Product>> {
  const { data, meta } = await apiRequest<Product[]>("/products", { query: { ...query } });
  return { items: data, meta: meta as Meta };
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await apiRequest<Category[]>("/categories");
  return data;
}

/** Returns null when the product is missing or no longer sold (the API answers 404). */
export async function getProduct(id: string): Promise<Product | null> {
  try {
    const { data } = await apiRequest<Product>(`/products/${id}`);
    return data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}