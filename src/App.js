import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setISLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(false);

  const fetchMoviesHandler = useCallback(async () => {
    setISLoading(true);
    setError(null);
    try {
      const res = await fetch("https://swapi.dev/api/films/");
      if (!res.ok) {
        setRetry(true);
        throw new Error("Something Went Wrong! ...Retrying");
      }
      const data = await res.json();
      const transformedObj = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedObj);
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
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
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
