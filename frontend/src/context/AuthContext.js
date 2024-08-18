import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    const authLogin = (username, pass) => {
        const id = 0 // backend login here

        setUserId(id);
        localStorage.setItem("userId", id);
    }

    const authLogout = () => {
        setUserId(null);
        localStorage.removeItem("userId");
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
        <AuthContext.Provider value={{ checkLogged, authLogin, authLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);