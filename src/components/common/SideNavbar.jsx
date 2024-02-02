import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';


const SideNavbar = () => {
    const AVTIVE_WEB_URL = process.env.REACT_APP_BASE_URL_PREFIX;

    const [activeLink, setActiveLink] = useState('');
    const [isHamburgerActive, setIsHamburgerActive] = useState(false);

    const toggleHamburger = () => {
        // Toggle body class before updating state
        document.body.classList.toggle('sidebar-toggled', !isHamburgerActive);
        setIsHamburgerActive(!isHamburgerActive);
    };

    const links = [
        {
            id: 'dashboard',
            text: 'Dashboard',
            icon: 'fas fa-fw fa-tachometer-alt',
            to: `${process.env.REACT_APP_BASE_URL_PREFIX}/dashboard`,
        },
        {
            id: 'create',
            text: 'Create',
            icon: 'fas fa-plus-square',
            to: `${process.env.REACT_APP_BASE_URL_PREFIX}/create`,
        },
        {
            id: 'taglist',
            text: 'Tag List',
            icon: 'fas fa-list',
            to: `${process.env.REACT_APP_BASE_URL_PREFIX}/taglist`,
        },
    ];

    const handleLinkClick = (linkId) => {
        setActiveLink(linkId);
    };

    return (
        <>
            <ul className={isHamburgerActive ? "navbar-nav sidebar sidebar-light accordion toggled" : "navbar-nav sidebar sidebar-light accordion"} id="accordionSidebar">

                <div className="sidebar-brand-icon"
                    style={{ padding: "5px", height: isHamburgerActive ? '70px' : '' }}
                >
                    <img src={AVTIVE_WEB_URL === "/qr1" ? "/assets/img/nafed.jpg" : "/assets/img/kb.jpeg"} alt='' width="100%" height="100%"
                        style={{ display: isHamburgerActive ? 'none' : 'block' }}
                    />
                </div>

                <hr className="sidebar-divider my-0" />

                {links.map((link) => (
                    <li key={link.id} className={activeLink === link.id ? 'nav-item active' : 'nav-item'}>
                        <Link
                            className="nav-link"
                            to={link.to}
                            onClick={() => handleLinkClick(link.id)}
                        >
                            <i className={link.icon}></i>
                            <span>{link.text}</span>
                        </Link>
                    </li>
                ))}
                <hr className="sidebar-divider" />
                <div className="version" id="version-ruangadmin"></div>
            </ul>

            {/* Header */}
            <Header
                toggleHamburger={toggleHamburger}
            />
        </>
    );
};

export default SideNavbar;
