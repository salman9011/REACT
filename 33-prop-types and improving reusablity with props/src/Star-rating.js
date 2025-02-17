// import { useState } from "react";

import { useState } from "react";
import PropTypes from "prop-types";

// const containerStyle = {
//   display: "flex",
//   alignItems: "center",
//   gap: "10px",
// };
// const starContainerStyle = {
//   display: "flex",
//   gap: "4px",
// };
// const StarRating = ({ maxRating = 5 }) => {
//     const [rating , setRating] = useState(0);
//     function handleRating(rating){
//         setRating(rating);
//     }
//   //?setting maxRating to 5 handles the edge case if maxRating does not given by dev , then it will automatically take as 5
//   return (
//     <div style={containerStyle}>
//       <div style={starContainerStyle}>
//         {Array.from({ length: maxRating }, (_, i) => (
//           <span>
//             <Star key={i}  onRate ={() => handleRating(i+1)} full ={rating >= i+1}/>
//           </span>
//         ))}
//       </div>
//       <p>{rating}</p>
//     </div>
//   );
// };

// const starStyle={
//     height:'48px',
//     width : '48px',
//     display:'block',
//     cursor : 'pointer',
// }
// const Star = ({onRate, full}) => {
//   return (
//     <span style={starStyle} role="button" onClick={onRate}>
//     {full ? <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 20 20"
//       fill="#000"
//       stroke="#000"
//     >
//       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//     </svg> : <svg
//   xmlns="http://www.w3.org/2000/svg"
//   fill="none"
//   viewBox="0 0 24 24"
//   stroke="#000"
// >
//   <path
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     strokeWidth="{2}"
//     d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//   />
// </svg>}
//     </span>
//   );
// };
// export default StarRating;

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};
const starContainerStyle = {
  display: "flex",
  gap: "10px",
};


// here we passed props as api
const StarRating = ({
  maxRating = 5,
  // ?for above prop we want the max rating should be always number , this is called Type Checking for that we use typescript instead of typescript, but here we use React build in proptypes
  //? now import proptypes
  color = "#fcc419",
  size = 40,
  messages = [],
  defaultRating=0,
  onSetMovieRating,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  function handleRating(rating) {
    setRating(rating);
    // onSetMovieRating(rating);
  }
  const textStyle = {
    lineHeight: "1",
    color: color,
    fontSize: `${size / 2}px`,
  };
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span>
            <Star
              onRate={() => handleRating(i + 1)}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              onHoverIn={() => setTempRating(i + 1)}
              onHoverOut={() => setTempRating(0)}
              color={color}
              size={size}
            />
          </span>
          // actually the Star component will render 5 times as we are looping array maxRating times full will be depend on rating
        ))}
      </div>
      <span style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </span>
    </div>
  );
};
export default StarRating;

// this is how we specifiy PropTypes
StarRating.propTypes ={
  maxRating: PropTypes.number,    
}

const Star = ({ onRate, full, onHoverIn, onHoverOut, color, size }) => {
  const starStyle = {
    height: `${size}px`,
    width: `${size}px`,
    display: "block",
    cursor: "pointer",
  };
  return (
    <span
      style={starStyle}
      role="button"
      onClick={onRate}
      onMouseOver={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
};
