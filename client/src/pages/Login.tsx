import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import schedule from '../assets/schedule.webp';

interface LoginProps {
	username: string;
	password: string;
}

const Login: React.FC = () => {
	const [formData, setFormData] = useState<LoginProps>({ username: '', password: '' });
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				navigate('/calendar');
			} else {
				const data = await response.json();
				setError(data.error || 'Login failed');
			}
		} catch (error) {
			setError('Error occured during login');
		}
	};

	const handleSignUp = (): void => {
		navigate('/signup');
	};

	return (
		<div className="flex h-screen">
			<div className="flex-1">
				<img src={schedule} alt="Left Image" className="object-cover w-full h-full" />
			</div>
			<div className="flex-1 flex items-center justify-center bg-gray-100">
				<div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
					<h1 className="text-3xl font-bold text-center">Sign In</h1>
					{error && <p className="text-red-500 text-center">{error}</p>}
					<form onSubmit={handleLogin} className="space-y-4">
						<input
							type="text"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							placeholder="Username"
							className="w-full p-2 border border-gray-300 rounded"
						/>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							placeholder="Password"
							className="w-full p-2 border border-gray-300 rounded"
						/>
						<button type="submit" className="w-full py-2 bg-pink-500 text-white rounded hover:bg-blue-700">
							Log In
						</button>
						<div className="text-center">
							Don't have an account?
							<button className="text-blue-500 hover:underline ml-2" onClick={handleSignUp}>
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
