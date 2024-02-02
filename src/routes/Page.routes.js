import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/others/Dashboard';
import Create from '../pages/others/Create';
import Taglist from '../pages/others/Taglist';
import AllQRCodes from '../components/core/tagList/AllQRCodes';

const PageRoutes = () => {
    return (
        <>
            <div id="wrapper">
                <Routes>
                    <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/dashboard`} element={<Dashboard />} />
                    <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/create`} element={<Create />} />
                    <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/taglist`} element={<Taglist />} />
                    <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/codes/:flag`} element={<AllQRCodes />} />
                </Routes>
            </div>
        </>
    )
}

export default PageRoutes