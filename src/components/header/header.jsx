import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store';
import { Logo } from '../logo/logo';
import styles from './header.module.css';

export const Header = () => {
	const { isAuth, user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate('/login');
	};
	const productsPath = isAuth && user?.role === 'admin' ? '/admin/products' : '/products';

	return (
		<header className={styles.header}>
			<div className={styles.leftSection}>
				<Link to="/" className={styles.logoLink}>
					<Logo />
				</Link>

				<Link to={productsPath} className={styles.catalogBtn}>
					Товары
				</Link>
			</div>

			<Link to="/" className={styles.centerTitle}>
				InfraCore<span className={styles.titleAccent}>CRM</span>
			</Link>

			<div className={styles.rightSection}>
				{!isAuth && (
					<>
						<Link to="/login" className={styles.navLink}>
							Войти
						</Link>
						<Link to="/register" className={styles.registerBtn}>
							Регистрация
						</Link>
					</>
				)}

				{isAuth && user?.role === 'user' && (
					<>
						<Link to="/claims" className={styles.navLink}>
							Мои заявки
						</Link>
						<span className={styles.username}>{user.login}</span>
						<button type="button" className={styles.logoutBtn} onClick={handleLogout}>
							Выйти
						</button>
					</>
				)}

				{isAuth && user?.role === 'admin' && (
					<>
						<Link to="/orders" className={styles.navLink}>
							Заявки
						</Link>
						<Link to="/users" className={styles.navLink}>
							Пользователи
						</Link>
						<span className={styles.username}>{user.login}</span>
						<button type="button" className={styles.logoutBtn} onClick={handleLogout}>
							Выйти
						</button>
					</>
				)}
			</div>
		</header>
	);
};
