function NextButton({dispatch, answer,totalQuestions, index}){
    if(answer===null) return null;
    //? we will not show button till we have not selected any answer in start
   if(index < totalQuestions-1 ) return(
        <div>
           <button className="btn btn-ui" onClick={()=>dispatch({type: "nextQuestion"})}>Next</button> 
        </div>
    )
    if(index === totalQuestions-1 ) return(
        <div>
           <button className="btn btn-ui" onClick={()=>dispatch({type: "finish"})}>Finish</button> 
        </div>
    )
}

export default NextButton;