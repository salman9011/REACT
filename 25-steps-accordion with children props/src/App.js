import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
export default function App() {
  const [step, setStep] = useState(1);
  const [isopen, setIsopen] = useState(true);
  // ? State is just memory for component /View
  //!we define use state then we add initial value or param to fun(useState) then use the state variable in jsx then update the state in eventHandler//
  function handlePrevious() {
    if (step > 1) setStep(step - 1);
  }
  function handleNext() {
    if (step < 3) setStep(step + 1);
  }
  return (
    <>
      <div className="flex-button">
        {!isopen && (
          <button
            style={{ backgroundColor: "#7950f2", color: "#fff" }}
            onClick={() => setIsopen(!isopen)}
          >
            Open
          </button>
        )}
      </div>
      {isopen && (
        <div className="steps">
          <button className="close" onClick={() => setIsopen(!isopen)}>
            &times;
          </button>
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <Button
              bgColor="#7950f2"
              textColor="#fff"
              onClick={handlePrevious}
              // text="Previous"
            >👈Previous</Button>
            <Button
              bgColor="#7950f2"
              textColor="#fff"
              onClick={handleNext}
              // text="Next"
            >Next👉</Button>
            {/* this is how children Prop works by adding closing tag of component we can achieve any desired content*/}

          </div>
        </div>
      )}
    </>
  );
}

function Button({ bgColor, textColor, onClick, text, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
// ?this is how states re-renders when we change the data or state variable, that is why it is called react , becus React reacts on state change(more on notebook)
