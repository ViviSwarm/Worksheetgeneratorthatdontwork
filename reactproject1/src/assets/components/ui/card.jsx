import React from 'react';

export const Card = ({ children, className = '' }) => {
    return (
        <div className={`p-4 border rounded-lg shadow-md ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children }) => {
    return (
        <div className="mb-4">{children}</div>
    );
};

export const CardTitle = ({ children }) => {
    return (
        <h2 className="text-xl font-semibold">{children}</h2>
    );
};

export const CardContent = ({ children }) => {
    return (
        <div className="text-sm text-gray-700">{children}</div>
    );
};