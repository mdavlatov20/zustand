// import BearBox from "./components/BearBox";
import CatBox from "./components/CatBox";
import CatBox2 from "./components/CatBox2";
import CatController from "./components/CatController";

export default function App() {
  return (
    <div className="container">
      <h1>Zustand Tutorial</h1>
      <div>
        <CatBox />
        <CatBox2 />
        <CatController />
      </div>
    </div>
  );
}
