import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../context/CitiesProvider";
function CountryList() {
  const { cities, isLoading } = useCities();
    console.log("cities",cities);
  if (isLoading) {
    return (
      <>
        <Spinner />
        </>
    );

  }

  if(!cities.length){
    return (
        <Message message={"Please add your first city by clicking on the city on the map"}/>
    )
  }
  //Lets extract countries from cities
  const countries = cities.reduce((arr,city)=>{
    if(!arr.map((el)=>el.country).includes(city.country)){
      return [...arr,{country:city.country, emoji:city.emoji}];
    }
  },[])
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={crypto.randomUUID()} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
