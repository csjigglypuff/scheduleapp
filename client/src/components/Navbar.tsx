import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavLink {
    path: string;
    label: string;
}

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const navLinks: NavLink[] = [
        { path: '/calendar', label: 'Calendar' },
        { path: '/creategroup', label: 'Create Group' },
    ];

    function handleLogging() {
        sessionStorage.clear();
        navigate('/');
    }

    const isLoggedIn = Boolean(sessionStorage.getItem('token'));  // depends on local or session storage? 

    return (
        <div className="navbar">
            <nav>
                <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none' }}>
                    {navLinks.map((link, index) => (
                        <li key={index} style={{ marginLeft: '20px' }}>
                            <Link to={link.path}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
                <div className="navbtns">
                    {isLoggedIn && (
                        <button className="logOut" onClick={handleLogging}>
                            Log Out
                        </button>
                    )} 
                </div>
            </nav>
        </div>
    );
};

export default Navbar;