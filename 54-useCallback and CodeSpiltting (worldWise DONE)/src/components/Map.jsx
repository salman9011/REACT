// import {  useNavigate } from "react-router-dom";
// import Styles from "./Map.module.css";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css';
// import { useEffect, useState } from "react";
// import { useCities } from "../context/CitiesProvider";
// import { useGeolocation } from "../hooks/useGeolocation";
// import Button from "./Button"
// import { useUrlPositions } from "../hooks/useUrlPositions";
// const flagEmojiToPNG = (flag) => {
//     var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char-127397).toLowerCase()).join('')
//     return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
// }

// function Map(){
//     const { position:geoPosition, isLoading, handleLocation} = useGeolocation();
//     const [mapPosition, setMapPositions] = useState([51.505, -0.09]);
//     const {cities} = useCities();
//     const[mapLat,mapLng]= useUrlPositions();
   
   

//     // so when any of lat or lng changes , we will update the map position and we need to sync the map position with the url
//     // so we will use useEffect hook to check the change and update the state accordingly 
//     useEffect(()=>{
//         if(mapLat && mapLng){
//             setMapPositions([mapLat, mapLng]);
//         }

//     },[mapLat, mapLng])
//     useEffect(function(){
//         if(geoPosition)
//             setMapPositions([geoPosition.lat, geoPosition.lng])
//     },[geoPosition])

//     return (
//         <div className={Styles.mapContainer}>
//        {!geoPosition && <Button type="position" onClick={handleLocation}>{isLoading ? "Loading..." : "Use your Position"}</Button>}
//         <MapContainer 
//         center={mapPosition}
//         //  center={[mapLat ,mapLng]}
//          zoom={6} 
//          scrollWheelZoom={true} 
//          className={Styles.map}>
//   <TileLayer
//     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
//   />
//   {cities.map((city) => (<Marker position={[city.position.lat,city.position.lng]} key={city.id}>
//     <Popup>
//      <span>{flagEmojiToPNG(city.emoji)} {city.cityName}</span> 
//     </Popup>
//   </Marker>))}
//   <ChangePosition position={mapPosition} />
//   <DetectClick/>
// </MapContainer>
// </div>

//     )
// }

// // our map was not reactive when lat and lang changes , so for that leaflet provides a hook called useMap//
// function ChangePosition({position}){
//     const map = useMap();
//     // lets set view of the map
//     map.setView(position);
//     return null;
//     // here is one catch , when we click on back it returns to default position , so we need to fix that also, so we want our map component to remember the  prev lat and lat position 
// }

// // lets create another component when we click on map it should open form and also for that leaflet provides another hook called useMapEvent
// // so lets create a new component called ChangePosition
// function DetectClick(){
//     const navigate = useNavigate();
//      useMapEvents({
//         click : (e) =>{
//             console.log(e);
//             // so when we click on anywhere we get lan and lat of that position , lets store that in query string and use in the form later
//             // lets build query string kind of global state
//             navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
//         }
//      }
//     )
//     return null;
// }
// export default Map;

import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesProvider";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPositions } from "../hooks/useUrlPositions";

const flagEmojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char - 127397).toLowerCase()).join('');
  return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />);
};

function Map() {
  const { position: geoPosition, isLoading, handleLocation } = useGeolocation();
  const [mapPosition, setMapPositions] = useState([51.505, -0.09]);
  const { cities } = useCities();
  const [mapLat, mapLng] = useUrlPositions();

  // Update map position when lat or lng changes
  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPositions([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  // Update map position when geoPosition changes
  useEffect(() => {
    if (geoPosition) {
      setMapPositions([geoPosition.lat, geoPosition.lng]);
    }
  }, [geoPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoPosition && <Button type="position" onClick={handleLocation}>{isLoading ? "Loading..." : "Use your Position"}</Button>}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          city.position && city.position.lat && city.position.lng && (
            <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
              <Popup>
                <span>{flagEmojiToPNG(city.emoji)} {city.cityName}</span>
              </Popup>
            </Marker>
          )
        ))}
        <ChangePosition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// ChangePosition component to update map view
function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// DetectClick component to handle map clicks
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    }
  });
  return null;
}

export default Map;