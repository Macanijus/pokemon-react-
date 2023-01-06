import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = ({}) => {
  const [pokemons, setPokemons] = useState(null);
  const [searchedPokemons, setSearchedPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const firstRun = useRef(true);
  const [input, setInput] = useState("");
  /* const [rando, setRando] = useState(1); */
  let rando = 1;

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const findPokemon = () => {
    console.log("pokemon ", pokemons);
    if (pokemons && input) {
      const result = input
        ? pokemons.filter((poke) =>
            poke.name.english.toLowerCase().includes(input)
          )
        : [];
      setSearchedPokemons(result);
      /* console.log("timon", searchedRecipe); */
    }
  };

  /* const fetchPokemon = async () => {
    try {
      const { pokemon, error } = await fetchData(
        "http://localhost:9000/pokemon"
      );
      if (error) throw error;
      setPokemons(pokemon);
    } catch (error) {
      console.log(error);
    }
  }; */

  const getRandom = (min, max) => {
    console.log("getrandom max", max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getPoke = () => {
    rando = getRandom(1, pokemons.length);
  };

  /*  const getRandomPoke = () => {
    setSearchedPokemons(pokemons[getRandom(0, pokemons.length - 1)]);
    console.log(searchedPokemons);
  }; */

  const fetchData = (url) => {
    axios
      .get(url)
      .then((res) => {
        setPokemons(res.data);
      })
      .catch((err) => console.log("Not working because: ", err));
  };

  useEffect(() => {
    fetchData("http://localhost:9000/pokemon");
  }, []);

  useEffect(() => {
    findPokemon();
  }, [input]);

  useEffect(() => {
    console.log(" whaaat", pokemons);
    setLoading(false);
    /* getPoke(); */
  }, [pokemons]);

  return (
    <div>
      <input
        className="search-input"
        type="text"
        size="18"
        placeholder="Search"
        onChange={changeHandler}
        value={input}
      />
      <Link to={`/pokemon/${rando}`} style={{ textDecoration: "none" }}>
        <button onClick={() => (rando = getPoke())}>Gimme Random Poke</button>
      </Link>
      {loading ? (
        <div>Loading... </div>
      ) : (
        <div>
          {searchedPokemons.length
            ? searchedPokemons?.map((pokemon, index) => (
                <Link
                  key={index}
                  to={`/pokemon/${pokemon.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <h1>{pokemon.name.english}</h1>
                </Link>
              ))
            : pokemons?.map((pokemon, index) => (
                <Link
                  key={index}
                  to={`/pokemon/${pokemon.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <h1>{pokemon.name.english}</h1>
                </Link>
              ))}
        </div>
      )}
    </div>
  );
};

export default Home;
