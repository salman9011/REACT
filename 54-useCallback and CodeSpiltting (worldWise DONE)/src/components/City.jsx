import styles from "./City.module.css";

import { useEffect } from "react";
import { useCities } from "../context/CitiesProvider";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";
import BackButton from "./BackButton";

const flagEmojiToPNG = (flag) => {
  if(flag === undefined) return null;
  else{
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char-127397).toLowerCase()).join('')
  return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
}
}
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
function City() {
  const { id } = useParams();
   //it is a hook that is used to get the query string from the url
  const { currentCity, isLoading , getCities} = useCities();
  console.log(currentCity,"hhhhhhhhhhhhhhhhhhh")
  const { cityName, date, notes, emoji } = currentCity;
  useEffect(
    function () {
      getCities(id);
    },
    [id, getCities]
    //writing getCities in the dependency array creates infinite loop beause it is a function so it is created again and again
    // to fix this we use useCallback
  );

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{flagEmojiToPNG(emoji)}</span> {cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>
      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}
      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
