function ProgressBar({index, totalQuestions, points, totalPoints, answer}){
    console.log(index);
    return(
        <header className="progress">
            <progress max={totalQuestions} value={index + Number(answer!==null)}></progress>
            {/* value will be current index  and also move this when we select answer jus pass answer and convert bol into num and add that*/}
            <p>Questions <strong>{index+1} </strong>/ {totalQuestions}</p>
            <p>{points} / {totalPoints}</p>
        </header>
    )
}
export default ProgressBar;