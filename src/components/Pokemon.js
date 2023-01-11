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
    <div>
      <div>
        {console.log(pokemon)}
        <h1>Name: {pokemon?.name.english}</h1>
        <img width="200" height="200" src={pic} />
        <h2>Attack: {pokemon?.base.Attack}</h2>
        <h2>HP: {pokemon?.base.HP}</h2>
        <h2>Defense: {pokemon?.base.Defense}</h2>
        <div>
          <h2>Type:</h2>
          {pokemon?.type.map((item, index) => (
            <h2 key={index}>{item}</h2>
          ))}
        </div>
        {console.log(
          pic,
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name.english.toLowerCase()}`
        )}

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
    </div>
  );
};

export default Pokemon;
