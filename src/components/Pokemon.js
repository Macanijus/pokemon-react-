import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";
import Combatant from "./Combatant";

const Pokemon = ({}) => {
  const { id } = useParams();
  const temp = useLoaderData();
  const [pic, setPic] = useState(null);
  const [pic2, setPic2] = useState(null);

  const pokemon = useLoaderData().pokemon1;
  const pokemon2 = useLoaderData().pokemon2[0];

  // const pokemon = temp[0];

  console.log(pokemon, " #1 ", pokemon2, " #2");

  const fetchPics = (url) => {
    axios
      .get(url)
      .then((res) => {
        setPic(res.data.sprites.front_default);
      })
      .catch((err) => console.log("Not working because: ", err));
  };

  const fetchPics2 = (url) => {
    axios
      .get(url)
      .then((res) => {
        setPic2(res.data.sprites.front_default);
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

    fetchPics2(
      `https://pokeapi.co/api/v2/pokemon/${pokemon2.name.english
        .toLowerCase()
        .replace("♀", "-f")
        .replace("♂", "-m")}`
    );
  }, []);

  useEffect(() => {}, [pic]);

  return (
    <div className="fightdiv">
      <div className="versus">
        <Combatant pokemon={pokemon} pic={pic} />
        <div className="versustwo">
          <strong>VERSUS </strong>
          <button className="pic">Fight!</button>
        </div>
        <Combatant pokemon={pokemon2} pic={pic2} />
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
  );
};

export default Pokemon;
