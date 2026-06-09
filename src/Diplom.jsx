import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMe } from './store/index';
import { Toaster } from 'react-hot-toast';
import { Header, RequireAuth } from './components';
import {
	AdminPage,
	Login,
	ProductsPage,
	ProductPage,
	ClaimsPage,
	AdminOrdersPage,
	RegisterPage,
	HomePage,
	UserPage,
	AdminProductsPage,
	NotFoundPage,
} from './pages';
import './App.css';

function Diplom() {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			dispatch(fetchMe());
		} else {
			dispatch({ type: 'AUTH_FINISH_LOADING' });
		}
	}, [dispatch]);
	return (
		<>
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 4000,
					style: {
						background: '#1e1e1e',
						color: '#fff',
						borderRadius: '12px',
						padding: '14px 16px',
						fontSize: '14px',
					},
					success: {
						iconTheme: {
							primary: '#4ade80',
							secondary: '#1e1e1e',
						},
					},
					error: {
						iconTheme: {
							primary: '#ef4444',
							secondary: '#1e1e1e',
						},
					},
				}}
			/>
			<Header />

			<main className="main-content">
				<Routes>
					{/* Публичные страницы */}
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/product/:id" element={<ProductPage />} />
					<Route path="/order/:id" element={<div>Страница заявки</div>} />

					{/* Приватные страницы пользователя */}
					<Route
						path="/products"
						element={
							<RequireAuth>
								<ProductsPage />
							</RequireAuth>
						}
					/>
					<Route
						path="/claims"
						element={
							<RequireAuth>
								<ClaimsPage />
							</RequireAuth>
						}
					/>

					{/* СТРОГО АДМИНСКИЕ СТРАНИЦЫ (С МАСКИРОВКОЙ ПОД 404) */}
					<Route
						path="/orders"
						element={
							<RequireAuth role="admin">
								<AdminOrdersPage />
							</RequireAuth>
						}
					/>
					<Route
						path="/admin/products"
						element={
							<RequireAuth role="admin">
								<AdminProductsPage />
							</RequireAuth>
						}
					/>
					{/* ИСПРАВЛЕНО: Теперь список пользователей тоже под железным замком админа! */}
					<Route
						path="/users"
						element={
							<RequireAuth role="admin">
								<UserPage />
							</RequireAuth>
						}
					/>

					{/* ГЛОБАЛЬНЫЙ ОТЛОВ ВСЕХ ОШИБОК И НЕСУЩЕСТВУЮЩИХ СТРАНИЦ */}
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
		</>
	);
}

export default Diplom;
