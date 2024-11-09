import React from 'react';
import { AiOutlineCheckCircle as CheckCircle, AiOutlineCloseCircle as XCircle } from 'react-icons/ai';
import { FiAlertTriangle as AlertTriangle, FiInfo as Info, FiX as X, FiDownload as Download, FiPlus as Plus, FiPrinter as Printer, FiRefreshCw as RefreshCw, FiTrash2 as Trash2 } from 'react-icons/fi'; // Import Trash2

const Alert = ({ type = 'info', message, onClose }) => {
    const alertStyles = {
        base: "flex items-center p-4 border rounded-md",
        info: "bg-blue-50 border-blue-400 text-blue-700",
        success: "bg-green-50 border-green-400 text-green-700",
        warning: "bg-yellow-50 border-yellow-400 text-yellow-700",
        error: "bg-red-50 border-red-400 text-red-700",
    };

    const iconStyles = {
        info: <Info className="w-5 h-5 mr-3 text-blue-700" />,
        success: <CheckCircle className="w-5 h-5 mr-3 text-green-700" />,
        warning: <AlertTriangle className="w-5 h-5 mr-3 text-yellow-700" />,
        error: <XCircle className="w-5 h-5 mr-3 text-red-700" />,
    };

    return (
        <div className={`${alertStyles.base} ${alertStyles[type]}`}>
            {iconStyles[type]}
            <span className="flex-1">{message}</span>
            {onClose && (
                <button onClick={onClose} className="ml-4 focus:outline-none">
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export { CheckCircle, XCircle, AlertTriangle, Info, X, Download, Plus, Printer, RefreshCw, Trash2 }; // Add Trash2 to exports