//!in the previous  code we can observe the props are passed from parent to nested components , and it creates the prop drilling, in next code we will fix it using component composition
import { Children, useEffect, useRef, useState } from "react";
import "./index.css";
import StarRating from "./Star-rating";
import { PropagateLoader } from "react-spinners";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = "36d2c53f";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
    // this pure func will be executed on first render
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setselectedId] = useState(null);

  function handleMovieDetails(id) {
    setselectedId((selectedId) => (selectedId === id ? null : id));
  }
  function handleCloseMovie() {
    setselectedId(null);
  }
  function handleWatchedMovie(newMovie) {
    console.log("hello", newMovie);
    setWatched((watched) => [...watched, newMovie]);
    // localStorage.setItem('watched', JSON.stringify([...watched,newMovie])); cox we have to make it reusable to store it using effect
  }
  function handleDeleteWatched(id) {
    setWatched((watched) =>
      watched.filter((preMovie) => preMovie.imdbID !== id)
    );
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
      //if we delete the movie , it will automatically gets deleted in local storage as effect is in sync with watched
    },
    [watched]
  );
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
      handleCloseMovie();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Navbar>
        {/* <Logo /> */}
        <Search query={query} setQuery={setQuery} />
        {/* e.g later we don't need search we can remove it here and it will remove , no need to touch navbar */}
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        {/* //!instead of passing them as children we can also pass them as element prop , which will do exactly same  */}
        {/* <Box ele= {<MovieList movies={movies}/>}/> */}
        <Box>
          {isLoading && (
            <PropagateLoader
              color="#2db7e2"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
              }}
            />
          )}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleMovieDetails} />
          )}
          {error && <Error message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onWatchedMovie={handleWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
        {/* <Box element ={<> <Summary watched={watched} />
        <WatchedList watched={watched} /></>}/> */}
      </Main>
      {/* //?this is how we can pass the props to the nested components without prop drilling by using component composition */}
    </>
  );
}
// const Loader = () => {
//   return (
//     <div className="loader">
//       <p>Loading...</p>
//     </div>
//   );
// };
const Error = ({ message }) => {
  return <div className="error">{message}</div>;
};

//! NAVBAR............
function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo /> {children}
      {/* //?we can also add logo here and it works exactly same as passing it as a child and it is also stateless component */}
    </nav>
  );
}

function Search({ query, setQuery }) {
  // useEffect(function(){
  //   const ele= document.querySelector(".search");
  //   console.log(ele)
  //   ele.focus();
  // },[query])
  // this is not the react way lets fix this by useRef
  const ele = useRef(null);
  useEffect(function () {
    console.log(ele.current);
    function callback(e) {
      if (document.activeElement === ele.current) return;
      if (e.code === "Enter") setQuery("");
      ele.current.focus();
    }

    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={ele}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length || 0}</strong> results
    </p>
  );
}

//! MAIN............
function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  //! we can see watchedbox and listbox are same so we can create a common component and use it in both places so creating reusable component and add in component composition
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
function Movie({ movie, onSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie?.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

const MovieDetails = ({
  selectedId,
  onCloseMovie,
  onWatchedMovie,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");
  const isAlreadyRated = watched
    .map((movie) => movie.imdbID)
    .includes(selectedId);
  const ratedStars = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  const storedRating = useRef(0);
  useEffect(
    function () {
      if (userRating) storedRating.current = storedRating.current + 1;
    },
    [userRating]
    // this is how the refs persists data between renders//
  );
  const {
    Title: title,
    Year: year,
    Rated: rated,
    Released: released,
    Actors: actors,
    Awards: awards,
    BoxOffice: boxOffice,
    Country: country,
    DVD: dvd,
    Director: director,
    Genre: genre,
    Language: language,
    Metascore: metascore,
    Plot: plot,
    Poster: poster,
    Production: production,
    Ratings: ratings,
    Runtime: runtime,
    Type: type,
    Website: website,
    Writer: writer,
    imdbID: imdbID,
    imdbRating: imdbRating,
    imdbVotes: imdbVotes,
  } = movie;

  function AddWatchedMovieDetails() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecision: storedRating.current,
    };
    onWatchedMovie(newMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") onCloseMovie();
      }
      document.addEventListener("keydown", callback);

      // cleaning dom tree
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );
  useEffect(
    function () {
      async function fetchMovie() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          if (!res.ok)
            throw new Error("Something went wrong while fetching the movie");
          const data = await res?.json();
          console.log(data);
          const errorMessage = data.Error ? data.Error : "SomeThing went Wrong";
          if (data?.Response === "False") throw { message: errorMessage };
          //  console.log(data);
          setMovie(data);
        } catch (err) {
          console.log(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovie();
    },
    [selectedId]
  );
  //! settled the title of browser tab
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "usePopcorn";
        // this is cleanup function to reset back the title to original when component unmounts//
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <PropagateLoader
          color="#2db7e2"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            {!isAlreadyRated ? (
              <div className="rating">
                <StarRating
                  maxRating={10}
                  size={32 / 2}
                  onSetMovieRating={setUserRating}
                />
                {userRating > 0 && (
                  <button className="btn-add" onClick={AddWatchedMovieDetails}>
                    + Add to list
                  </button>
                )}
              </div>
            ) : (
              <p>You have Already Rated this movie with {ratedStars} ⭐</p>
            )}

            <p>
              <em>{plot}</em>
            </p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
function WatchedList({ watched, handleDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieList
          movie={movie}
          handleDeleteWatched={handleDeleteWatched}
        />
      ))}
    </ul>
  );
}
function WatchedMovieList({ movie, handleDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
