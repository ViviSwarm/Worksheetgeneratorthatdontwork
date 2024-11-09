import React from 'react';

export const Badge = ({ children, variant = 'default', className = '', onClick }) => {
    const variants = {
        default: 'bg-gray-100 text-gray-700',
        outline: 'bg-transparent border border-gray-300 text-gray-700',
        primary: 'bg-blue-100 text-blue-700',
        success: 'bg-green-100 text-green-700'
    };

    return (
        <span
            onClick={onClick}
            className={`inline-block py-1 px-2 text-xs rounded-md cursor-pointer ${variants[variant]} ${className}`}
        >
            {children}
        </span>
    );
};