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
