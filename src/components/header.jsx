import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authActions';

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
				<Link to="/products" style={styles.logo}>
					Лого
				</Link>
			</div>

			{/* CENTER — TITLE */}
			<div style={styles.center}>
				<h2>Service Center CRM</h2>
			</div>

			{/* RIGHT — NAV */}
			<div style={styles.right}>
				{!isAuth && (
					<>
						<Link to="/login">Войти</Link>
						<Link to="/register">Регистрация</Link>
					</>
				)}

				{isAuth && user?.role === 'user' && (
					<>
						<Link to="/claims">Мои заявки</Link>
						<span>{user.login}</span>
						<button onClick={handleLogout}>Выйти</button>
					</>
				)}

				{isAuth && user?.role === 'admin' && (
					<>
						<Link to="/orders">Заявки</Link>
						<Link to="/users">Пользователи</Link>
						<span>{user.login}</span>
						<button onClick={handleLogout}>Выйти</button>
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
		width: '100%',
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
