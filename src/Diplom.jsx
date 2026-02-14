import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMe } from './store/authActions';

import { Header } from './components/header';
import { AdminPage, Login, ProductsPage, ProductPage, ClaimsPage, AdminOrdersPage } from './pages';
import './App.css';

function Diplom() {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			dispatch(fetchMe());
		}
	}, [dispatch]);
	return (
		<>
			<Header />
			{/* <Content> */}
			<Routes>
				<Route path="/" element={<AdminPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<div>Страница регистрации</div>} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/product/:id" element={<ProductPage />} />
				<Route path="/claims" element={<ClaimsPage />} />
				<Route path="/orders" element={<AdminOrdersPage />} />
				<Route path="/order/:id" element={<div>Страница заявки</div>} />
				<Route path="/users" element={<div>Страница пользователей</div>} />
				<Route path="*" element={<div>Страница ошибки</div>} />
			</Routes>
			{/* </Content> */}
			{/* <Footer /> */}
		</>
	);
}

export default Diplom;
