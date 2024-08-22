import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
    const navigate = useNavigate();
    const { checkLogged } = useAuth();

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        if (checkLogged()) setIsLogged(true);
        else navigate('/login');
    }, [])

    if (isLogged) return <Outlet />;
    return <></>;
};

export default PrivateRoute;
