// Captain Context - manages captain state and operations
import { createContext, useState, useContext } from 'react';

// Create context for captain data sharing across components
export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    // Captain state management
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Helper function to update captain data
    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    // Context value object containing all captain-related state and functions
    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;