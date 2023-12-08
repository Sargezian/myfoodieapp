import React, { createContext, useContext, useState } from 'react';

const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const setNewDate = (newDate) => {
        setSelectedDate(newDate);
    };

    return (
        <DateContext.Provider value={{ selectedDate, setNewDate }}>
            {children}
        </DateContext.Provider>
    );
};

export const useDate = () => {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error('useDate must be used within a DateProvider');
    }
    return context;
};
