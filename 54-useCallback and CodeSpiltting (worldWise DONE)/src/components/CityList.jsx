import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../context/CitiesProvider";
function CityList() {
  const { cities, isLoading } = useCities();
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
  return (
    <>
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
    </>
  );
}

export default CityList;
