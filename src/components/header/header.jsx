import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/auth-actions';
import { Logo } from '../logo/logo';
import styles from './header.module.css'; // Подключаем наши модульные стили

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
			{/* LEFT СЕКЦИЯ — ЛОГОТИП И КАТАЛОГ */}
			<div className={styles.leftSection}>
				<Link to="/" className={styles.logoLink}>
					<Logo />
				</Link>
				{/* МЕНЯЕМ ТУТ: вместо "/admin/products" ставим {productsPath} */}
				<Link to={productsPath} className={styles.catalogBtn}>
					Товары
				</Link>
			</div>

			{/* CENTER СЕКЦИЯ — ИДЕАЛЬНО ОТЦЕНТРОВАННЫЙ ЗАГОЛОВОК С ГРАДИЕНТОМ */}
			<Link to="/" className={styles.centerTitle}>
				InfraCore<span className={styles.titleAccent}>CRM</span>
			</Link>

			{/* RIGHT СЕКЦИЯ — НАВИГАЦИЯ И АВТОРИЗАЦИЯ */}
			<div className={styles.rightSection}>
				{/* 1. Если пользователь ГОСТЬ */}
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

				{/* 2. Если залогинен ОБЫЧНЫЙ ПОЛЬЗОВАТЕЛЬ */}
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

				{/* 3. Если залогинен АДМИНИСТРАТОР */}
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
