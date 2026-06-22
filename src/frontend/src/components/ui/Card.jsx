import React from 'react';

const Card = ({ children, className = '', style = {} }) => {
    return (
        <div className={`card ${className}`} style={{ padding: '32px', ...style }}>
            {children}
        </div>
    );
};

export default Card;
