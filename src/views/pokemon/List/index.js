import React from 'react';
import {connect} from "react-redux";
import PageStatus from "../../../components/PageStatus";
import PokemonTypeBadge from "../../../components/PokemonTypeBadge";
import {fetchPokemonSpecies} from '../../../store/actions/pokemonSpecies';
import {fetchPokemons, updateSearch} from "../../../store/actions/pokemons";
import {ImageAPIRoot} from "../../../infrastructure";
import {Link} from "react-router-dom";
import './index.scss';
import InflatedButton from "../../../components/InflatedButton";

class PokemonList extends React.Component {
    state = {
        /**
         * This variable can be 'list' or 'filter' to indicate the current status of the list
         */
        status: 'list'
    };

    componentDidMount() {
        if(this.props.pokemons.list.length === 0) {
            fetchPokemonSpecies(fetchPokemons);
        }
    }

    render() {
        const pokemonQuery = this.props.pokemons.query.trim();
        const pokemonQueryUpperCase = pokemonQuery.toUpperCase();
        const filteredPokemons = pokemonQuery.length > 0 ?
            this.props.pokemons.list.filter(x => x.name.toUpperCase().indexOf(pokemonQueryUpperCase) !== -1) :
            this.props.pokemons.list;
        const pokemonElements = filteredPokemons.map(x => (
            <li key={x.id}>
                <Link to={`/pokemon/${x.name}`}>
                    <img className='pokemon-image' src={`${ImageAPIRoot}${x.id}.png`} alt={x.name}/>
                    <div className='pokemon-data'>
                        <div className="pokemon-name">
                            <p>{x.name.substr(0, 1).toUpperCase()}{x.name.substr(1)}</p>
                            <span>#{x.id}</span>
                        </div>
                        <div className="pokemon-types">
                            {x.types.map(y => y.name).map(name => (
                                <PokemonTypeBadge key={name} name={name}/>
                            ))}
                        </div>
                    </div>
                </Link>
            </li>
        ));
        return (
            <div className='page-list'>
                <div className='page-status'>
                    <PageStatus text={pokemonQuery.length === 0 ? 'All Pokémons' : `Filtering by "${pokemonQuery}"`} className={[ pokemonQuery.length === 0 ? 'blue' : 'green' ]} />
                    {pokemonQuery.length > 0 && (
                        <InflatedButton onClick={this.clearSearchFilter}>
                            <p>Clear search filter</p>
                        </InflatedButton>
                    )}
                </div>
                <ul className='pokemons-list'>
                    {pokemonElements}
                </ul>
            </div>
        );
    }

    clearSearchFilter = () => {
        updateSearch('');
    }
}

const mapStateToProps = state => ({
    pokemons: state.pokemons,
});

export default connect(mapStateToProps)(PokemonList);
