import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import QRLoader from '../../utility/QRLoader';
import AllPageLoader from '../../utility/AllPageLoader';

const Header = () => {
    const [isHamburgerActive, setIsHamburgerActive] = useState(false);
    const { QRloading, loading, isDownloading } = useSelector(state => state.UtilitySlice);

    const toggleHamburger = () => {
        // Toggle body class before updating state
        document.body.classList.toggle('sidebar-hide', !isHamburgerActive);
        document.body.classList.toggle('pace-done', isHamburgerActive);

        // Update state after toggling classes
        setIsHamburgerActive(!isHamburgerActive);
    };

    const hamburgerClass = `hamburger sidebar-toggle${isHamburgerActive ? ' is-active' : ''}`;


    return (
        <>
            {/* Loader */}
            {QRloading && <QRLoader />}
            {loading || isDownloading ? <AllPageLoader /> : null}

            <div className="header" style={{ marginLeft: isHamburgerActive ? '60px' : '250px' }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* Hamburger */}
                            <div className="float-left">
                                <div className={hamburgerClass} onClick={toggleHamburger}>
                                    <span className="line"></span>
                                    <span className="line"></span>
                                    <span className="line"></span>
                                </div>
                            </div>

                            <div className="float-right">
                                <div className="dropdown dib">
                                    <div className="header-icon" data-toggle="dropdown">
                                        <span className="user-avatar">John
                                            <i className="ti-angle-down f-s-10"></i>
                                        </span>
                                        <div className="drop-down dropdown-profile dropdown-menu dropdown-menu-right">
                                            <div className="dropdown-content-body">
                                                <ul>
                                                    <li>
                                                        <Link to="#">
                                                            <i className="ti-user"></i>
                                                            <span>Profile</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">
                                                            <i className="ti-power-off"></i>
                                                            <span>Logout</span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
