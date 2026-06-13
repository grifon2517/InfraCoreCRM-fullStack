import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from './store/index';
import { AUTH_FINISH_LOADING } from './store/action-types';

import { Header, RequireAuth, MyToaster, Loader } from './components';
import {
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

	const { loading } = useSelector((state) => state.auth);

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			dispatch(fetchMe());
		} else {
			dispatch({ type: AUTH_FINISH_LOADING });
		}
	}, [dispatch]);

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<MyToaster />
			<Header />

			<main className="main-content">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/product/:id" element={<ProductPage />} />

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
					<Route
						path="/users"
						element={
							<RequireAuth role="admin">
								<UserPage />
							</RequireAuth>
						}
					/>

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
		</>
	);
}

export default Diplom;
