import React, { useEffect, useState, useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Home = ({ getRandom }) => {
  const [searchedPokemons, setSearchedPokemons] = useState([]);
  const firstRun = useRef(true);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("english");
  const [open, setOpen] = useState(false);
  let pic = null;
  const pokemons = useLoaderData().pokemons;

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const findPokemon = () => {
    if (pokemons && input) {
      const result = input
        ? pokemons.filter((poke) =>
            poke.name.english.toLowerCase().includes(input)
          )
        : [];
      setSearchedPokemons(result);
    }
  };

  let rando = pokemons[getRandom(1, pokemons.length)]._id;

  useEffect(() => {
    findPokemon();
  }, [input]);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="home">
      <h1 className="choose">Choose your Fighter!</h1>
      <div className="choose">
        <input
          className="search-input"
          type="text"
          size="18"
          placeholder="Search (en only)"
          onChange={changeHandler}
          value={input}
        />
        <Link to={`/pokemon/${rando}`} style={{ textDecoration: "none" }}>
          <button className="pic">Gimme Random Poke</button>
        </Link>

        <button className="pic" onClick={handleOpen}>
          Languages
        </button>

        {open ? (
          <ul className="menu">
            <button className="pic" onClick={() => setLang("english")}>
              English
            </button>
            <button className="pic" onClick={() => setLang("french")}>
              French
            </button>
            <button className="pic" onClick={() => setLang("chinese")}>
              Chinese
            </button>
            <button className="pic" onClick={() => setLang("japanese")}>
              Japanese
            </button>
          </ul>
        ) : null}
      </div>

      {searchedPokemons?.length
        ? searchedPokemons?.map((pokemon, index) => (
            <div className="pokemonsDisplay">
              <Link
                key={index}
                to={`/pokemon/${pokemon._id}`}
                style={{ textDecoration: "none" }}
              >
                <h1>{pokemon.name[lang]}</h1>
              </Link>
            </div>
          ))
        : pokemons?.map((pokemon, index) => (
            <div className="pokemonsDisplay">
              <Link
                key={index}
                to={`/pokemon/${pokemon._id}`}
                style={{ textDecoration: "none" }}
              >
                <h1>{pokemon.name[lang]}</h1>
              </Link>
            </div>
          ))}
    </div>
  );
};

export default Home;
