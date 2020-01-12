import React from 'react';
import './index.scss';
import LeftMarker from '../../assets/vectors/left-marker.svg';

function PageStatus(props = { text: '' }) {
    return (
        <div className={['page-status', ...(props.className || [])].join(' ')}>
            <img src={LeftMarker} alt='' className='left-marker'/>
            <div className="text-area">
                <p>{props.text}</p>
            </div>
        </div>
    );
}

export default PageStatus;
