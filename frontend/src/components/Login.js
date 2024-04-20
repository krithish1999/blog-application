import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      console.log(email);
      console.log(password);
      const user = await loginUser(userData);
      localStorage.setItem('token', user.token);
      //console.log(user);
      console.log('User logged in:', user);
      history.push('/postform');
      // Redirect or perform any other action after successful login

    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (display error message, clear input fields, etc.)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
