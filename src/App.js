import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];
  const [movies, setMovies] = useState([]);
  const [isLoading, setISLoading] = useState(false);
  const [error, setError] = useState(null);

  const [retry, setRetry] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => fetchMoviesHandler(), 5000);

    if (!retry) clearInterval(timer);

    return () => {
      clearInterval(timer);
    };
  }, [retry]);

  const fetchMoviesHandler = async () => {
    setISLoading(true);
    setError(null);
    try {
      const res = await fetch("https://swapi.dev/api/filmsss/");
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
  };

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
