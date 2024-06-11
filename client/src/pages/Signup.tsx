import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  })

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword) {
        alert('Password does not match');
        return;
    } 
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username, 
                    password: formData.password,
                }),
            });

            if (response.ok) {
                navigate('/calendar');
            } else {
                const data = await response.json();
                console.log('data:', data)
                setError(data.error || 'Signup failed');
            }
    } catch (error) {
        setError('An error occured during sign up')
    }
  };

  return (

        <div className="formContainer"> 
        <h1>Sign up</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup} className="form">
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
            <input 
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="input confirm-password"
            />
            <button type="submit" className="loginbutton">
                Sign Up
            </button>
        </form>

    </div>
  )
};

export default Signup;
