function Options({ question, dispatch, answer }) {
    const hasAnswer= answer !==null;
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
             hasAnswer ? index === question.correctOption ? "correct" : "wrong": ""
//  ?            so if i select A answer will be stetted as 0 , and correctoption is 1 , so array.length times the 0 is compared with 1 so gets all wrong, if select B which is 1 and 1 is answer so every time the 1 is compared with 1 , 
// inshort answer is changed once when we click on any option and then in one go all options are compared against answer
// that is why we compared index not answer
            }`}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={hasAnswer}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Options;
