const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
  ];
export default function App(){
    const step = 3;
   return <div className="steps">
    <div className="numbers">
        <div className="active">1</div>
        <div className="active">2</div>
        <div className="active">3</div>
    </div>
    {/* //!here things are static, we need to add them dynamic for that we use states// */}
    <p className="message">Step {step}: {messages[step-1]}</p>
    <div className="buttons">
    {/* //! these buttons should also interactive and clickable and should load dynamic data// */}
    <button style={{backgroundColor:"#7950f2", color: "#fff"}}>Previous</button>
    <button style={{backgroundColor:"#7950f2", color: "#fff"}}>Next</button>
    </div>

   </div>;
}