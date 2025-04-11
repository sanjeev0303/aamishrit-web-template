// src/hooks/useProductById.ts
import { useQuery } from "@tanstack/react-query"
import { getProductById } from "@/https/api"
import { Product } from "@/types"

export function useProductById(id: string) {
    return useQuery<Product>({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        enabled: !!id,
    })
}
