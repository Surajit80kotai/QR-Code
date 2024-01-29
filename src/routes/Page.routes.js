import React from 'react';
import SideNavbar from '../components/common/SideNavbar';
import Header from '../components/common/Header';
import { Routes, Route } from 'react-router-dom';
import Create from '../pages/others/Create';
import Taglist from '../pages/others/Taglist';
import AllQRCodes from '../components/core/tagList/AllQRCodes';
// import Footer from '../components/common/Footer';

const PageRoutes = () => {
    return (
        <>
            <Header />
            <SideNavbar />
            <Routes>
                <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/create`} element={<Create />} />
                <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/taglist`} element={<Taglist />} />
                <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/codes/:flag`} element={<AllQRCodes />} />
            </Routes>
            {/* <Footer /> */}
        </>
    )
}

export default PageRoutes