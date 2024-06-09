import { create } from 'zustand'

interface cartState {
  menuStatus: boolean,
  menuOpen: () => void,
  menuClose: () => void
}

const useMenuState = create<cartState>()((set) => ({
  menuStatus: false,
  menuOpen: () => set(() => ({ menuStatus: true })),
  menuClose: () => set(() => ({ menuStatus: false })),
}))

export default useMenuState