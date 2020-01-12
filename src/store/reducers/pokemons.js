import {ADD_POKEMON, ADD_POKEMONS, SELECT_POKEMON} from "../actionTypes";

const initialState = {
  list: [],
  selectedPokemon: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_POKEMONS:
            return {
                ...state,
                list: action.pokemons
            };
            return;
        case ADD_POKEMON:
            return {
                ...state,
                list: [
                    ...state.list,
                    action.pokemon
                ],
            };
        case SELECT_POKEMON:
            return {
                ...state,
                selectedPokemon: state.list.filter(x => x.id === action.id)[0] || {}
            };
        default:
            return state;
    }
}
