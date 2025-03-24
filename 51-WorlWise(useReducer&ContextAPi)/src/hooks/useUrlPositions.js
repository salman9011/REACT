import { useSearchParams } from "react-router-dom";
export function useUrlPositions(){
    const [searchParams] = useSearchParams();
     // it is a hook that is used to get the query string from the url
     const lat = searchParams.get('lat');
     const lng = searchParams.get('lng');
     return [lat,lng];
}