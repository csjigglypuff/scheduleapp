import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import picnic from '../assets/picnic.webp';

interface SignupProp {
	username: string;
	password: string;
	confirmPassword: string;
}

const Signup: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmpassword] = useState('');
	const [error, setError] = useState('');

	const [formData, setFormData] = useState<SignupProp>({
		username: '',
		password: '',
		confirmPassword: '',
	});

	const navigate = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSignup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			alert('Password does not match');
			return;
		}
		try {
			const response = await fetch('/user/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: formData.username,
					password: formData.password,
				}),
			});
            console.log('signup response:', response)
			if (response.ok) {
				navigate('/calendar');
			} else {
				const data = await response.json();
				console.log('data:', data);
				setError(data.error || 'Signup failed');
			}
		} catch (error) {
			setError('An error occured during sign up');
		}
	};

	return (
		<div className="flex h-screen">
			<div className="flex-1">
				<img src={picnic} alt="Left Image" className="object-cover w-full h-full" />
			</div>
			<div className="flex-1 flex items-center justify-center bg-gray-100">
				<div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
					<h1 className="text-3xl font-bold text-center">Sign Up</h1>
					{error && <p className="text-red-500 text-center">{error}</p>}
					<form onSubmit={handleSignup} className="space-y-4">
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
						<input
							type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleInputChange}
							placeholder="Confirm Password"
							className="w-full p-2 border border-gray-300 rounded"
						/>
						<button type="submit" className="w-full py-2 bg-pink-300 text-white rounded hover:bg-pink-300">
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
