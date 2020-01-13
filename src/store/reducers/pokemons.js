import {
    ADD_POKEMON,
    ADD_POKEMONS, LOADING_POKEMON_LIST,
    LOADING_POKEMON_SELECTED,
    SELECT_POKEMON,
    UPDATE_POKEMON,
    UPDATE_SEARCH_POKEMON
} from "../actionTypes";

const initialState = {
    list: [],
    loadingList: false,
    selected: {},
    loadingSelected: false,
    query: '',
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_POKEMONS:
            return {
                ...state,
                list: action.pokemons.slice().sort((x, y) => x.id - y.id),
            };
        case ADD_POKEMON:
            return {
                ...state,
                list: [
                    ...state.list,
                    action.pokemon
                ].slice().sort((x, y) => x.id - y.id),
            };
        case UPDATE_POKEMON:
            return {
                ...state,
                list: state.list.map(x => {
                    if(x.id === action.pokemon.id) {
                        return action.pokemon
                    }
                    return x;
                }),
            };
        case SELECT_POKEMON:
            return {
                ...state,
                selected: state.list.filter(x => x.id === action.id)[0] || {}
            };
        case UPDATE_SEARCH_POKEMON:
            return {
                ...state,
                query: action.query
            };
        case LOADING_POKEMON_SELECTED:
            return {
                ...state,
                loadingSelected: action.loading,
            };
        case LOADING_POKEMON_LIST:
            return {
                ...state,
                loadingList: action.loading,
            };
        default:
            return state;
    }
}
