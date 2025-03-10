import {  useNavigate, useSearchParams } from "react-router-dom";
import Styles from "./Map.module.css";

function Map(){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    //it is a hook that is used to get the query string from the url
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    return (
        <div className={Styles.mapContainer} onClick={() => navigate("form")}>
            <h1>Map</h1>
            <p>postions: {lat} {lng}</p>
        </div>
    )
}
export default Map;