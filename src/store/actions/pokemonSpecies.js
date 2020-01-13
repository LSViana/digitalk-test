import { APIRoot } from "../../infrastructure";
import store from '../index';
import {ADD_POKEMON_SPECIES, LOADING_POKEMON_LIST} from "../actionTypes";

const pokemonSpeciesKey = 'pokemon-species';

export function fetchPokemonSpecies(onFinish = () => {}) {
    store.dispatch(async (dispatch) => {
        try {
            dispatch({
                type: LOADING_POKEMON_LIST,
                loading: true
            });
            let pokemonSpecies = localStorage.getItem(pokemonSpeciesKey);
            // Verify if there is a cached value
            if (pokemonSpecies) {
                // A cached value exists
                pokemonSpecies = JSON.parse(pokemonSpecies);
            } else {
                const response = await fetch(APIRoot + 'generation/1');
                const data = await response.json();
                pokemonSpecies = data.pokemon_species;
                localStorage.setItem(pokemonSpeciesKey, JSON.stringify(pokemonSpecies));
            }
            dispatch({
                type: ADD_POKEMON_SPECIES,
                pokemonSpecies,
            });
            onFinish();
        } catch (e) {
            // TODO Add error handler
            throw e;
        } finally {
            dispatch({
                type: LOADING_POKEMON_LIST,
                loading: false
            });
        }
    });
}
