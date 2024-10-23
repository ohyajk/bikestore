import {create} from 'zustand';

const useBikeStore: any = create((set : any) => ({
  bikes: [],
  setBikes: (bikes : any) => set({ bikes }),
}));

export default useBikeStore;