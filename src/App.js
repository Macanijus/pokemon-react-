import "./App.css";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";
import PokemonInfo from "./components/PokemonInfo";
import { fetchData } from "./components/FetchData.js";
import { useEffect, useState } from "react";
import { Router, Routes, Route } from "react-router-dom";
import axios from "axios";

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

  useEffect(() => {
    axios.get("http://localhost:9000/pokemon").then((res) => {
      setPokemons(res.data);
    });
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
            element={<Pokemon pokemons={pokemons} />}
          />
          <Route
            path="/pokemon/:id/:info"
            element={<PokemonInfo pokemons={pokemons} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
