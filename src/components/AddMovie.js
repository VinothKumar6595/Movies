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

  const addMovieHandler = () => {
    const myObj = {
      title: name,
      opening_crawl: text,
      release_date: date,
      episode_id: Math.random(),
    };
    console.log(myObj);
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
