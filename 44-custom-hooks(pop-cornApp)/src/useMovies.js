import { useEffect, useState } from "react";
const KEY = "36d2c53f";
// we can't pass is as arg cox it is tightly coupled and we wana make this hook as as reusable as it was//
export function useMovies (query){
const [movies, setMovies] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


     useEffect(
        function () {
          const controller = new AbortController();
          // used to cancel the race Condtion by fetch requests
          async function fetchMovies() {
            try {
              setIsLoading(true);
              setError("");
              const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                { signal: controller.signal }
              );
              if (!res.ok)
                throw new Error("Something went wrong while fetching the movies");
              const data = await res?.json();
              const errorMessage = data.Error ? data.Error : "SomeThing went Wrong";
              if (data?.Response === "False") throw { message: errorMessage };
              //  console.log(data);
              setMovies(data.Search);
              setError("");
            } catch (err) {
              console.log("errrrr", err.message);
              if (err.name !== "AbortError") {
                setError(err.message);
              }
            } finally {
              setIsLoading(false);
            }
          }
          if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
          }
        //   handleCloseMovie();
          fetchMovies();
          return function () {
            controller.abort();
          };
        },
        [query]
      );
      return{movies, isLoading,error}
}