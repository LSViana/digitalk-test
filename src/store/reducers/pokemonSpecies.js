import {ADD_POKEMON_SPECIES} from "../actionTypes";

const initialState = {
  list: [],
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_POKEMON_SPECIES:
            return {
                list: action.pokemonSpecies
            };
        default:
            return state;
    }
}
