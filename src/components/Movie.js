import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  // const deleteMovieHandler = async (id) => {
  //   // const res = await fetch(
  //   //   `https://react-http-f39c2-default-rtdb.firebaseio.com/movies/${id}`,
  //   //   {
  //   //     method: "DELETE",
  //   //   }
  //   // );
  //   // console.log(res);
  //   console.log(id);
  // };
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <h1>{props.id}</h1>
    </li>
  );
};

export default Movie;
