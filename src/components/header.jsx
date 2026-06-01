import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authActions';
import { Button } from './ui/button/button';

export const Header = () => {
	const { isAuth, user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<header style={styles.header}>
			{/* LEFT — LOGO */}
			<div style={styles.left}>
				<Link to="/" style={styles.logo}>
					Лого
				</Link>
			</div>
			<div>
				<Button as="link" to="/admin/products">
					Товары
				</Button>
			</div>

			{/* CENTER — TITLE */}
			<div style={styles.center}>
				<h2>Service Center CRM</h2>
			</div>

			{/* RIGHT — NAV */}
			<div style={styles.right}>
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

const styles = {
	header: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '98%',
		height: '70px',
		background: '#111',
		color: '#fff',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0 20px',
		zIndex: 1000,
	},

	left: {
		width: '25%',
	},

	center: {
		width: '50%',
		textAlign: 'center',
	},

	right: {
		width: '25%',
		display: 'flex',
		gap: '15px',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},

	logo: {
		fontSize: '20px',
		fontWeight: 'bold',
		color: '#fff',
		textDecoration: 'none',
	},
};
