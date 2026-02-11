import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AdminPage, Login } from './pages';

function Diplom() {
	return (
		<>
			{/* <Header /> */}
			{/* <Content> */}
			<Routes>
				<Route path="/" element={<AdminPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<div>Страница регистрации</div>} />
				<Route path="/products" element={<div>Страница товаров</div>} />
				<Route path="/product/:id" element={<div>Страница товара</div>} />
				<Route path="/claims" element={<div>Страница заказа</div>} />
				<Route path="/orders" element={<div>Страница заявок</div>} />
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
