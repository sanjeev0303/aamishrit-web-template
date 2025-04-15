// api/user.ts
import { UserAddress } from "@/types";
import axios, { getAuthAxios } from "@/utils/axios";

export async function fetchUserAddress(token: string): Promise<UserAddress> {
    const authApi = await getAuthAxios(() => Promise.resolve(token));
    const res = await authApi.get("/api/address/");
    return res.data;
}

export async function createUserAddress(
    address: UserAddress,
    token?: string
): Promise<UserAddress> {
    const apiInstance = token
        ? await getAuthAxios(() => Promise.resolve(token))
        : axios;
    const res = await apiInstance.post("/api/address", address);
    return res.data;
}
