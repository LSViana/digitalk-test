import React from 'react';
import './index.scss';
import '../styles/bundle.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PokedexLayout from "../layouts/PokedexLayout";
import PokemonDetails from "../views/pokemon/Details";
import PokemonList from "../views/pokemon/List";
import {Provider} from "react-redux";
import store from '../store';

function App() {
  return (
      <div className="app">
        <BrowserRouter>
          <Provider store={store}>
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
          </Provider>
        </BrowserRouter>
      </div>
  );
}

export default App;
