import {APIRoot} from "../../infrastructure";
import store from '../index';
import {ADD_POKEMON, ADD_POKEMONS} from "../actionTypes";

const pokemonKey = 'pokemon';
const pokemonFetchInterval = 150;

export function fetchPokemons(onFinish = () => {}) {
    store.dispatch(async (dispatch) => {
        try {
            const state = store.getState();
            const pokemonsSpecies = state.pokemonsSpecies.list;
            const pokemonSpeciesIds = pokemonsSpecies.map(x => {
                return Number(x.url.substr(x.url.lastIndexOf("/", x.url.length - 2) + 1).replace('/', ''));
            });
            for(const speciesId of pokemonSpeciesIds) {
                let pokemon = localStorage.getItem(`${pokemonKey}-${speciesId}`);
                if(pokemon) {
                    // A cached value exists
                    pokemon = JSON.parse(pokemon);
                } else {
                    const response = await fetch(`${APIRoot}pokemon/${speciesId}`);
                    const data = await response.json();
                    pokemon = {
                        id: data.id,
                        name: data.name,
                        species: data.species,
                        types: data.types.map(x => x.type),
                        weight: data.weight,
                        height: data.height
                    };
                    localStorage.setItem(`${pokemonKey}-${speciesId}`, JSON.stringify(pokemon));
                }
                dispatch({
                    type: ADD_POKEMON,
                    pokemon
                });
                await new Promise(res => setTimeout(res, pokemonFetchInterval));
            }
            onFinish();
        } catch (e) {
            // TODO Add error handler
            throw e;
        }
    });
}
