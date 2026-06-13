import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import api from '../../api/api';
import { Button } from '../../components';
import { AUTH_SUCCESS } from '../../store/action-types';
import styles from '../auth.module.css';

const schema = yup.object().shape({
	login: yup
		.string()
		.required('Введите логин')
		.min(3, 'Минимум 3 символа')
		.max(20, 'Максимум 20 символов')
		.matches(/^[a-zA-Z0-9_]+$/, 'Только латиница, цифры и нижнее подчеркивание'),

	password: yup
		.string()
		.required('Введите пароль')
		.min(6, 'Минимум 6 символов')
		.max(30, 'Максимум 30 символов'),
});

export function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			const res = await api.post('/auth/login', data);
			localStorage.setItem('token', res.data.token);

			const me = await api.get('/auth/me');

			dispatch({
				type: AUTH_SUCCESS,
				payload: me.data,
			});

			toast.success('Добро пожаловать');
			navigate('/products');
		} catch (err) {
			console.error('Ошибка авторизации:', err);
			const message = err.response?.data?.message || 'Ошибка сервера';

			setError('password', {
				type: 'server',
				message: message,
			});
			toast.error(message);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h2 className={styles.title}>Вход в систему</h2>
				<p className={styles.titleText}>Для просмотра каталога войдите в аккаунт</p>

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.inputGroup}>
						<input
							className={styles.input}
							{...register('login')}
							placeholder="Логин"
						/>
						<span className={styles.errorText}>{errors.login?.message || ''}</span>
					</div>

					<div className={styles.inputGroup}>
						<input
							className={styles.input}
							type="password"
							{...register('password')}
							placeholder="Пароль"
						/>
						<span className={styles.errorText}>{errors.password?.message || ''}</span>
					</div>

					<Button type="submit" disabled={!isValid} loading={isSubmitting}>
						Войти
					</Button>
				</form>

				<div className={styles.footer}>
					<p>Нет аккаунта?</p>

					<Button as="link" to="/register" variant="secondary">
						Регистрация
					</Button>
				</div>
			</div>
		</div>
	);
}
