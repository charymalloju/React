import React, { useEffect, useState } from "react";
import axios from "axios";
import { get, sortBy } from "lodash";
import "../../src/style.css";

const getImage = obj => {
  return obj["images"]["Poster Art"];
};

const Movies = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  const getData = () => {
    setLoad(true);
    axios("sample.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(function(myJson) {
        setLoad(false);
        let data = get(myJson, "data.entries", []);
        let movies = sortBy(
          data.filter(d => d.programType === "movie" && d.releaseYear >= 2010),
          "title"
        );
        setData(movies);
      })
      .catch(() => {
        setLoad(false);
        setError("Error while loading json data");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Movies</h1>
        {!load && error ? <p>{error}</p> : ""}
        <div className="wrapper">
          {load ? (
            <p>Loading</p>
          ) : (
            data.map((m, i) => (
              <div className="box" key={i}>
                <p>{m.title}</p>
                <img src={getImage(m).url} width="200px" height="200px" />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Movies;
