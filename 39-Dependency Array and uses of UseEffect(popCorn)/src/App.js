//!in the previous  code we can observe the props are passed from parent to nested components , and it creates the prop drilling, in next code we will fix it using component composition
import { Children, useEffect, useState } from "react";
import "./index.css";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = "36d2c53f";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]= useState('');
  const [query, setQuery] = useState("");
  // const query = 'interstellar';

  // useEffect(function() {
  //   console.log("Intial Render")
  // });
  // useEffect(function() {
  //   console.log("First Render")
  // }, []);
  // useEffect(function() {
  //   console.log("Query Render")
  // },[query]);
  // console.log("During Render");
  //! this is how above useEffect works on different dependencies
  useEffect(function() {
    async function fetchMovies(){
      try {
     setIsLoading(true);
     setError('')
   const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
   if(!res.ok) throw new Error('Something went wrong while fetching the movies')
   const data = await res?.json();
  console.log(data)
  const errorMessage = data.Error ? data.Error : 'SomeThing went Wrong';
  if(data?.Response ==='False') throw   {message :errorMessage};
  //  console.log(data);
   setMovies(data.Search);
   
      }
      catch (err){
        console.log(err.message);
        setError(err.message);
      }

      finally{
        setIsLoading(false)
      }
    }
    if(query.length<3){
      setMovies([]);
      setError('');
      return;

    }
    fetchMovies();
  },[query])

  
  return (
    <>
      <Navbar>
        {/* <Logo /> */}
        <Search  query ={query} setQuery ={setQuery}/>
        {/* e.g later we don't need search we can remove it here and it will remove , no need to touch navbar */}
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        {/* //!instead of passing them as children we can also pass them as element prop , which will do exactly same  */}
        {/* <Box ele= {<MovieList movies={movies}/>}/> */}
        <Box>
          {isLoading && <Loader/>}
          {!isLoading && !error && <MovieList movies={movies}/>}
          {error && <Error message ={error}/>}
        </Box>
        <Box>
          <Summary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
        {/* <Box element ={<> <Summary watched={watched} />
        <WatchedList watched={watched} /></>}/> */}
      </Main>
      {/* //?this is how we can pass the props to the nested components without prop drilling by using component composition */}
    </>
  );
}
const Loader = () =>{
  return (
<div className="loader">
  <p>Loading...</p>
</div>
  );
}
const Error = ({message}) =>{
   return (
    <div className="error">
  {message}
    </div>
  
   )
}
//! NAVBAR............
function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo /> {children}
      {/* //?we can also add logo here and it works exactly same as passing it as a child and it is also stateless component */}
    </nav>
  );
}

function Search({query, setQuery}) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
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
function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} />
      ))}
    </ul>
  );
}
function Movie({ movie }) {
  return (
    <li key={movie.imdbID}>
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
// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);

//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <Summary watched={watched} />
//           <WatchedList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }
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
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
function WatchedList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieList movie={movie} />
      ))}
    </ul>
  );
}
function WatchedMovieList({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
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
      </div>
    </li>
  );
}
