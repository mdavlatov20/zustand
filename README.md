# **Zustand Darslari**

---

## **1-dars umumiy tanishuv va BearBox dasturi**

`src/store/bearStore.tsx`

```tsx
import { create } from "zustand";

type TBearStoreState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

export const useBearStore = create<TBearStoreState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
```

- `TBearStoreState` bu oddiy type berish loyihda typescript bo'lganligi uchun
- `useBearStore` store yaratish va uni export qilish boshqa componentlarga chaqirilganda shu nomdan foydalaniladi
- `bears: 0` boshlang'ich qiymat
- `increasePopulation: () => set((state) => ({ bears: state.bears + 1 }))` `set` funksiyasi orqali `bears` sonini bittaga oshiradi.
- `removeAllBears: () => set({ bears: 0 })` `bears` sonini `0` ga tushiradi.

`src/components/BearBox.tsx`

```tsx
import { useBearStore } from "../store/bearStore";

export default function BearBox() {
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  const removeAllBears = useBearStore((state) => state.removeAllBears);

  return (
    <div className="box">
      <h1>Bear Box</h1>
      <p>Bears: {bears}</p>
      <div>
        <button onClick={increasePopulation}>add bear</button>
        <button onClick={removeAllBears}>remove bear</button>
      </div>
    </div>
  );
}
```

- `useBearStore` ni chaqirish va undagi funksiyalardan foydalanish
