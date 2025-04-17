import { useEffect } from "react";

function Timer({dispatch, secondsRemaining}){
    const mints = Math.floor(secondsRemaining/60);
    const seconds = (secondsRemaining % 60);
    useEffect(function(){
      const id =  setInterval(function(){
            dispatch({type:"tick"})
        },1000)
    return ()=> clearInterval(id);
    //cox our timer will never stop if we don't clear it//
    },[dispatch])
    return (
        <div className="timer">
        {mints < 10 && "0" }{mints}:{seconds<10 && "0"}{seconds}
        </div>
    )
}
export default Timer;