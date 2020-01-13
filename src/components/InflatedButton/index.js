import React from 'react';
import './index.scss';

class InflatedButton extends React.Component {
    render() {
        return (
            <div className='inflated-button' onClick={this.props.onClick}>
                <div className="background-decoration"/>
                {this.props.children}
            </div>
        );
    }
}

export default InflatedButton;
