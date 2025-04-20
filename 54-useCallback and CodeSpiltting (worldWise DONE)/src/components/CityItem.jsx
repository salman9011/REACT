import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import { useCities } from '../context/CitiesProvider';

const flagEmojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char-127397).toLowerCase()).join('')
    return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
}

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    
    }).format(new Date(date));
  
function CityItem({city}){
   const {currentCity, deleteCities}= useCities();
    const {cityName, emoji, date, id,position} = city;
    function handleClick(e){
e.preventDefault();
deleteCities(id);
    }
    
    return (
        <li >
        <Link  className={`${styles.cityItem} ${id===currentCity.id ?styles['cityItem--active'] : ""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        {/* // from ? it is called query string like the global states we have used in url , no need to store in our code  and lets read those lat and lng positions in our Map component*/}
        <span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
        </Link>
        </li>

    )
}

export default CityItem;