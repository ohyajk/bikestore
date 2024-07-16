import { create } from 'zustand'
import { Bike } from '../types/types'

interface cartState {
  items: Bike[],
  addItem: (data: Bike) => void,
  removeItem: (id: string) => void
}

const useCartItemState = create<cartState>()((set) => ({
  items: [],
    addItem: (data) => set((state) => ({ items: [...state.items, data] })),
    removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}))

export default useCartItemState