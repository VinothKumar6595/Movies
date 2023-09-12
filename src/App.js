import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setISLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(false);

  const fetchMoviesHandler = useCallback(async () => {
    setISLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://react-http-f39c2-default-rtdb.firebaseio.com/movies.json"
      );
      if (!res.ok) {
        setRetry(true);
        throw new Error("Something Went Wrong! ...Retrying");
      }
      const data = await res.json();
      console.log(data);
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].opening_crawl,
          releaseDate: data[key].release_date,
        });
      }

      // const transformedObj = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });

      setMovies(loadedMovies);
      setISLoading(false);
    } catch (err) {
      setError(err.message);
    }
    setISLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
    const timer = setInterval(() => fetchMoviesHandler(), 5000);

    if (!retry) clearInterval(timer);

    return () => {
      clearInterval(timer);
    };
  }, [fetchMoviesHandler, retry]);
  const cancelRetryHandler = () => {
    setRetry(false);
  };
  return (
    <React.Fragment>
      <AddMovie />
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && (
          <MoviesList movies={movies} fetchMoviesHandler={fetchMoviesHandler} />
        )}
        {isLoading && "Empire is Loading..."}
        {!isLoading && error && (
          <p>
            {error}
            <button onClick={cancelRetryHandler}>Cancel</button>
          </p>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
