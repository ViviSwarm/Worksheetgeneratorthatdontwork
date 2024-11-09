import React from 'react';

export const Select = ({ value, onValueChange, children }) => {
    return (
        <select value={value} onChange={(e) => onValueChange(e.target.value)} className="p-2 border rounded-md">
            {children}
        </select>
    );
};

export const SelectTrigger = ({ children, className = '' }) => {
    return (
        <div className={`cursor-pointer ${className}`}>{children}</div>
    );
};

export const SelectContent = ({ children }) => {
    return (
        <div className="p-2 bg-white rounded-md">{children}</div>
    );
};

export const SelectItem = ({ value, children }) => {
    return (
        <option value={value}>{children}</option>
    );
};

export const SelectValue = ({ children, placeholder }) => {
    return (
        <div className="text-gray-500">{children || placeholder}</div>
    );
};