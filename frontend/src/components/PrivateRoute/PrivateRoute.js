import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = () => {
    const { checkLogged } = useAuth();

    return checkLogged() ? <Outlet /> : <Navigate to="/login" />;;
};

export default PrivateRoute;
