import React from 'react';
import './index.scss';

function TextInput(props = { type: 'text' }) {
    const propsNoChildren = { ...props, children: null };
    return (
        <div className='text-input-container'>
            <input {...propsNoChildren} className={ ['text-input', ...(props.className || []) ].join(' ') } />
            {props.children}
        </div>
    );
}

export default TextInput;
