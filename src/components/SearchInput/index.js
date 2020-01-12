import React from 'react';
import TextInput from "../TextInput";
import SearchIcon from '../../assets/vectors/search.svg';
import './index.scss';

function SearchInput(props = { type: 'text' })
{
    const propsFiltered = { ...props };
    delete(propsFiltered.onSearch);
    return (
        <TextInput {...propsFiltered}>
            <button className='search-input-button' onClick={props.onSearch}>
                <img src={SearchIcon} alt='Search Pokemóns button' />
            </button>
        </TextInput>
    );
}

export default SearchInput;
