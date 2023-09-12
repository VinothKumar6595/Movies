import React from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = (props) => {
  const deleteMovieHandler = async (id) => {
    const response = await fetch(
      `https://react-http-f39c2-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      props.fetchMoviesHandler();
    }
  };
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <div key={movie.id}>
          <Movie
            key={movie.id}
            title={movie.title}
            releaseDate={movie.releaseDate}
            openingText={movie.openingText}
          />
          <button onClick={() => deleteMovieHandler(movie.id)}>
            Delete Movie
          </button>
        </div>
      ))}
    </ul>
  );
};

export default MovieList;
