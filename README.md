# **Zustand Darslari**

---

## **📌 1-dars umumiy tanishuv va BearBox dasturi**

`src/store/bearStore.ts`

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

`src/components/BearBox.ts`

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

---

## **📌 2-dars Object bilan ishlash**

`src/store/catStore.ts`

```tsx
type TCatStoreState = {
  cats: {
    bigCats: number;
    smallCats: number;
  };
  increaseBigCats: () => void;
  increaseSmallCats: () => void;
};
```

- `useCatStore` hooki uchun type

`src/store/catStore.ts`

```tsx
export const useCatStore = create<TCatStoreState>((set) => ({
  cats: {
    bigCats: 0,
    smallCats: 0,
  },

  increaseBigCats: () =>
    set((state) => ({
      cats: {
        ...state.cats,
        bigCats: state.cats.bigCats + 1,
      },
    })),

  increaseSmallCats: () =>
    set((state) => ({
      cats: {
        ...state.cats,
        smallCats: state.cats.smallCats + 1,
      },
    })),
}));
```

- `useCatStore` hooki
- `set` qiymatni yangilash uchun ishlatiladi
- `...state.cats` `cats` objectining barcha oldingi qiymatlarini nusxalaydi
- `bigCats: state.cats.bigCats + 1` va `smallCats: state.cats.smallCats + 1` `bigCats` va `smallCats` qiymatlarini yangilaydi

### **2.2-dars yuqoridagi jarayonni oldingi qiymatlarni nusxalamasdan qilish mumkin lekin buning uchun immer dan foydalanish kerak**

```
npm install immer

```

- immer kutubxonasini o'rnatish

```
import { immer } from "zustand/middleware/immer";
```

- uni import qilish

`src/store/catStore.ts`

```ts
export const useCatStore = create<TCatStoreState>()(
  immer((set) => ({
    cats: {
      bigCats: 0,
      smallCats: 0,
    },

    increaseBigCats: () => {
      set((state) => {
        state.cats.bigCats++;
      });
    },

    increaseSmallCats: () => {
      set((state) => {
        state.cats.smallCats++;
      });
    },
  }))
);
```

- undan foydalanish

`src/store/catStore.ts`

```ts
type TCatStoreState = {
  cats: {
    bigCats: number;
    smallCats: number;
  };
  increaseBigCats: () => void;
  increaseSmallCats: () => void;
  summary: () => void;
};

export const useCatStore = create<TCatStoreState>()(
  immer((set, get) => ({
    cats: {
      bigCats: 0,
      smallCats: 0,
    },

    increaseBigCats: () => {
      set((state) => {
        state.cats.bigCats++;
      });
    },

    increaseSmallCats: () => {
      set((state) => {
        state.cats.smallCats++;
      });
    },

    summary: () => {
      const total = get().cats.bigCats + get().cats.smallCats;
      return `There are ${total} cats in total.`;
    },
  }))
);
```

- `get` funksiyasi ushbu kodda har doim `cats` obyektining eng oxirgi (so‘nggi) qiymatlarini oladi va saqlamaydi. U `state` ni o‘zgartirmaydi, faqat oxirgi holatini qaytaradi. `set` ishlatib `state` ni yangilab bo‘lmaydigan funksiyalar ichida, mavjud ma’lumotlarni olish uchun ishlatiladi.

---

## **📌 3-dars Selector bilan ishlash**

### **Selectors’ning asosiy vazifasi**

- Zustand’da barcha state’ni emas, balki faqat kerakli qismini olish uchun selectors ishlatiladi.
- Katta state obyektidan faqat kerakli ma’lumotni olish
- Re-renderni kamaytirish (keraksiz komponentlarni qayta render qilishni oldini olish)
- Kodning o‘qilishi va ishlashini tezlashtirish

`src/utils/createSelector.ts`

```ts
import { StoreApi, UseBoundStore } from "zustand";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};
```

- `Zustand` da `selectors` bilan ishlash uchun ushbu fayl bo'lishi kerak

`src/store/catStore.ts`

```ts
export const useCatStore = createSelectors(
  create<TCatStoreState>()(
    immer((set, get) => ({
      cats: {
        bigCats: 0,
        smallCats: 0,
      },

      increaseBigCats: () => {
        set((state) => {
          state.cats.bigCats++;
        });
      },

      increaseSmallCats: () => {
        set((state) => {
          state.cats.smallCats++;
        });
      },

      summary: () => {
        const total = get().cats.bigCats + get().cats.smallCats;
        return `There are ${total} cats in total.`;
      },
    }))
  )
);
```

- `zustan` da `store` ni `selector` bilan yaratish
- `createSelectors` bu selector

`src/components/CatController/tsx`

```tsx
import { useCatStore } from "../store/catStore";

export default function CatController() {
  const increaseBigCats = useCatStore.use.increaseBigCats();
  const increaseSmallCats = useCatStore.use.increaseSmallCats();

  return (
    <div className="box">
      <h1>Cat Controller</h1>
      <p>{Math.random()}</p>

      <div>
        <button onClick={increaseBigCats}>Add Big Cats</button>
        <button onClick={increaseSmallCats}>Add Small Cats</button>
      </div>
    </div>
  );
}
```

- `selectors` orqali `store` dagi funksiyalarni alohida componntga chaqirish

## **📌 4-dars Devtools bilan ishlash**

```ts
export const useBearStore = create<TBearStoreState>()(
  devtools(
    (set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }),
    { enabled: true, name: "Bear Store" }
  )
);
```

- `redux-devtools` dan foydalanib statelarni kuzatish uchun devtools bilan o'rash kerak
