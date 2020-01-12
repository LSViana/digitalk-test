import React from 'react';
import BlueSensor from '../../assets/vectors/blue-sensor.svg';
import RedRoundedButton from '../../assets/vectors/red-rounded-button.svg';
import GreenRoundedButton from '../../assets/vectors/green-rounded-button.svg';
import YellowRoundedButton from '../../assets/vectors/yellow-rounded-button.svg';
import BackgroundDecorationLine from '../../assets/vectors/background-decoration-line.svg';
import './index.scss';

class PokedexLayout extends React.Component {
    render() {
        return (
            <div className='pokedex-layout'>
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
                    <div>
                        @search
                    </div>
                </nav>
                <div className="background-decoration">
                    <img className='decoration-line' src={BackgroundDecorationLine} aria-hidden='true' />
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default PokedexLayout;

