import React from 'react';
import BlueSensor from '../../assets/vectors/blue-sensor.svg';
import RedRoundedButton from '../../assets/vectors/red-rounded-button.svg';
import GreenRoundedButton from '../../assets/vectors/green-rounded-button.svg';
import YellowRoundedButton from '../../assets/vectors/yellow-rounded-button.svg';
import BackgroundDecorationLine from '../../assets/vectors/background-decoration-line.svg';
import PokeballSolidBlack from '../../assets/vectors/pokeball-solid-black.svg';
import SearchInput from "../../components/SearchInput";
import './index.scss';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {updateSearch} from "../../store/actions/pokemons";

class PokedexLayout extends React.Component {
    state = {
        pokemonQuery: ''
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // This code could be changed to a second seachProperty
        // that's not used to actually filter, but in the midtime when user is typing
        if(this.props.pokemonQuery !== nextProps.pokemonQuery) {
            this.setState({
                pokemonQuery: nextProps.pokemonQuery
            });
        }
        // Same as React default implementation
        return true;
    }

    render() {
        return (
            <div className='pokedex-layout'>
                <div className="background-pokeball">
                    <img  src={PokeballSolidBlack} aria-hidden='true' alt='' />
                </div>
                <nav>
                    <Link to='/'>
                        <div className="pokemon-buttons">
                            <img className='blue-sensor' src={BlueSensor} alt="Pokémon's blue sensor" />
                            <img className='red-rounded-button' src={RedRoundedButton} alt="Pokémon's red rounded button" />
                            <img className='yellow-rounded-button' src={YellowRoundedButton} alt="Pokémon's yellow rounded button" />
                            <img className='green-rounded-button' src={GreenRoundedButton} alt="Pokémon's green rounded button" />
                        </div>
                    </Link>
                    <div className="pokedex-title">
                        <Link to='/'>
                            <h1><span>Pokédex</span> with React.js</h1>
                        </Link>
                    </div>
                    <SearchInput
                        value={this.state.pokemonQuery}
                        onChange={this.onSearchTextChange}
                        onSearch={this.onSearchClick}
                        className={['a']} placeholder='Search Pokémons'
                    />
                </nav>
                <div className="background-decoration">
                    <img src={BackgroundDecorationLine} aria-hidden='true' alt='' />
                </div>
                <div className="children-wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }

    onSearchTextChange = (e) => {
        const pokemonQuery = e.target.value;
        // Updating state
        this.setState({
            pokemonQuery,
        });
    };

    onSearchClick = () => {
        updateSearch(this.state.pokemonQuery);
    };
}

const mapStateToProps = state => ({
    pokemonQuery: state.pokemons.query
});

export default withRouter(connect(mapStateToProps)(PokedexLayout));

