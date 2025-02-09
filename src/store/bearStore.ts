import { create } from "zustand";
import { persist } from "zustand/middleware";

type TBearStoreState = {
  bears: number;
  color: string;
  size: string;
  increasePopulation: () => void;
  removeAllBears: () => void;
  reset: () => void;
};

export const useBearStore = create<TBearStoreState>()(
  persist(
    (set) => ({
      bears: 0,
      color: "red",
      size: "big",
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
      reset: () => {
        set((state) => ({
          bears: state.bears,
          color: "red",
          size: "big",
        }));
      },
    }),
    {
      name: "bear store",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["size", "color"].includes(key)
          )
        ),
    }
  )
);
