import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import QRLoader from '../../utility/QRLoader';
import AllPageLoader from '../../utility/AllPageLoader';
import PageRoutes from '../../routes/Page.routes';


const Header = ({ toggleHamburger }) => {
    const { QRloading, loading, isDownloading } = useSelector(state => state.UtilitySlice);

    return (
        <>
            {/* Loader */}
            {loading && <QRLoader />}
            {QRloading || isDownloading ? <AllPageLoader /> : null}

            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* Navbar */}
                    <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
                        <button id="sidebarToggleTop" onClick={toggleHamburger} className="btn btn-link rounded-circle mr-3">
                            <i className="fa fa-bars"></i>
                        </button>

                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item dropdown no-arrow">
                                <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <img className="img-profile rounded-circle" src="/assets/img/boy.png" style={{ maxWidth: "60px" }} alt='' />
                                    <span className="ml-2 d-none d-lg-inline text-white small">Maman Ketoprak</span>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                    <Link className="dropdown-item" to="#">
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Profile
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Settings
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Activity Log
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="#"
                                    // data-toggle="modal" data-target="#logoutModal"
                                    >
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Logout
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </nav>

                    {/* PAGE CONTENT START*/}
                    {/* PageRoutes*/}
                    <PageRoutes />
                    {/* PAGE CONTENT END*/}
                </div>
            </div>
        </>
    );
};

export default Header;
