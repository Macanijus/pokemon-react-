import React, { useEffect, useState, useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";

const Home = ({}) => {
  const [searchedPokemons, setSearchedPokemons] = useState([]);
  const firstRun = useRef(true);
  const [input, setInput] = useState("");
  let pic = null;
  const pokemons = useLoaderData().pokemons;

  console.log(pokemons);

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
    }
  };

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  let rando = pokemons[getRandom(1, pokemons.length)]._id;
  // const getPoke = () => {
  //   rando = pokemons[getRandom(1, pokemons.length)];
  // };

  useEffect(() => {
    findPokemon();
  }, [input]);

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
        <button /* onClick={() => (rando = getPoke())} */>
          Gimme Random Poke
        </button>
      </Link>
      <div>
        {searchedPokemons.length
          ? searchedPokemons?.map((pokemon, index) => (
              <Link
                key={index}
                to={`/pokemon/${pokemon._id}`}
                style={{ textDecoration: "none" }}
              >
                <h1>{pokemon.name.english}</h1>
              </Link>
            ))
          : pokemons?.map((pokemon, index) => (
              <Link
                key={index}
                to={`/pokemon/${pokemon._id}`}
                style={{ textDecoration: "none" }}
              >
                <h1>{pokemon.name.english}</h1>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Home;
