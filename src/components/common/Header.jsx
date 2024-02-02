import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import QRLoader from '../../utility/QRLoader';
import AllPageLoader from '../../utility/AllPageLoader';
import PageRoutes from '../../routes/Page.routes';
import { doLogOut } from '../../services/slices/AuthSlice';
import toast from 'react-hot-toast';
import { DcryptData } from '../../helper/EncryptDcrypt ';
import { jwtDecode } from 'jwt-decode';
import CustomModal from '../../utility/CustomModal';


const Header = ({ toggleHamburger }) => {
    // token
    const token = JSON.parse(window.localStorage.getItem('token'));
    // user
    const user = DcryptData(window.localStorage.getItem('user'));

    const { QRloading, loading, isDownloading } = useSelector(state => state.UtilitySlice);

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const openLogoutModal = () => setIsLogoutModalOpen(true);
    const closeLogoutModal = () => setIsLogoutModalOpen(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogout = () => {
        dispatch(doLogOut());
        navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/admin/login`);
        toast.success("Logged Out Successfully.", {
            duration: 2000,
            style: {
                background: "black",
                color: "white",
            },
            iconTheme: {
                primary: '#FFF',
                secondary: 'green',
            },
        });
    };

    // Componenet mount cycle
    useEffect(() => {
        // Check your session and logout after it's expired.
        if (token) {
            // decode jwt token
            const decodedJwt = jwtDecode(token);
            const isExpired = decodedJwt.exp < Date.now() / 1000;
            if (isExpired) {
                dispatch(doLogOut());
                navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/admin/login`);
                toast.success("Session Expired. You've been logged out. Please log in again.", {
                    duration: 4000,
                    style: {
                        background: "black",
                        color: "white",
                    },
                    iconTheme: {
                        primary: '#FFF',
                        secondary: 'green',
                    },
                });
            }
        } else {
            navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/admin/login`);
        }
    }, [dispatch, navigate, token]);


    return (
        <>
            {/* Loader */}
            {QRloading || isDownloading ? <QRLoader /> : null}
            {loading ? <AllPageLoader /> : null}

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
                                    <span className="ml-2 d-none d-lg-inline text-white small">{user?.full_name}</span>
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
                                    <Link className="dropdown-item"
                                        to="#"
                                        onClick={openLogoutModal}
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

            {/* Confirmation modal */}
            <CustomModal
                isOpen={isLogoutModalOpen}
                onRequestClose={closeLogoutModal}
                onConfirm={userLogout}
                message="Are you sure you want to log out?"
            />

        </>
    );
};

export default Header;
