import React from 'react';
import './index.scss';
import {connect} from "react-redux";
import PageStatus from "../../../components/PageStatus";
import PokemonTypeBadge from "../../../components/PokemonTypeBadge";
import {fetchPokemonSpecies} from '../../../store/actions/pokemonSpecies';
import {fetchPokemons, updateSearch} from "../../../store/actions/pokemons";
import {ImageAPIRoot} from "../../../infrastructure";
import {Link} from "react-router-dom";
import InflatedButton from "../../../components/InflatedButton";

const defaultListSize = 8;

class PokemonList extends React.Component {
    state = {
        /**
         * This variable can be 'list' or 'filter' to indicate the current status of the list
         */
        status: 'list',
        listSize: defaultListSize,
        listSizeIncrementStep: 8,
    };

    componentDidMount() {
        // Fetching Pokémons if they're not being loaded already
        if(!this.props.pokemons.loadingList) {
            fetchPokemonSpecies(fetchPokemons);
        }
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // Updating the listSize when the Pokémon query changes,
        // because it may display a whole list on empty query string
        if(this.props.pokemons.query !== nextProps.pokemons.query) {
            this.setState({
                listSize: defaultListSize
            });
        }
        // Same as React default implementation
        return true;
    }

    render() {
        const remainingPokemonsToLoad = this.props.pokemonsSpecies.list.length - this.props.pokemons.list.length;
        const loadingPokemons = this.props.pokemons.loadingList && remainingPokemonsToLoad > 0;
        const pokemonQuery = this.props.pokemons.query.trim();
        const pokemonQueryUpperCase = pokemonQuery.toUpperCase();
        const filteredPokemons = pokemonQuery.length > 0 ?
            this.props.pokemons.list.filter(x => x.name.toUpperCase().indexOf(pokemonQueryUpperCase) !== -1) :
            this.props.pokemons.list;
        const pokemonElements = filteredPokemons.slice(0, this.state.listSize).map(x => (
            <li key={x.id}>
                <Link to={`/${x.name}`}>
                    <img className='pokemon-image' src={`${ImageAPIRoot}${x.id}.png`} alt={x.name}/>
                    <div className='pokemon-data'>
                        <div className="pokemon-name">
                            <p>{x.name.substr(0, 1).toUpperCase()}{x.name.substr(1)}</p>
                            <span>#{x.id}</span>
                        </div>
                        <div className="pokemon-types">
                            {x.types.map(y => y.name).map(name => (
                                <PokemonTypeBadge key={name} name={name} small />
                            ))}
                        </div>
                    </div>
                </Link>
            </li>
        ));
        return (
            <div className='page-list'>
                <div className='page-status-container'>
                    <PageStatus text={pokemonQuery.length === 0 ? 'All Pokémons' : `Filtering by "${pokemonQuery}"`} className={[ pokemonQuery.length === 0 ? 'blue' : 'green' ]} />
                    <React.Fragment>
                        {pokemonQuery.length > 0 && (
                            <InflatedButton onClick={this.clearSearchFilter}>
                                <p>Clear search filter</p>
                            </InflatedButton>
                        )}
                        {loadingPokemons && (
                            <p className='loading-pokemons'>Loading Pokémons ({remainingPokemonsToLoad} left)...</p>
                        )}
                    </React.Fragment>
                </div>
                <ul className='pokemons-list'>
                    {pokemonElements}
                </ul>
                <div ref={e => this.scrollGuard = e}/>
            </div>
        );
    }

    clearSearchFilter = () => {
        updateSearch('');
    };

    onScroll = () => {
        /** @type {DOMRect} */
        const clientRect = this.scrollGuard.getClientRects()[0];
        // 300 is a hardcoded offset, it may be changed according to the application
        const elementVisible = (clientRect.top - window.innerHeight) <= 300;
        if(elementVisible && this.state.listSize < this.props.pokemonsSpecies.list.length) {
            this.setState(state =>({
               listSize: state.listSize + state.listSizeIncrementStep,
            }));
        }
    }
}

const mapStateToProps = state => ({
    pokemons: state.pokemons,
    pokemonsSpecies: state.pokemonsSpecies,
});

export default connect(mapStateToProps)(PokemonList);
