function WelcomeScreen({totalQuestions ,dispatch}){
    return(
        <div>
            <h2>Welcome to The React Quiz!</h2>
            <h3>{totalQuestions} questions to test your React mastery</h3>
            <button className="btn" onClick={()=> dispatch({type:"start"})}>Let's Start</button>

        </div>
    )
}
export default WelcomeScreen;