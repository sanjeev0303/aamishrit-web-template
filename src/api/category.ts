import api from "@/utils/axios";
import { Category } from "@/types";

export async function getAllCategories(): Promise<Category[]> {
    try {
        const res = await api.get("/categories");
        return res.data;
    } catch (err: any) {
        throw new Error(err?.response?.data?.message || "Failed to fetch categories")
    }
}

export async function getCategoryById(id: string | number): Promise<Category | null> {
    try {
        const res = await api.get(`/categories/${id}`);
        return res.data;
    } catch (err: any) {
        throw new Error(err?.response?.data?.message || `Failed to fetch category ${id}`);
    }
}
