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
