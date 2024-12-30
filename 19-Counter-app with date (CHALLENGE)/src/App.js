import { useState } from "react";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <DateCounter />
    </div>
  );
}
function DateCounter() {
  const [step, setStep] = useState(0);
  const [counter, setCounter] = useState(0);
  const date = new Date();
  date.setDate(date.getDate() + counter);
  // this counter is added to change the current date according to value added
  return (
    <div className="parent">
      <div style={{ display: "flex" }}>
        <input type="range" max="10" min="0" value={step} onChange={e => setStep(Number(e.target.value))}/>
        <p className="text">Steps:{step}</p>
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <button onClick={() => setCounter((c) => c - step)} className="btn">
          -
        </button>
        <input type="text" value={counter} onChange={e => setCounter(Number(e.target.value))} style={{height:"20px",marginTop:"10px"}}/>
        <button onClick={() => setCounter((c) => c + step)} className="btn">
          +
        </button>
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <p>
          {counter == 0
            ? "Today  "
            : counter > 0
            ? `${counter} days from today`
            : `${Math.abs(counter)} days ago was`}
        </p>
        <p style={{ marginLeft: "5px" }}>{date.toDateString()}</p>
      </div>
    </div>
  );
}
