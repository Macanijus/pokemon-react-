import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PokemonInfo = ({ pokemons }) => {
  const { id, info } = useParams();
  const pokemon = pokemons.find((element) => element.id === Number(id) - 1);
  const keys = Array.isArray(pokemon[info]) ? [] : Object.keys(pokemon[info]);
  /* console.log(Object.keys(pokemon[info])); */
  /* const keys = Object.keys(pokemon); */

  /* pokemon ? console.log(Object?.pokemon[info]) : console.log("nada"); */
  return (
    <div>
      <h1>Name: {pokemon.name.english}</h1>

      <div>
        <h2>{info.charAt(0).toUpperCase() + info.slice(1)}:</h2>
        {Array.isArray(pokemon[info])
          ? pokemon[info].map((item) => <h2>{item}</h2>)
          : keys.map((item) => (
              <h2>
                {item.charAt(0).toUpperCase() + item.slice(1)}:{" "}
                {pokemon[info][item]}
              </h2>
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

export default PokemonInfo;
