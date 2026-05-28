import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../../api/admin';
import { Button, Loader, OrderModal, ConfirmModal } from '../../../components';
import { useModal } from '../../../hooks';
import styles from './admin-orders.module.css';

export const AdminOrdersPage = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedOrder, setSelectedOrder] = useState(null);

	const { isOpen, open, close } = useModal();
	const [orderToDelete, setOrderToDelete] = useState(null);

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
		setOrders((prev) => prev.map((order) => (order._id === id ? { ...order, status } : order)));

		try {
			await updateOrderStatus(id, status);
			toast.success('Статус обновлён');
		} catch (err) {
			fetchOrders(); // откат
			toast.error('Ошибка обновления');
		}
	};

	// Открывает модалку и запоминает ID заявки
	const handleDeleteClick = (id) => {
		setOrderToDelete(id);
		open();
	};

	// Реально удаляет после подтверждения
	const confirmOrderDelete = async () => {
		if (!orderToDelete) return;

		try {
			await deleteOrder(orderToDelete);
			setOrders((prev) => prev.filter((order) => order._id !== orderToDelete));
			toast.success('Заявка удалена');
		} catch {
			toast.error('Ошибка удаления');
		} finally {
			close(); // Закрываем модалку в любом случае
		}
	};

	if (loading && !orders.length) {
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
								<Button
									className={styles.deleteBtn}
									onClick={(e) => {
										e.stopPropagation();
										handleDeleteClick(order._id);
									}}
								>
									🗑
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<OrderModal
				order={selectedOrder}
				onClose={() => setSelectedOrder(null)}
				onStatusChange={handleStatusChange}
				onDelete={handleDeleteClick} // Здесь тоже меняем на вызов модалки!
			/>
			<ConfirmModal
				isOpen={isOpen}
				onClose={close}
				onConfirm={confirmOrderDelete}
				title="Удаление заявки"
				text="Вы уверены, что хотите удалить эту заявку? Это действие нельзя отменить."
			/>
		</>
	);
};
