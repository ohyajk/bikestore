import { create } from 'zustand'

interface cartState {
  status: boolean,
  open: () => void,
  close: () => void
}

const useCartState = create<cartState>()((set) => ({
  status: false,
  open: () => set(() => ({ status: true })),
  close: () => set(() => ({ status: false })),
}))

export default useCartState