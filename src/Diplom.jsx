import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMe } from './store/authActions';
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
			{/* <Content> */}
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route
					path="/products"
					element={
						<RequireAuth>
							<ProductsPage />
						</RequireAuth>
					}
				/>
				<Route path="/product/:id" element={<ProductPage />} />
				<Route
					path="/claims"
					element={
						<RequireAuth>
							<ClaimsPage />
						</RequireAuth>
					}
				/>
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
				<Route path="/order/:id" element={<div>Страница заявки</div>} />
				<Route path="/users" element={<UserPage />} />
				<Route path="*" element={<div>Страница ошибки</div>} />
			</Routes>
			{/* </Content> */}
			{/* <Footer /> */}
		</>
	);
}

export default Diplom;
