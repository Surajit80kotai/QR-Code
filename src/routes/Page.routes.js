import React from 'react';
import SideNavbar from '../components/common/SideNavbar';
import Header from '../components/common/Header';
import { Routes, Route } from 'react-router-dom';
import Create from '../pages/others/Create';
import Taglist from '../pages/others/Taglist';
import Footer from '../components/common/Footer';
import QRCodes from '../components/core/tagList/QRCodes';

const PageRoutes = () => {
    return (
        <>
            <Header />
            <SideNavbar />
            <Routes>
                <Route path='/create' element={<Create />} />
                <Route path='/taglist' element={<Taglist />} />
                <Route path='/QR/codes/:flag' element={<QRCodes />} />
            </Routes>
            <Footer />
        </>
    )
}

export default PageRoutes