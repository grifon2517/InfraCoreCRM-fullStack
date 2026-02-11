import { useState } from 'react';
import api from '../../api/api';

export function Login() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post('/auth/login', { login, password });
			localStorage.setItem('token', res.data.token);
			alert('Вход выполнен');
		} catch (err) {
			console.error(err);
			alert('Ошибка входа');
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input
					value={login}
					onChange={(e) => setLogin(e.target.value)}
					placeholder="Логин"
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Пароль"
				/>
				<button type="submit">Войти</button>
			</form>
		</div>
	);
}
