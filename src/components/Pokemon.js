import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";

const Pokemon = ({}) => {
  const { id } = useParams();
  const pokemon = useLoaderData().pokemon;
  const [pic, setPic] = useState(null);

  const fetchPics = (url) => {
    axios
      .get(url)
      .then((res) => {
        setPic(res.data.sprites.front_default);
      })
      .catch((err) => console.log("Not working because: ", err));
  };

  useEffect(() => {
    fetchPics(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name.english
        .toLowerCase()
        .replace("♀", "-f")
        .replace("♂", "-m")}`
    );
  }, []);

  useEffect(() => {
    console.log(pic);
  }, [pic]);

  return (
    <div className="home">
      <div className="pokemonsDisplay">
        {console.log(pokemon)}
        <h1>Name: {pokemon?.name.english}</h1>
        <img className="pic" src={pic} alt={pokemon?.name.english} />
        <h2>Attack: {pokemon?.base.Attack}</h2>
        <h2>HP: {pokemon?.base.HP}</h2>
        <h2>Defense: {pokemon?.base.Defense}</h2>
        <div>
          <h2>Type:</h2>
          {pokemon?.type.map((item, index) => (
            <h2 key={index}>{item}</h2>
          ))}
        </div>
        <div>
          <Link to={`/pokemon/${id}/name`}>
            <button className="pic">Name</button>
          </Link>

          <Link to={`/pokemon/${id}/type`}>
            <button className="pic">Type</button>
          </Link>
          <Link to={`/pokemon/${id}/base`}>
            <button className="pic">Base</button>
          </Link>
          <Link to={`/`}>
            <button className="pic">Back to all Pokemons</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
