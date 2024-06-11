import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise <void> => {
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
    }

    return (
        <div className="container">
        <h1 className="login">Sign In</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin} className="form">
            <input 
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="input"
            />
            <input  
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder='Password'
                className="input"
            />
            <button type="submit" className="loginbutton">
                Log In
            </button>
            <div className="signupcontainer">
                Don't have an account?
                <button className="signupbtn" onClick={handleSignUp}>
                    Sign Up
                </button>
            </div>
        </form>
    </div>
    )

}

export default Login;
