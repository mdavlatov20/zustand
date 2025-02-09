import { useCatStore } from "../store/catStore";

export default function CatBox() {
  const bigCats = useCatStore((state) => state.cats.bigCats);
  const smallCats = useCatStore((state) => state.cats.smallCats);
  const increaseBigCats = useCatStore((state) => state.increaseBigCats);
  const increaseSmallCats = useCatStore((state) => state.increaseSmallCats);

  return (
    <div className="box">
      <h1>Cat Box</h1>
      <p>Big Cats: {bigCats}</p>
      <p>Small Cats: {smallCats}</p>

      <div>
        <button onClick={increaseBigCats}>Add Big Cats</button>
        <button onClick={increaseSmallCats}>Add Small Cats</button>
      </div>
    </div>
  );
}
