import React from 'react';

export const Input = ({ value, onChange, className = '', ...props }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            className={`p-2 border rounded-md ${className}`}
            {...props}
        />
    );
};