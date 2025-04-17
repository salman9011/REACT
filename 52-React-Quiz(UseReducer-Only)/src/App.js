import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import WelcomeScreen from "./WelcomeScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import Finish from "./Finish";
import Footer from "./Footer";
import Timer from "./Timer";
function App() {
   const TIME_PER_QUESTION = 30;
  const initialState = {
    questions: [],
    status: "Loading",
    //? 1 it can be loading, error, active, finished
    index: 0,
    //?2 to show question one by as we need to keep track of it , so we use state
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null,
    //5 here set seconds null initially cox we have to set it for acc to question
  };
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "dataFailed":
        return {
          ...state,
          status: "error",
        };
      case "start":
        return {
          ...state,
          status: "active",
          secondsRemaining: state.questions.length * TIME_PER_QUESTION,
          // 6. here when its active , we get question array and for per question we gave 30 seconds and putting capital variable here , its convention
        };
      case "newAnswer":
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
          //?3 this is how we do complex states in reducer and it should be there not inside the component
          // the points should be here in newAnswer
        };
      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      case "finish":
        return {
          ...state,
          status: "finished",
          highScore:
            state.points > state.highScore ? state.points : state.highScore,
        };

      case "restart":
        return {
          ...initialState,
          questions: state.questions,
          status: "active",
        };
      //4. this will reset everything back to initial state but need to preserve the question and status should be in active not ready state//
      case "tick":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status,
          // 5. won't let it go to below zero
        };
      default:
        throw new Error("Action Unknown");
    }
  }
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const totalQuestions = questions.length;
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const totalPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "Loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <WelcomeScreen totalQuestions={totalQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              index={index}
              totalQuestions={totalQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                totalQuestions={totalQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finish
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
export default App;
