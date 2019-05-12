import React from 'react';

import icon from './death_star_explosion.gif';
import './error-indicator.css';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
        <img src={ icon } alt="Error icon" />
            <span className="boom">BOOM!</span>
            <span>
                Something has gone terribly wrong
            </span>
            <span>
                (but we already send droids to fix it)
            </span>
        </div>
    )
};

export default ErrorIndicator;