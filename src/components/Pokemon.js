import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Pokemon = ({ pokemons }) => {
  const { id } = useParams();
  const pokemon = pokemons.find((element) => element.id === Number(id) - 1);
  return (
    <div>
      <h1>Name: {pokemon.name.english}</h1>
      <h2>Attack: {pokemon.base.Attack}</h2>
      <h2>HP: {pokemon.base.HP}</h2>
      <h2>Defense: {pokemon.base.Defense}</h2>
      <div>
        <h2>Type:</h2>
        {pokemon.type.map((item) => (
          <h2>{item}</h2>
        ))}
      </div>
      <Link to={`/pokemon/${id}/name`}>
        <button>Name</button>
      </Link>

      <Link to={`/pokemon/${id}/type`}>
        <button>Type</button>
      </Link>
      <Link to={`/pokemon/${id}/base`}>
        <button>Base</button>
      </Link>
    </div>
  );
};

export default Pokemon;
