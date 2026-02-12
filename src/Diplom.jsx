import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AdminPage, Login, ProductsPage, ProductPage, ClaimsPage, AdminOrdersPage } from './pages';

function Diplom() {
	return (
		<>
			{/* <Header /> */}
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
