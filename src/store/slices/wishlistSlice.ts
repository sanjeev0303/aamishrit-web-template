import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "@/types"

interface WishlistState {
  items: Product[]
}

// Initialize from localStorage if available
const initialState: WishlistState = {
  items:
    typeof window !== "undefined" && localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist") || "[]")
      : [],
}

// Helper function to update localStorage
const updateLocalStorage = (items: Product[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("wishlist", JSON.stringify(items))
  }
}

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const product = action.payload

      // Check if product already exists in wishlist using either ID or id property
      const existingItem = state.items.find((item) => item.ID === product.ID || item.ID === product.ID)

      if (!existingItem) {
        state.items.push(product)
        updateLocalStorage(state.items)
      }
    },

    removeFromWishlist: (state, action: PayloadAction<string | number>) => {
      const id = action.payload

      // Filter out the item with the matching ID
      state.items = state.items.filter((item) => String(item.ID || item.ID) !== String(id))

      updateLocalStorage(state.items)
    },

    clearWishlist: (state) => {
      state.items = []
      if (typeof window !== "undefined") {
        localStorage.removeItem("wishlist")
      }
    },

    // Add a method to reload wishlist from localStorage
    reloadWishlist: (state) => {
      if (typeof window !== "undefined") {
        try {
          const savedWishlist = localStorage.getItem("wishlist")
          if (savedWishlist) {
            state.items = JSON.parse(savedWishlist)
          }
        } catch (error) {
          console.error("Error loading wishlist from localStorage:", error)
          // If there's an error, clear the wishlist
          state.items = []
          localStorage.removeItem("wishlist")
        }
      }
    },
  },
})

export const { addToWishlist, removeFromWishlist, clearWishlist, reloadWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer
