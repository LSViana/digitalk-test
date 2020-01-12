import React from 'react';

class PokemonDetails extends React.Component {
    render() {
        /* TODO Validate the edge case when there's no such Pokémon or the name is invalid */
        const pokemonName = this.props.match.params.name;
        //
        return (
            <div>
                <h1>Pokémon Details</h1>
                <p>{pokemonName}</p>
            </div>
        );
    }
}

export default PokemonDetails;
