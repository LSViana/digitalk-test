import {APIRoot} from "../../infrastructure";
import store from '../index';
import {ADD_POKEMON, UPDATE_SEARCH_POKEMON} from "../actionTypes";

const pokemonKey = 'pokemon';
const pokemonFetchInterval = 150;

export function fetchPokemons(onFinish = () => {}) {
    store.dispatch(async (dispatch) => {
        try {
            const state = store.getState();
            const pokemonsSpecies = state.pokemonsSpecies.list;
            const pokemonSpeciesNames = pokemonsSpecies.map(x => {
                return x.name
            });
            for(const speciesName of pokemonSpeciesNames) {
                let pokemon = localStorage.getItem(`${pokemonKey}-${speciesName}`);
                if(pokemon) {
                    // A cached value exists
                    pokemon = JSON.parse(pokemon);
                } else {
                    const response = await fetch(`${APIRoot}pokemon/${speciesName}`);
                    const data = await response.json();
                    pokemon = {
                        id: data.id,
                        name: data.name,
                        species: data.species,
                        types: data.types.map(x => x.type),
                        weight: data.weight,
                        height: data.height
                    };
                    localStorage.setItem(`${pokemonKey}-${speciesName}`, JSON.stringify(pokemon));
                    await new Promise(res => setTimeout(res, pokemonFetchInterval));
                }
                dispatch({
                    type: ADD_POKEMON,
                    pokemon
                });
            }
            onFinish();
        } catch (e) {
            // TODO Add error handler
            throw e;
        }
    });
}

export function updateSearch(query = '') {
    store.dispatch({
        type: UPDATE_SEARCH_POKEMON,
        query: query.trim(),
    });
}
