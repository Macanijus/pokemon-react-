import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const PokemonInfo = ({}) => {
  const { id, info } = useParams();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);
  /* const [keys, setKeys] = useState(null); */
  let keys = null;
  let check = true;

  const fetchData = (url) => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setItem(res.data);
      })
      .catch((err) => console.log("Not working because: ", err));
  };

  useEffect(() => {
    fetchData(`http://localhost:9000/pokemon/${id}/${info}`);
  }, [info]);

  useEffect(() => {
    /* setLoading((prev) => !prev); */
    if (check) {
      check = false;
    } else {
      /* setLoading(!true); */
    }
  }, [item]);

  return (
    <div>
      {loading ? (
        <div>
          <p>Loading...</p>
          <Link to={`/pokemon/${id}/name`}>
            <button>Name</button>
          </Link>
          <Link to={`/pokemon/${id}/type`}>
            <button>Type</button>
          </Link>
          <Link to={`/pokemon/${id}/base`}>
            <button>Base</button>
          </Link>
          <button onClick={() => setLoading((prev) => !prev)}>Loading</button>
        </div>
      ) : (
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

            {/* {item?.map((element) => (
              <h2>{element}</h2>
            ))} */}

            <p></p>
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

export default PokemonInfo;
