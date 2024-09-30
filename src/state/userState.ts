import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const useUserState: any = create(
    persist(
        (set) => ({
            user: {},
            setUserStore: (user: any) => set({ user }),
            clearUserStore: () => set({ user: {} }),
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useUserState
