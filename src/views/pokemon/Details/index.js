import React from 'react';
import PageStatus from "../../../components/PageStatus";
import './index.scss';
import InflatedButton from "../../../components/InflatedButton";
import {connect} from "react-redux";
import {selectPokemon} from "../../../store/actions/pokemons";
import {ImageAPIRoot} from "../../../infrastructure";
import PokemonTypeBadge from "../../../components/PokemonTypeBadge";
import {Link} from "react-router-dom";

class PokemonDetails extends React.Component {
    componentDidMount() {
        selectPokemon(this.props.match.params.name);
    }

    render() {
        /* TODO Validate the edge case when there's no such Pokémon or the name is invalid */
        const { loadingSelected, selected } = this.props;
        let component;
        let pokemonName = this.props.match.params.name;
        // Verifying if the Pokémon should be updated based on name
        if(!loadingSelected && this.props.match.params.name !== selected.name) {
            selectPokemon(pokemonName);
        }
        if (loadingSelected || (selected == null || selected.id == null)) {
            component = (
                <div className='pokemon-loading'>
                    <p>Loading Pokémon data...</p>
                </div>
            );
        } else {
            const pokemon = selected;
            pokemonName = pokemon.formattedName ? pokemon.formattedName : pokemon.name;
            component = (
                <div className='pokemon-details'>
                    <div className="pokemon-image">
                        <img src={`${ImageAPIRoot}${pokemon.id}.png`} alt=""/>
                    </div>
                    <div className="pokemon-details-list">
                        <div className="pokemon-name">
                            <span>Name</span>
                            <h2>{pokemonName}</h2>
                        </div>
                        <div className="pokemon-number">
                            <span>Number</span>
                            <p>#{pokemon.id}</p>
                        </div>
                        {
                            pokemon.evolvesTo &&
                            <div className="pokemon-evolves-to">
                                <span>Evolves to</span>
                                <Link to={`/${pokemon.evolvesTo.name}`}>
                                    <p>
                                        {pokemon.evolvesTo.name.substr(0, 1).toUpperCase() + pokemon.evolvesTo.name.substr(1)}
                                    </p>
                                </Link>
                            </div>
                        }
                        <div className="pokemon-types">
                            <span>Types</span>
                            <div className="pokemon-types-list">
                                {
                                    pokemon.types.map(x => (
                                        <PokemonTypeBadge name={x.name} small key={x.name} />
                                    ))
                                }
                            </div>
                        </div>
                        <div className="pokemon-height">
                            <span>Height</span>
                            <p>{pokemon.height} decimetres</p>
                        </div>
                        <div className="pokemon-weight">
                            <span>Weight</span>
                            <p>{pokemon.weight} hectograms</p>
                        </div>
                    </div>
                </div>
            );
        }
        //
        return (
            <div className='page-details'>
                <div className='page-status-container'>
                    <PageStatus text={`Details about "${pokemonName}"`} className={['yellow']} />
                    <InflatedButton onClick={this.goBackToList}>
                        <p>Go back to list</p>
                    </InflatedButton>
                </div>
                {component}
            </div>
        );
    }

    goBackToList = () => {
        this.props.history.push({
            pathname: '/',
            search: ''
        });
    };
}

const mapStateToProps = state => ({
    loadingSelected: state.pokemons.loadingSelected,
    selected: state.pokemons.selected
});

export default connect(mapStateToProps)(PokemonDetails);
