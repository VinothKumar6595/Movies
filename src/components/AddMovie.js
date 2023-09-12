import React, { useState } from "react";
import classes from "./AddMovie.module.css";
const AddMovie = () => {
  const [name, setName] = useState("");
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const [text, setText] = useState("");
  const textChangeHandler = (event) => {
    setText(event.target.value);
  };
  const [date, setDate] = useState("");
  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };

  const addMovieHandler = async (event) => {
    event.preventDefault();
    const movies = {
      title: name,
      opening_crawl: text,
      release_date: date,
    };
    const response = await fetch(
      "https://react-http-f39c2-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movies),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setDate("");
    setName("");
    setText("");
  };

  return (
    <div className={classes.form}>
      <div>
        <label>Title</label>
        <input type="text" onChange={nameChangeHandler} value={name} />
      </div>
      <div className={classes.opening}>
        <label>Opening Text</label>
        <input type="text" onChange={textChangeHandler} value={text} />
      </div>
      <div>
        <label>Release Date</label>
        <input type="date" onChange={dateChangeHandler} value={date} />
      </div>
      <div>
        <button onClick={addMovieHandler}>Add Movie</button>
      </div>
    </div>
  );
};

export default AddMovie;
