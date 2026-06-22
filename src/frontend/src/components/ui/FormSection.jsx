import React from 'react';

const FormSection = ({ title, children, style = {} }) => {
    return (
        <div style={{ marginBottom: '24px', ...style }}>
            <h3 style={{ 
                color: 'var(--text-main)', 
                fontSize: '16px', 
                margin: '0 0 16px 0', 
                borderBottom: '1px solid var(--border-color)', 
                paddingBottom: '8px',
                fontWeight: '600'
            }}>
                {title}
            </h3>
            {children}
        </div>
    );
};

export default FormSection;
