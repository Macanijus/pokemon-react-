import "./App.css";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";
import PokemonInfo from "./components/PokemonInfo";
/* import { fetchData } from "./components/FetchData.js"; */
import { useEffect, useState } from "react";
import { Router, Routes, Route } from "react-router-dom";
import axios from "axios";
/* const fetch = require("./components/FetchData"); */

function App() {
  // fetch("http://localhost:9000/pokemon")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //   });

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  /* useEffect(() => {
    const temp = fetchData("http://localhost:9000/pokemon");
    console.log(fetchData("http://localhost:9000/pokemon"));
    setPokemons(temp);
  }, []); */

  const fetchData = (url) => {
    axios
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log("Not working because: ", err));
  };

  useEffect(() => {
    /* axios.get("http://localhost:9000/pokemon").then((res) => {
      setPokemons(res.data);
    }); */
    //const temp =
    //console.log(fetch.fetchData("http://localhost:9000/pokemon"));
    //console.log(temp, " here ");
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [pokemons]);

  return (
    <div className="app">
      {loading ? (
        <h1>...loading</h1>
      ) : (
        <Routes>
          <Route path="/" element={<Home pokemons={pokemons} />} />
          <Route
            path="/pokemon/:id"
            element={<Pokemon pokemons={pokemons} fetchData={fetchData} />}
          />
          <Route
            path="/pokemon/:id/:info"
            element={<PokemonInfo pokemons={pokemons} fetchData={fetchData} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
