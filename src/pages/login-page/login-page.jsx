import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../../api/api';

export function Login() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// логинимся
			const res = await api.post('/auth/login', { login, password });

			localStorage.setItem('token', res.data.token);

			// получаем текущего пользователя
			const me = await api.get('/auth/me');

			// кладем в redux
			dispatch({
				type: 'AUTH_SUCCESS',
				payload: me.data,
			});

			navigate('/products');
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
