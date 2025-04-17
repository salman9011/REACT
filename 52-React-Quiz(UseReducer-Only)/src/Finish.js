function Finish({ points, totalPoints, highScore, dispatch }) {
    console.log("Points:", points, "Total Points:", totalPoints);
  const percentage = (points / totalPoints) * 100;
  let emoji;
  if(percentage === 100) emoji="🎖️";
  if(percentage < 100 && percentage >= 80) emoji="🎉";
  if(percentage < 80 && percentage >= 50) emoji="🙃";
  if(percentage < 50 && percentage >= 0) emoji="😣";
  if(percentage === 0) emoji ="🤦‍♂️"

  return (
    <>
    <p className="result">
    {emoji} You scored <strong> {points} out of {totalPoints} ({Math.ceil(percentage)}%){" "}
      </strong>
    </p>
    <p className="highscore">(High Score <strong>{highScore}</strong> points)</p>
    <button className="btn btn-ui" onClick={()=>dispatch({type:"restart"})}>Restart Quiz</button>
    </>
  );
}

export default Finish;
