import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";
import Combatant from "./Combatant";

const Pokemon = ({ getRandom }) => {
  const { id } = useParams();
  const temp = useLoaderData();
  const [pic, setPic] = useState(null);
  const [pic2, setPic2] = useState(null);
  const [fightar, setFightar] = useState([]);
  // const fightar = [];

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

  const updatePoke = (id) => {
    axios
      .put(`http://localhost:9000/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log("Not working because: ", err));
  };

  const fight = () => {
    setFightar([]);
    let hpone = pokemon.base.HP;
    let hptwo = pokemon2.base.HP;
    let count = 0;
    while (hpone > 0 && hptwo > 0) {
      if (getRandom(1, 2) == 1) {
        const dmg = Math.abs(
          Math.floor(
            pokemon.base.Attack * (getRandom(1, 10) / 10 + 1) -
              pokemon2.base.Defense
          )
        );
        hptwo -= dmg;
        setFightar((element) => [
          ...element,
          `${pokemon.name.english} ${String.fromCharCode(9876)} ${
            pokemon2.name.english
          } for ${dmg} dmg`,
        ]);
      } else {
        const dmg = Math.abs(
          Math.floor(
            pokemon2.base.Attack * (getRandom(1, 10) / 10 + 1) -
              pokemon.base.Defense
          )
        );
        hpone -= dmg;
        setFightar((element) => [
          ...element,
          `${pokemon2.name.english} ${String.fromCharCode(9876)} ${
            pokemon.name.english
          } for ${dmg} dmg`,
        ]);
      }
      count++;
    }
    if (hpone < hptwo) {
      setFightar((element) => [
        ...element,
        `${pokemon2.name.english} wins the fight in ${count} rounds!`,
      ]);
      if (isNaN(pokemon2.win)) {
        pokemon2.win = 1;
      } else {
        pokemon2.win += 1;
      }
      updatePoke(pokemon2._id, pokemon2);
    } else {
      setFightar(
        (element) => [
          ...element,
          `${pokemon.name.english} wins the fight in ${count} rounds!`,
        ],
        (pokemon.win = pokemon.win + 1)
      );
      if (isNaN(pokemon.win)) {
        pokemon.win = 1;
      } else {
        pokemon.win += 1;
        updatePoke(pokemon._id, pokemon);
      }

      // updatePoke(pokemon._id);
    }
  };

  // updatePoke(pokemon2._id)      updatePoke()

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
          <h2>VERSUS </h2>
          <button className="pic" onClick={() => fight()}>
            Fight!
          </button>
          {fightar.map((element, index) =>
            index !== fightar.length - 1 ? <p>{element}</p> : <h2>{element}</h2>
          )}
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

{
  /* <p>
            {pokemon.name} attacks {pokemon2.name} for {dmg}
            {pokemon.base.Attack - pokemon2.base.Defense} damage
          </p> */
}

{
  /* <p>
            {pokemon.name2} attacks {pokemon.name} for {dmg} damage
          </p> */
}
