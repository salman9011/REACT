// import { createContext, useContext, useEffect, useState } from "react";

// const BASE_URL = "http://localhost:9000";
// const CitiesContext = createContext();
// function CitiesProvider({ children }) {
//   const [cities, setCities] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentCity, setCurrentCity] = useState({});
//   useEffect(() => {
//     async function fetchCities() {
//       try {
//         setIsLoading(true);
//         const res = await fetch(`${BASE_URL}/cities`);
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await res.json();
//         setCities(data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching data", error);
//         setIsLoading(false);
//       }
//     }
//     fetchCities();
//   }, []);

//   async function getCities(id) {
//     try {
//       setIsLoading(true);
//       const res = await fetch(`${BASE_URL}/cities/${id}`);
//       if (!res.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await res.json();
//       setCurrentCity(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching data", error);
//       setIsLoading(false);
//     }
//   }
// //lets add cities to our fake api for that create post request
// async function createCities(newCity) {
//   try {
//     setIsLoading(true);
//     const res = await fetch(`${BASE_URL}/cities/`, {
//       method: "POST",
//       //actual data sent to body and converted to json format
//       body: JSON.stringify(newCity),
//       // jus the application know what data format i'm receiving
//       headers :{
//       "Content-Type" : "application/json"
//       }

//     });
//     if (!res.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await res.json();
//     console.log(data);
//     //
//     setCities((cities) => [...cities, data]);
//     setIsLoading(false);
//   } catch (error) {
//     console.error("Error Creating data", error);
//     setIsLoading(false);
//   }
// }
// async function deleteCities(id) {
//   try {
//     setIsLoading(true);
//     const res = await fetch(`${BASE_URL}/cities/${id}`, {
//       method: "DELETE",

//     });
//     if (!res.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await res.json();
//     console.log(data);
//     //
//     setCities((cities) => cities.filter((city) => city.id !== id));
//     setIsLoading(false);
//   } catch (error) {
//     console.error("Error Deleting data", error);
//     setIsLoading(false);
//   }
// }

//   return (
//     <>
//     <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCities,createCities, deleteCities }}>
//       {children}
//     </CitiesContext.Provider>
//     </>
//   );
// }

// function useCities() {
//   const context = useContext(CitiesContext);
//   if (context === undefined)
//     throw new Error("useCities must be used within a CitiesProvider");
//   return context;
// }
// // eslint-disable-next-line react-refresh/only-export-components
// export { CitiesProvider, useCities };

//! Lets combine the context with useReducer which is common practice in react applications
import { createContext, useContext, useEffect, useReducer} from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error : "",
};
function reducer(state, action){
  switch(action.type){
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, cities: action.payload, isLoading: false };
    case 'city/loaded':
      return { ...state, currentCity: action.payload, isLoading: false };
      case 'city/created':
        return {
          ...state,
          cities: [...state.cities, action.payload],
          //why state.cities and not just cities? because we are returning a new object and we want to keep the old state intact
          isLoading: false,
          // as soon as city is created we want it should be current active city
          currentCity : action.payload,
        };
        case 'city/deleted':
        return { 
          ...state,
          cities: state.cities.filter((city) => city.id !== action.payload),
          isLoading: false,
          currentCity: {},
        };
        case 'rejected':
          return { ...state, error: action.payload, isLoading: false };
  }



}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const [{cities,isLoading,currentCity}, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        dispatch({type:'cities/loaded',payload:data})
      } catch (error) {
        dispatch({ type: "rejected", payload: 'There was an error loading the city' });
      }
    }
    fetchCities();
  }, []);

  async function getCities(id) {
    if (Number(id) === currentCity.id) return;
    // cox the id is coming from url as string and currentCity.id is number so we need to convert it to number
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city",
      });
    }
  }
//lets add cities to our fake api for that create post request
async function createCities(newCity) {
  dispatch({ type: "loading" });
  try {
  
    const res = await fetch(`${BASE_URL}/cities/`, {
      method: "POST",
      //actual data sent to body and converted to json format
      body: JSON.stringify(newCity),
      // jus the application know what data format i'm receiving
      headers :{
      "Content-Type" : "application/json"
      }

    });
   
    const data = await res.json();
    dispatch({ type: "city/created", payload: data });
  } catch (error) {
    dispatch({ type: "rejected", payload: 'There was an error loading the city' });
  }
}
async function deleteCities(id) {
  dispatch({ type: "loading" });
  try {
   await fetch(`${BASE_URL}/cities/${id}`, {
      method: "DELETE",

    });
    // const data = await res.json();
    dispatch({ type: "city/deleted", payload: id });
  } catch (error) {
    dispatch({ type: "rejected", payload: 'There was an error loading the city' });
  }
}

  return (
    <>
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCities,createCities, deleteCities }}>
      {children}
    </CitiesContext.Provider>
    </>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("useCities must be used within a CitiesProvider");
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
