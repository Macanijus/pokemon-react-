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
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Home />}
          loader={async () => {
            return fetch(`http://localhost:9000/pokemons`);
          }}
        />
        <Route
          path="/pokemon/:id"
          element={<Pokemon />}
          loader={async ({ params: { id } }) => {
            return fetch(`http://localhost:9000/pokemons/${id}`);
          }}
        />
        <Route
          path="/pokemon/:id/:info"
          element={<PokemonInfo />}
          loader={async ({ params: { id, info } }) => {
            return fetch(`http://localhost:9000/pokemons/${id}/${info}`);
          }}
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
