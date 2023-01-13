import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";

const PokemonInfo = ({}) => {
  const { id, info } = useParams();
  let keys = null;
  const fetchedData = useLoaderData().pokemonInfo;
  const item = fetchedData[info];

  console.log("first ", fetchedData);

  return (
    <div className="card">
      <div>
        <div>
          <h2>{info.charAt(0).toUpperCase() + info.slice(1)}:</h2>
          {Array.isArray(item)
            ? item?.map((element, index) => <h2 key={index}>{element}</h2>)
            : ((keys = Object.keys(item)),
              keys.map((element, index) => (
                <h2 key={index}>
                  {element.charAt(0).toUpperCase() + element.slice(1)}:{" "}
                  {item[element]}
                </h2>
              )))}
        </div>
        <Link to={`/pokemon/${id}/name`}>
          <button className="pic">Name</button>
        </Link>
        <Link to={`/pokemon/${id}/type`}>
          <button className="pic">Type</button>
        </Link>
        <Link to={`/pokemon/${id}/base`}>
          <button className="pic">Base</button>
        </Link>
        <Link to={`/pokemon/${id}/`}>
          <button className="pic">Back to Pokemon</button>
        </Link>
        <Link to={`/`}>
          <button className="pic">Back to all Pokemons</button>
        </Link>
      </div>
    </div>
  );
};

export default PokemonInfo;
