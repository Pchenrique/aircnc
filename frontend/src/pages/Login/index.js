import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api'; 

function Login() {
	const history = useHistory();
	const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/users', { email });

    const { _id } = response.data;

		localStorage.setItem('user', _id);
		
		history.push('/dashboard');
	}
	
	return (
		<>
			<p>
				Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.
			</p>

			<form onSubmit={handleSubmit}>
				<label htmlFor="email">E-mail</label>
				<input 
					id="email" 
					type="email" 
					value={email}
					placeholder="seu e-mail" 
					onChange={event => setEmail(event.target.value)}
				/>

				<button className="btn" type="submit">Entrar</button>
			</form>
		</>
	)
}

export default Login;