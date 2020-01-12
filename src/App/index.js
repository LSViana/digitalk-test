import React from 'react';
import './index.scss';
import '../styles/bundle.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PokedexLayout from "../layouts/PokedexLayout";
import PokemonDetails from "../views/pokemon/Details";
import PokemonList from "../views/pokemon/List";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PokedexLayout>
          <Switch>
            <Route exact path='/' component={PokemonList} />
            <Route path='/pokemon/:name' component={PokemonDetails} />
            <Route path='*'>
              {/* TODO Create the not found page component */}
              <h1>Page not found.</h1>
            </Route>
          </Switch>
        </PokedexLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
