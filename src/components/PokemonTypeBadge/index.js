import React from 'react';
import './index.scss';

class PokemonTypeBadge extends React.Component {
    render() {
        return (
            <div className={`pokemon-type-badge ` + this.props.name}>
                <p>{this.props.name.substr(0, 1).toUpperCase() + this.props.name.substr(1)}</p>
                {/* TODO Add image source */}
                {/*<img alt={`Type ${this.props.name}`}/>*/}
            </div>
        );
    }
}

export default PokemonTypeBadge;
