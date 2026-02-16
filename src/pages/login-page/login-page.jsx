import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import api from '../../api/api';

// схема валидации
const schema = yup.object().shape({
	login: yup
		.string()
		.required('Введите логин')
		.min(3, 'Минимум 3 символа')
		.max(20, 'Максимум 20 символов')
		.matches(/^[a-zA-Z0-9_]+$/, 'Только латиница, цифры и _'),

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
		formState: { errors, isValid, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			// логин
			const res = await api.post('/auth/login', data);

			localStorage.setItem('token', res.data.token);

			// получаем текущего пользователя
			const me = await api.get('/auth/me');

			dispatch({
				type: 'AUTH_SUCCESS',
				payload: me.data,
			});

			toast.success('Добро пожаловать');

			navigate('/products');
		} catch (err) {
			console.error(err);

			const message = err.response?.data?.message || 'Ошибка сервера';

			toast.error(message);
		}
	};

	return (
		<div>
			<h2>Login</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<input {...register('login')} placeholder="Логин" />
					{errors.login && (
						<p style={{ color: 'red', fontSize: 12 }}>{errors.login.message}</p>
					)}
				</div>

				<div>
					<input type="password" {...register('password')} placeholder="Пароль" />
					{errors.password && (
						<p style={{ color: 'red', fontSize: 12 }}>{errors.password.message}</p>
					)}
				</div>

				<button disabled={!isValid || isSubmitting}>
					{isSubmitting ? 'Вход...' : 'Войти'}
				</button>
			</form>
		</div>
	);
}
