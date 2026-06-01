import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import api from '../../api/api';
import { Button } from '../../components'; // Добавили твой Button
import styles from '../auth.module.css'; // Тот же самый файл стилей

// Исправленная схема валидации (одинаковая с логином)
const schema = yup.object().shape({
	login: yup
		.string()
		.required('Логин обязателен')
		.matches(/^[a-zA-Z0-9_]+$/, 'Только латиница, цифры и нижнее подчеркивание')
		.min(3, 'Минимум 3 символа')
		.max(20, 'Максимум 20 символов'),

	password: yup
		.string()
		.required('Пароль обязателен')
		.min(6, 'Минимум 6 символов')
		.max(30, 'Максимум 30 символов'), // Добавили макс. длину
});

export function RegisterPage() {
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
			await api.post('/auth/register', data);

			const loginRes = await api.post('/auth/login', data);
			localStorage.setItem('token', loginRes.data.token);

			const me = await api.get('/auth/me');

			dispatch({
				type: 'AUTH_SUCCESS',
				payload: me.data,
			});

			toast.success('Регистрация успешна');
			navigate('/products');
		} catch (err) {
			const msg = err.response?.data?.message || 'Ошибка регистрации';
			setError('password', {
				type: 'server',
				message: msg,
			});
			toast.error(msg);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h2 className={styles.title}>Регистрация</h2>

				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.inputGroup}>
						<input
							className={styles.input}
							placeholder="Логин"
							{...register('login')}
						/>
						<span className={styles.errorText}>
							{errors.login ? errors.login.message : ''}
						</span>
					</div>

					<div className={styles.inputGroup}>
						<input
							className={styles.input}
							type="password"
							placeholder="Пароль"
							{...register('password')}
						/>
						<span className={styles.errorText}>
							{errors.password ? errors.password.message : ''}
						</span>
					</div>

					<Button
						className={styles.submitBtn}
						type="submit"
						disabled={!isValid || isSubmitting}
					>
						{isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
					</Button>
				</form>

				<div className={styles.footer}>
					<p>Уже есть аккаунт?</p>
					<Link to="/login" style={{ textDecoration: 'none' }}>
						<Button className={styles.submitBtn} type="button">
							Войти
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
