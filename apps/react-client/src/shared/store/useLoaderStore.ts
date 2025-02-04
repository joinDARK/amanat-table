import { create } from "zustand"

interface ILoaderStore {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
}

const useLoaderStore = create<ILoaderStore>((set) => ({
  isLoading: false,
  setIsLoading: (state: boolean) => set({
    isLoading: state,
  }),
}))

export default useLoaderStore