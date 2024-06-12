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

    const handleLogout = async () => {
        try {
            const response = await fetch('/user/logout', {
                method: 'POST',
            });
            if (response.ok) {
                sessionStorage.clear();
                navigate('/');
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

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
                    <button className="logOut" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
