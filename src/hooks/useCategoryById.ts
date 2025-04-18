import { getCategoryById } from "@/api/category";
import { useQuery } from "@tanstack/react-query";

export function useCategory(id: string | number) {
    return useQuery({
        queryKey: ["category", id],
        queryFn: () => getCategoryById(id),
        enabled: !!id, // prevents firing query with empty id
    });
}
