import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/authActions';
import { Button } from '../ui/button/button';
import styles from './header.module.css';

export const Header = () => {
	const { isAuth, user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<header className={styles.header}>
			{/* LEFT — LOGO & NAV */}
			<div className={styles.left}>
				<Link to="/" className={styles.logo}>
					Лого
				</Link>
				{/* Перенесли кнопку внутрь левого контейнера */}
				<Button as="link" to="/admin/products">
					Товары
				</Button>
			</div>

			{/* CENTER — TITLE */}
			<div className={styles.center}>
				<h2>Service Center CRM</h2>
			</div>

			{/* RIGHT — NAV */}
			<div className={styles.right}>
				{/* Тут оставляешь всё как было (логика авторизации и роли) */}
				{!isAuth && (
					<>
						<Button as="link" to="/login">
							Войти
						</Button>
						<Button as="link" to="/register">
							Регистрация
						</Button>
					</>
				)}

				{isAuth && user?.role === 'user' && (
					<>
						<Button as="link" to="/claims">
							Мои заявки
						</Button>
						<span>{user.login}</span>
						<Button onClick={handleLogout}>Выйти</Button>
					</>
				)}

				{isAuth && user?.role === 'admin' && (
					<>
						<Link to="/orders">Заявки</Link>
						<Link to="/users">Пользователи</Link>
						<span>{user.login}</span>
						<Button onClick={handleLogout}>Выйти</Button>
					</>
				)}
			</div>
		</header>
	);
};
