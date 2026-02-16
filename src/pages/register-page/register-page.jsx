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
		.required('Логин обязателен')
		.matches(/^[a-zA-Z0-9]+$/, 'Только латиница и цифры')
		.min(3, 'Минимум 3 символа')
		.max(20, 'Максимум 20 символов'),

	password: yup.string().required('Пароль обязателен').min(6, 'Минимум 6 символов'),
});

export function RegisterPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = async (data) => {
		try {
			// регистрация
			await api.post('/auth/register', data);

			// автологин
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

			toast.error(msg);
		}
	};

	return (
		<div>
			<h2>Регистрация</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<input placeholder="Логин" {...register('login')} />
					{errors.login && <p style={{ color: 'red' }}>{errors.login.message}</p>}
				</div>

				<div>
					<input type="password" placeholder="Пароль" {...register('password')} />
					{errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
				</div>

				<button type="submit" disabled={!isValid}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}
