import React, { useEffect, useState } from "react";
import { get, sortBy } from "lodash";
import "../../src/style.css";
import axios from "axios";

const getImage = obj => {
  return obj["images"]["Poster Art"];
};

const Series = () => {
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
          data.filter(d => d.programType === "series" && d.releaseYear >= 2010),
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
        <h1>Series</h1>
        <div className="wrapper">
          {!load && error ? <p>{error}</p> : ""}
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

export default Series;
