import React from 'react';
import {connect} from "react-redux";
import PageStatus from "../../../components/PageStatus";
import PokemonTypeBadge from "../../../components/PokemonTypeBadge";
import {fetchPokemonSpecies} from '../../../store/actions/pokemonSpecies';
import {fetchPokemons} from "../../../store/actions/pokemons";
import {ImageAPIRoot} from "../../../infrastructure";
import {Link} from "react-router-dom";
import './index.scss';

class PokemonList extends React.Component {
    state = {
        /**
         * This variable can be 'list' or 'filter' to indicate the current status of the list
         */
        status: 'list'
    };

    componentDidMount() {
        fetchPokemonSpecies(fetchPokemons);
    }

    render() {
        const pokemonElements = this.props.pokemons.list.map(x => (
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
                <PageStatus text='All Pokémons' className={[ this.state.status === 'list' ? 'blue' : 'green' ]} />
                <ul className='pokemons-list'>
                    {pokemonElements}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pokemons: state.pokemons,
});

export default connect(mapStateToProps)(PokemonList);
