import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StarRating from './Star-rating';
// example the consume wants to add paragraph based on rating like it creates a function
const Test = () =>{
  const [movieRating, setMovieRating] = useState(0);
  return (
    <>
 <StarRating maxRating={15} color='green' onSetMovieRating={setMovieRating}/>
{/* //  !Now consumer adds paragrah and wants to change it based on rating ,  */}
{/* //  !for that we create states but it doesn't have rating access so for that we pass setState to the component like below */}
<p>This movie was rated {movieRating} stars</p>
</>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} messages={['Terrible', 'Bad','Okay','Good','Amazing']}/>
    <StarRating size={20} color ="red"/>
    {/* we can also send default rating from here , and give that to state */}
    <StarRating size={50} color ='blue' defaultRating={3}/>
    <Test/>
  </React.StrictMode>
);

