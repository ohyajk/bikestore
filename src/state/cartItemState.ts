import { create } from 'zustand'
import { Bike } from '../types/types'
import { createJSONStorage, persist } from 'zustand/middleware'

interface cartState {
  items: Bike[],
  addItem: (data: Bike) => void,
  removeItem: (id: string) => void,
  clearCart: () => void
}

const useCartItemState = create<cartState>()(
persist<cartState>((set) => ({
  items: [],
    addItem: (data: Bike) => set((state) => ({ items: [...state.items, data] })),
    removeItem: (id: string) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    clearCart: () => set({ items: [] })
}),
{
  name: 'cart-item-storage',
  storage: createJSONStorage(() => localStorage)
}
)
)

export default useCartItemState