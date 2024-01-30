import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SideNavbar = () => {
    const [activeLink, setActiveLink] = useState('');

    const links = [
        { id: 'create', text: 'Create', icon: 'ti-home', to: `${process.env.REACT_APP_BASE_URL_PREFIX}/create` },
        { id: 'taglist', text: 'Tag list', icon: 'ti-calendar', to: `${process.env.REACT_APP_BASE_URL_PREFIX}/taglist` },
        { id: 'logout', text: 'Logout', icon: 'ti-close', to: '#' },
    ];

    const handleLinkClick = (linkId) => {
        setActiveLink(linkId);
    };

    return (
        <>
            <div className="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures">
                <div className="nano">
                    <div className="nano-content">
                        <ul>
                            <div className="logo">
                                <Link to="/">
                                    {/* <img src="/assets/images/kb.jpeg" alt="" className="img-fluid" height="130px" width="130px" /> */}

                                    {/* "https://kendriyabhandar.org" */}
                                    <img src="/assets/images/kb.jpeg" alt="" className="img-fluid" width="230px" />
                                </Link>
                            </div>

                            {links.map((link) => (
                                <li key={link.id} className={activeLink === link.id ? 'active' : ''}>
                                    <Link
                                        className="sidebar-sub-toggle"
                                        to={link.to}
                                        onClick={() => handleLinkClick(link.id)}
                                    >
                                        <i className={link.icon}></i> {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideNavbar;
