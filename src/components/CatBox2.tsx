import { useCatStore } from "../store/catStore";

export default function CatBox2() {
  const bigCats = useCatStore((state) => state.cats.bigCats);

  return (
    <div className="box">
      <h1>Partial States From catStore</h1>
      <p>bigCats: {bigCats}</p>
      <p>{Math.random()}</p>
    </div>
  );
}
