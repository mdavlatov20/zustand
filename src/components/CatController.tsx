import { useCatStore } from "../store/catStore";

export default function CatController() {
  const increaseBigCats = useCatStore((state) => state.increaseBigCats);
  const increaseSmallCats = useCatStore((state) => state.increaseSmallCats);

  return (
    <div className="box">
      <h1>Cat Controller</h1>

      <div>
        <button onClick={increaseBigCats}>Add Big Cats</button>
        <button onClick={increaseSmallCats}>Add Small Cats</button>
      </div>
    </div>
  );
}
