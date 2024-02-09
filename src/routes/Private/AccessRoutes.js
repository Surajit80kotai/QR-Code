import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { DcryptData } from '../../helper/EncryptDcrypt ';

const AccessRoutes = () => {
    // user
    const user = DcryptData(window.localStorage.getItem('user'));
    const location = useLocation();

    return (
        <>
            {
                user?.type === "su-admin" ? <Outlet /> : <Navigate to={`${process.env.REACT_APP_BASE_URL_PREFIX}/access/error`} state={{ form: location }} replace />
            }
        </>
    )
}

export default AccessRoutes;