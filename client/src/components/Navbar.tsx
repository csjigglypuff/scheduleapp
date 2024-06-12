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

	const isLoggedIn = Boolean(sessionStorage.getItem('token'));

	return (
		<div className="bg-gray-800 p-4 shadow-lg">
			<nav className="container mx-auto flex items-center justify-between">
				<ul className="flex items-center space-x-4">
					{navLinks.map((link, index) => (
						<li key={index}>
							<Link to={link.path} className="text-white hover:text-gray-400">
								{link.label}
							</Link>
						</li>
					))}
				</ul>
				<div>
					{isLoggedIn && (
						<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogging}>
							Log Out
						</button>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
