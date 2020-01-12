import { combineReducers } from "redux";
import pokemons from './reducers/pokemons';
import pokemonsSpecies from './reducers/pokemonSpecies';

const rootReducer = combineReducers({
    pokemons,
    pokemonsSpecies
});

export default rootReducer;
