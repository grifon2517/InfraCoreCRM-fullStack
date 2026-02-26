import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../../api/admin';
import { Loader, OrderModal } from '../../../components';
import styles from './admin-orders.module.css';

export const AdminOrdersPage = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedOrder, setSelectedOrder] = useState(null);

	const fetchOrders = async () => {
		try {
			setLoading(true);
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
			setLoading(true);
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
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Удалить заявку?')) return;

		try {
			setLoading(true);
			await deleteOrder(id);

			setOrders((prev) => prev.filter((order) => order._id !== id));

			toast.success('Заявка удалена');
		} catch (err) {
			console.error(err);
			toast.error('Ошибка удаления');
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <Loader />;
	}

	if (!orders.length) {
		return <h2>Заявок пока нет</h2>;
	}

	return (
		<>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Пользователь</th>
						<th>Товар</th>
						<th>Тип</th>
						<th>Статус</th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{orders.map((order) => (
						<tr
							key={order._id}
							className={styles.row}
							onClick={() => setSelectedOrder(order)}
						>
							<td>{order._id.slice(-6)}</td>

							<td>{order.userId?.login}</td>

							<td>{order.productId?.title}</td>

							<td>{order.type}</td>

							<td>
								<span className={styles.status}>{order.status}</span>
							</td>

							<td>
								<button
									className={styles.deleteBtn}
									onClick={(e) => {
										e.stopPropagation();
										handleDelete(order._id);
									}}
								>
									🗑
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<OrderModal
				order={selectedOrder}
				onClose={() => setSelectedOrder(null)}
				onStatusChange={handleStatusChange}
				onDelete={handleDelete}
			/>
		</>
	);
};
