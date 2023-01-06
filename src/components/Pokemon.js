import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Pokemon = ({}) => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  //const pokemon = pokemons.find((element) => element.id === Number(id) - 1);

  useEffect(() => {
    fetchData(`http://localhost:9000/pokemon/${id}`);
  }, []);

  const fetchData = (url) => {
    axios
      .get(url)
      .then((res) => {
        setPokemon(res.data);
      })
      .catch((err) => console.log("Not working because: ", err));
  };

  useEffect(() => {
    setLoading(false);
  }, [pokemon]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Name: {pokemon?.name.english}</h1>
          <h2>Attack: {pokemon?.base.Attack}</h2>
          <h2>HP: {pokemon?.base.HP}</h2>
          <h2>Defense: {pokemon?.base.Defense}</h2>
          <div>
            <h2>Type:</h2>
            {pokemon?.type.map((item, index) => (
              <h2 key={index}>{item}</h2>
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
      )}
    </div>
  );
};

export default Pokemon;
