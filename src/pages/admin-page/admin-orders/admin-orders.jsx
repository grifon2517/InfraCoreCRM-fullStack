import { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../../api/admin';

export const AdminOrdersPage = () => {
	const [orders, setOrders] = useState([]);

	const fetchOrders = async () => {
		try {
			const res = await getAllOrders();
			setOrders(res.data);
		} catch (err) {
			console.error(err);
			alert('Ошибка загрузки заявок');
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	const handleStatusChange = async (id, status) => {
		try {
			await updateOrderStatus(id, status);
			fetchOrders();
		} catch (err) {
			console.error(err);
			alert('Ошибка обновления статуса');
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Удалить заявку?')) return;

		try {
			await deleteOrder(id);
			fetchOrders();
		} catch (err) {
			console.error(err);
			alert('Ошибка удаления');
		}
	};

	return (
		<div>
			<h1>Админ — заявки</h1>

			{orders.map((order) => (
				<div key={order._id} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
					<p>
						<b>Пользователь:</b> {order.userId.login}
					</p>
					<p>
						<b>Товар:</b> {order.productId.title}
					</p>
					<p>
						<b>Тип:</b> {order.type}
					</p>
					<p>
						<b>Комментарий:</b> {order.comment}
					</p>

					<p>
						<b>Статус:</b>
					</p>
					<select
						value={order.status}
						onChange={(e) => handleStatusChange(order._id, e.target.value)}
					>
						<option value="new">new</option>
						<option value="in_progress">in progress</option>
						<option value="done">done</option>
					</select>

					<br />
					<br />

					<button onClick={() => handleDelete(order._id)}>Удалить</button>
				</div>
			))}
		</div>
	);
};
