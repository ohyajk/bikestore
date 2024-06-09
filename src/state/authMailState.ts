import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


const useEmailState: any = create(
  persist(
    (set) => ({
      email: '',
      setEmail: (text: String) => set({ email: text }),
        clearEmail: () => set({ email: '' }),
    }),
    {
      name: 'mail-storage',
      storage: createJSONStorage(() => sessionStorage), 
    },
  ),
)

export default useEmailState