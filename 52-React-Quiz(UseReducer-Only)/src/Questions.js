import Options from "./Options";

function Questions({question, dispatch, answer}){
    console.log(question)
    return(
        <div>
        <Options question={question} dispatch={dispatch} answer={answer}/>
        </div>
    )
}
export default Questions;