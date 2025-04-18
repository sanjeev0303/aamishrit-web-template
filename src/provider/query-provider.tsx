"use client"


import { store } from "@/store/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { Provider } from "react-redux"
import { Toaster } from "sonner"

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = React.useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Toaster position="top-center" />
                {children}
            </Provider>
        </QueryClientProvider>
    )
}
