import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "@/types"

interface CartState {
  isOpen: boolean
  items: Product[]
}

const initialState: CartState = {
  isOpen: false,
  items:
    typeof window !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") as string)
      : [],
}

const updateLocalStorage = (items: Product[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(items))
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload
      const existingItemIndex = state.items.findIndex((item) => item.ID === product.ID || item.ID === product.ID)

      if (existingItemIndex >= 0) {
        // Increment quantity if item already exists
        const newQuantity = (state.items[existingItemIndex].quantity || 1) + (product.quantity || 1)
        state.items[existingItemIndex].quantity = Math.min(newQuantity, product.stock || 100)
      } else {
        // Add new item with specified quantity or default to 1
        state.items.push({
          ...product,
          quantity: product.quantity || 1,
        })
      }

      updateLocalStorage(state.items)
    },

    removeFromCart: (state, action: PayloadAction<string | number>) => {
      const id = action.payload
      state.items = state.items.filter((item) => String(item.ID || item.ID) !== String(id))

      updateLocalStorage(state.items)
    },

    updateQuantity: (state, action: PayloadAction<{ id: string | number; quantity: number }>) => {
      const { id, quantity } = action.payload

      // Find the item using both possible ID properties
      const itemIndex = state.items.findIndex((item) => String(item.ID || item.ID) === String(id))

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter((item) => String(item.ID || item.ID) !== String(id))
        } else {
          // Update quantity
          state.items[itemIndex].quantity = quantity
        }

        updateLocalStorage(state.items)
      }
    },

    clearCart: (state) => {
      state.items = []
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart")
      }
    },

    openCart: (state) => {
      state.isOpen = true
    },

    closeCart: (state) => {
      state.isOpen = false
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },

    setCartItems: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload
      updateLocalStorage(state.items)
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, openCart, closeCart, toggleCart, setCartItems } =
  cartSlice.actions

export default cartSlice.reducer
