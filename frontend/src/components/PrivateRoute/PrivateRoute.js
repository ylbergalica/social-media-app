import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
    const navigate = useNavigate();
    const { checkLogged } = useAuth();

    if (checkLogged()) return <Outlet />;
    else navigate('/');

    return <></>;
};

export default PrivateRoute;
