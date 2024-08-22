import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState(null);

    const login = (id) => {
        setUserId(id);
        localStorage.setItem("userId", id);
    }

    const logout = () => {
        setUserId(null);
        localStorage.removeItem("userId");
        navigate('/login');
    }

    const checkLogged = () => {
        if (localStorage.getItem("userId")) {
            setUserId(localStorage.getItem("userId"))
            return true;
        }

        setUserId(null);
        return false;
    };

    return (
        <AuthContext.Provider value={{ checkLogged, login, logout, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);