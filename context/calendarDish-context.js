import React, { createContext, useContext, useState } from 'react';

const DishContext = createContext();

export const DishProvider = ({ children }) => {
    const [addedDishes, setAddedDishes] = useState([]);

    const addToDishes = (dishId) => {
        setAddedDishes([...addedDishes, dishId]);
    };

    const removeFromDishes = (dishId) => {
        setAddedDishes(addedDishes.filter((id) => id !== dishId));
    };

    return (
        <DishContext.Provider value={{ addedDishes, addToDishes, removeFromDishes }}>
            {children}
        </DishContext.Provider>
    );
};

export const useDishContext = () => useContext(DishContext);
