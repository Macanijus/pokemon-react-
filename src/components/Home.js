import React, { useEffect, useState, useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Pagination from "./Pagination";
import "../App.css";

const Home = ({ getRandom }) => {
  const [searchedPokemons, setSearchedPokemons] = useState([]);
  const firstRun = useRef(true);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("english");
  const [open, setOpen] = useState(false);
  let pic = null;
  const pokemons = useLoaderData().pokemons;

  console.log(pokemons);

  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(18);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = pokemons.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


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
    <div>
      <h1 className="choose">Choose your Fighter!</h1>
      <div className="choose">
        <div className="search">
          <input
            className="search-input"
            type="text"
            size="18"
            placeholder="Search"
            onChange={changeHandler}
            value={input}
          />
        </div>

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
      <div className="flex">
        <div className="pokedex">
          {searchedPokemons.length
            ? searchedPokemons?.map((pokemon, index) => (
                <div className="pokemonsDisplay">
                  <Link
                    key={index}
                    to={`/pokemon/${pokemon._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <h1>{pokemon.name.english}</h1>
                  </Link>
                </div>
              ))
            : currentArticles?.map((pokemon, index) => (
                <div className="pokemonsDisplay">
                  {console.log(pokemon.name)}
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
      </div>
      <div className="pagination">
        <Pagination
          /*         nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} */
          articlesPerPage={articlesPerPage}
          totalArticles={pokemons.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Home;
