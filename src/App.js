import "./App.css";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";
import PokemonInfo from "./components/PokemonInfo";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Home getRandom={getRandom} />}
          loader={async () => {
            const data = await fetch(`http://localhost:9000/pokemons`);
            if (data.status === 404) {
              throw new Response("Not Found", { status: 404 });
            }
            return data;
          }}
        />
        <Route
          path="/pokemon/:id"
          element={<Pokemon getRandom={getRandom} />}
          loader={async ({ params: { id } }) => {
            const data = await fetch(`http://localhost:9000/pokemons/${id}`);
            if (data.status === 404) {
              throw new Response("Not Found", { status: 404 });
            }
            return data;
          }}
        />
        <Route
          path="/pokemon/:id/:info"
          element={<PokemonInfo />}
          loader={async ({ params: { id, info } }) => {
            const data = await fetch(
              `http://localhost:9000/pokemons/${id}/${info}`
            );
            return data;
          }}
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
