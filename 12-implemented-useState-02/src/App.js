import { useState } from "react";

const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
  ];
export default function App(){
    const [step ,setStep] = useState(1);
    // ? State is just memory for component /View
    //!we define use state then we add initial value or param to fun(useState) then use the state variable in jsx then update the state in eventHandler//
    function handlePrevious(){
        if(step>1)
        setStep(step-1)
    }
    function handleNext(){
    if(step<3)
         setStep(step+1)
    }
   return <div className="steps">
    <div className="numbers">
        <div className={step>= 1 ?"active" : ""}>1</div>
        <div className={step>= 2 ?"active" : ""}>2</div>
        <div className={step>= 3 ?"active" : ""}>3</div>
    </div>
    {/* //!here things are static, we need to add them dynamic for that we use states// */}
    <p className="message">Step {step}: {messages[step-1]}</p>
    <div className="buttons">
    {/* //! these buttons should also interactive and clickable and should load dynamic data// */}
    <button style={{backgroundColor:"#7950f2", color: "#fff"}} onClick={handlePrevious}>Previous</button>
    <button style={{backgroundColor:"#7950f2", color: "#fff"}}onClick ={handleNext}>Next</button>
    </div>

   </div>;
}