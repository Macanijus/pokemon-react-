import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ pokemons }) => {
  useEffect(() => {
    console.log(pokemons, "Home");
  }, [pokemons]);
  return (
    <div>
      {pokemons.map((pokemon, index) => (
        <Link key={index} to={`/pokemon/${pokemon.id}`}>
          <h1>{pokemon.name.english}</h1>
        </Link>
      ))}
    </div>
  );
};

export default Home;
