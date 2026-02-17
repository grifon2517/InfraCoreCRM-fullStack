import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../../api/admin';

export const AdminOrdersPage = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchOrders = async () => {
		try {
			const res = await getAllOrders();
			setOrders(res.data);
		} catch (err) {
			console.error(err);
			toast.error('Ошибка загрузки заявок');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	const handleStatusChange = async (id, status) => {
		try {
			const res = await updateOrderStatus(id, status);

			setOrders((prev) =>
				prev.map((order) =>
					order._id === id ? { ...order, status: res.data.order.status } : order,
				),
			);

			toast.success('Статус обновлён');
		} catch (err) {
			console.error(err);
			toast.error('Ошибка обновления статуса');
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Удалить заявку?')) return;

		try {
			await deleteOrder(id);

			setOrders((prev) => prev.filter((order) => order._id !== id));

			toast.success('Заявка удалена');
		} catch (err) {
			console.error(err);
			toast.error('Ошибка удаления');
		}
	};

	if (loading) {
		return <h2>Загрузка заявок...</h2>;
	}

	if (!orders.length) {
		return <h2>Заявок пока нет</h2>;
	}

	return (
		<div style={{ padding: 20 }}>
			<h1>Админ — заявки</h1>

			{orders.map((order) => (
				<div
					key={order._id}
					style={{
						border: '1px solid #ddd',
						borderRadius: 10,
						padding: 16,
						marginBottom: 16,
						background: '#475fac',
					}}
				>
					<p>
						<b>Пользователь:</b> {order.userId?.login}
					</p>

					<p>
						<b>Товар:</b> {order.productId?.title}
					</p>

					<p>
						<b>Тип:</b> {order.type}
					</p>

					<p>
						<b>Комментарий:</b> {order.comment || '—'}
					</p>

					<div style={{ marginTop: 10 }}>
						<b>Статус:</b>

						<select
							value={order.status}
							onChange={(e) => handleStatusChange(order._id, e.target.value)}
							style={{ marginLeft: 10 }}
						>
							<option value="new">new</option>
							<option value="in_progress">in progress</option>
							<option value="done">done</option>
							<option value="rejected">rejected</option>
						</select>
					</div>

					<button onClick={() => handleDelete(order._id)} style={{ marginTop: 12 }}>
						Удалить
					</button>
				</div>
			))}
		</div>
	);
};
