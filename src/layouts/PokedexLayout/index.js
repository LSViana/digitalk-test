import React from 'react';
import BlueSensor from '../../assets/vectors/blue-sensor.svg';
import RedRoundedButton from '../../assets/vectors/red-rounded-button.svg';
import GreenRoundedButton from '../../assets/vectors/green-rounded-button.svg';
import YellowRoundedButton from '../../assets/vectors/yellow-rounded-button.svg';
import BackgroundDecorationLine from '../../assets/vectors/background-decoration-line.svg';
import PokeballSolidBlack from '../../assets/vectors/pokeball-solid-black.svg';
import './index.scss';
import SearchInput from "../../components/SearchInput";

class PokedexLayout extends React.Component {
    state = {
        searchText: ''
    };

    render() {
        return (
            <div className='pokedex-layout'>
                <div className="background-pokeball">
                    <img  src={PokeballSolidBlack} aria-hidden='true' alt='' />
                </div>
                <nav>
                    <div className="pokemon-buttons">
                        <img className='blue-sensor' src={BlueSensor} alt="Pokémon's blue sensor" />
                        <img className='red-rounded-button' src={RedRoundedButton} alt="Pokémon's red rounded button" />
                        <img className='yellow-rounded-button' src={YellowRoundedButton} alt="Pokémon's yellow rounded button" />
                        <img className='green-rounded-button' src={GreenRoundedButton} alt="Pokémon's green rounded button" />
                    </div>
                    <div className="pokedex-title">
                        <h1><span>Pokédex</span> with React.js</h1>
                    </div>
                    <SearchInput
                        value={this.state.searchText}
                        onChange={this.onSearchTextChange}
                        onSearch={this.onSearchClick}
                        className={['a']} placeholder='Search Pokémons'
                    />
                </nav>
                <div className="background-decoration">
                    <img src={BackgroundDecorationLine} aria-hidden='true' alt='' />
                </div>
                {this.props.children}
            </div>
        );
    }

    onSearchTextChange = (e) => {
        const searchText = e.target.value;
        this.setState({
            searchText,
        });
    };

    onSearchClick = () => {
        console.log('Search triggered');
    };
}

export default PokedexLayout;

