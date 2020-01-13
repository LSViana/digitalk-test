import React from 'react';
import './index.scss';
import InlineSVG from "react-inlinesvg";

class PokemonTypeBadge extends React.Component {
    render() {
        const small = this.props.small;
        return (
            <div className={['pokemon-type-badge', this.props.name, (small ? 'small' : '')].join(' ')}>
                <p>{this.props.name.substr(0, 1).toUpperCase() + this.props.name.substr(1)}</p>
                {/*<img src={`/assets/vectors/pokemon-types/${this.props.name}.svg`} alt={`Type ${this.props.name}`}/>*/}
                <InlineSVG className='pokemon-type-icon' src={require(`../../assets/vectors/pokemon-types/${this.props.name}.svg`)} />
            </div>
        );
    }
}

export default PokemonTypeBadge;
