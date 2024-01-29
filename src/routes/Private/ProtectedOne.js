import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedOne = () => {
    const token = JSON.parse(window.localStorage.getItem('token'));
    const location = useLocation();

    return (
        <>
            {
                token ? <Outlet /> : <Navigate to={`${process.env.REACT_APP_BASE_URL_PREFIX}/admin/login`} state={{ form: location }} replace />
            }
        </>
    )
}

export default ProtectedOne