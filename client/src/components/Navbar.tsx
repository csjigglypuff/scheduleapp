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
	]
    
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
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
