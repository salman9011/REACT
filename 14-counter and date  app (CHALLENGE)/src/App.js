import { useState } from "react";
import "./index.css"

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
  return (
    <div className="parent">
      <div style={{ display: "flex" }}>
        <button onClick={() => setStep((s) => s - 1)} className="btn">-</button>
        <p className="text">Steps:{step}</p>
        <button onClick={() => setStep((s) => s + 1)} className="btn">+</button>
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <button onClick={() => setCounter((c) => c - 1)} className="btn">-</button>
        <p>Counter: {counter}</p>
        <button onClick={() => setCounter((c) => c + 1)} className="btn">+</button>
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
