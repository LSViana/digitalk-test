import React from 'react';
import './index.scss';
import PageStatus from "../../../components/PageStatus";

class PokemonList extends React.Component {
    state = {
        /**
         * This variable can be 'list' or 'filter' to indicate the current status of the list
         */
        status: 'list'
    };

    render() {
        return (
            <div className='page-list'>
                <PageStatus text='All Pokémons' className={[ this.state.status === 'list' ? 'blue' : 'green' ]} />
            </div>
        );
    }
}

export default PokemonList;
