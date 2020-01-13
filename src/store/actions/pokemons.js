import {APIRoot} from "../../infrastructure";
import store from '../index';
import {ADD_POKEMON, LOADING_POKEMON_SELECTED, LOADING_POKEMON_LIST, SELECT_POKEMON, UPDATE_POKEMON, UPDATE_SEARCH_POKEMON} from "../actionTypes";

const pokemonKey = 'pokemon';
const pokemonFetchInterval = 150;
const pokemonLoadInterval = 75;

async function fetchPokemon(speciesName, pokemon) {
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
    return pokemon;
}

async function pokemonFetchDetails(pokemon) {
    const name = pokemon.name;
    const responseSpecies = await fetch(pokemon.species.url);
    const dataSpecies = await responseSpecies.json();
    const responseEvolutionChain = await fetch(dataSpecies.evolution_chain.url);
    const dataEvolutionChain = await responseEvolutionChain.json();
    // Get formatted 'en' name and the evolvesTo property
    const formattedName = dataSpecies.names.filter(x => x.language.name === 'en')[0].name;
    let chain = dataEvolutionChain.chain;
    while (chain != null && chain.species.name !== name) {
        chain = chain.evolves_to[0];
    }
    // Step once more to get the evolution data about this Pokémon
    chain = chain.evolves_to[0];
    const evolvesTo = chain != null ? chain.species : null;
    // Saving the data fetched
    pokemon.formattedName = formattedName;
    if (evolvesTo) {
        pokemon.evolvesTo = evolvesTo;
    }
}

function getSpeciesIdFromUrl(species) {
    return species.url.substr(species.url.lastIndexOf("/", species.url.length - 2) + 1).slice(0, -1);
}

export function fetchPokemons(onFinish = () => {}) {
    store.dispatch(async (dispatch) => {
        try {
            dispatch({
                type: LOADING_POKEMON_LIST,
                loading: true
            });
            let state = store.getState();
            const pokemonsSpecies = state.pokemonsSpecies.list.slice().sort((x, y) => {
                const xId = getSpeciesIdFromUrl(x);
                const yId = getSpeciesIdFromUrl(y);
                return xId - yId;
            });
            const pokemonSpeciesNames = pokemonsSpecies.map(x => {
                return x.name
            });
            for(const speciesName of pokemonSpeciesNames) {
                let pokemon = localStorage.getItem(`${pokemonKey}-${speciesName}`);
                if(pokemon) {
                    // A cached value exists
                    pokemon = JSON.parse(pokemon);
                    await new Promise(res => setTimeout(res, pokemonLoadInterval));
                } else {
                    pokemon = await fetchPokemon(speciesName, pokemon);
                    localStorage.setItem(`${pokemonKey}-${speciesName}`, JSON.stringify(pokemon));
                    await new Promise(res => setTimeout(res, pokemonFetchInterval));
                }
                // Getting updated version of state to avoid
                // reinserting the same Pokémon more than once
                state = store.getState();
                if(state.pokemons.list.filter(x => x.id === pokemon.id).length === 0) {
                    dispatch({
                        type: ADD_POKEMON,
                        pokemon
                    });
                }
            }
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

export function updateSearch(query = '') {
    store.dispatch({
        type: UPDATE_SEARCH_POKEMON,
        query: query.trim(),
    });
}

export function selectPokemon(name = '') {
    try {
        store.dispatch(async (dispatch) => {
            dispatch({
                type: LOADING_POKEMON_SELECTED,
                loading: true
            });
            const state = store.getState();
            // Get Pokémon
            let pokemon = state.pokemons.list.filter(x => x.name === name)[0];
            // Is the Pokémon loaded into Redux
            if(!pokemon) {
                // Is the Pokémon saved in localStorage?
                pokemon = localStorage.getItem(`${pokemonKey}-${name}`);
                if(pokemon) {
                    // A cached value exists
                    pokemon = JSON.parse(pokemon);
                } else {
                    pokemon = await fetchPokemon(name, pokemon);
                    localStorage.setItem(`${pokemonKey}-${name}`, JSON.stringify(pokemon));
                }
                dispatch({
                    type: ADD_POKEMON,
                    pokemon
                });
            }
            // Fetch the Pokémon details, like formattedName if it's not there yet
            if(!pokemon.formattedName) {
                await pokemonFetchDetails(pokemon);
                // Saving Pokémon data to localStorage
                localStorage.setItem(`${pokemonKey}-${name}`, JSON.stringify(pokemon));
                dispatch({
                    type: UPDATE_POKEMON,
                    pokemon
                });
            }
            dispatch({
                type: SELECT_POKEMON,
                id: pokemon.id
            });
            dispatch({
                type: LOADING_POKEMON_SELECTED,
                loading: false
            });
        });
    } catch(e) {
        // TODO Add error handler
        throw e;
    }
}
