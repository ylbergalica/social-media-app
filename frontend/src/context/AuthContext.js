import React, { createContext, useState } from 'react';

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

    const isLogged = () => {
        if (localStorage.getItem("userId")) {
            setUserId(localStorage.getItem("userId"))
            return true;
        }

        setUserId(null);
        return false;
    };

    return (
        <AuthContext.Provider value={{ isLogged, authLogin, authLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
