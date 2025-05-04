import React, { createContext } from 'react';

// Create centralized contexts to avoid circular dependencies
export const UserContext = createContext(null);
export const CartContext = createContext(null);
export const ThemeContext = createContext(null);