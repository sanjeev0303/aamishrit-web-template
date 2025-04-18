import axios from "@/utils/axios"
import { Product } from "@/types"

export async function getAllProducts(): Promise<Product[]> {
    const res = await axios.get("/api/products")
    return res.data
}

export async function getProductsById(id: string | number): Promise<Product> {
    const res = await axios.get(`/api/products/${id}`)
    const data = res.data
    return data
}
