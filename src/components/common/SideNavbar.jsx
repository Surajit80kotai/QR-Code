import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SideNavbar = () => {
    const [activeLink, setActiveLink] = useState('');

    const links = [
        { id: 'create', text: 'Create', icon: 'ti-home', to: '/qr1/create' },
        { id: 'taglist', text: 'Tag list', icon: 'ti-calendar', to: '/qr1/taglist' },
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
                                    <img src="/assets/images/shri-lal-mahal-logo.jpg" alt="" className="img-fluid" height="130px" width="130px" />
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
