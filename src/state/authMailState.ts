import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const useEmailState: any = create(
    persist(
        (set) => ({
            email: "",
            setEmailStore: (text: String) => set({ email: text }),
            clearEmailStore: () => set({ email: "" }),
        }),
        {
            name: "mail-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useEmailState
