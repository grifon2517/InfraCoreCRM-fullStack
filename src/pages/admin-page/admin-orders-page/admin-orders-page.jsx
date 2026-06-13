import { useState, useEffect } from 'react';

import toast from 'react-hot-toast';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../../api/admin';
import { Button, Loader, OrderModal, ConfirmModal } from '../../../components';
import { useModal } from '../../../hooks';
import styles from './admin-orders-page.module.css';

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
			console.error('Ошибка при получении заявок:', err);
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

			if (selectedOrder && selectedOrder._id === id) {
				setSelectedOrder((prev) => ({ ...prev, status }));
			}
		} catch (err) {
			console.error('Ошибка изменения статуса:', err);
			fetchOrders();
			toast.error('Ошибка обновления статуса');
		}
	};

	const handleDeleteClick = (id) => {
		setOrderToDelete(id);
		open();
	};

	// Подтверждение удаления заявки в модальном окне
	const confirmOrderDelete = async () => {
		if (!orderToDelete) return;

		try {
			await deleteOrder(orderToDelete);
			setOrders((prev) => prev.filter((order) => order._id !== orderToDelete));
			toast.success('Заявка удалена');
			setSelectedOrder(null);
		} catch (err) {
			console.error('Ошибка удаления заявки:', err);
			toast.error('Ошибка удаления');
		} finally {
			close();
		}
	};

	const getStatusClass = (status) => {
		if (status === 'Новая') return styles.statusNew;
		if (status === 'В работе') return styles.statusProgress;
		if (status === 'Выполнена') return styles.statusDone;
		return '';
	};

	if (loading && !orders.length) return <Loader />;
	if (!orders.length) return <h2 className={styles.emptyTitle}>Заявок пока нет</h2>;

	return (
		<div className={styles.container}>
			<h2 className={styles.pageTitle}>Управление заявками</h2>

			<div className={styles.tableCard}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>ID</th>
							<th>Пользователь</th>
							<th>Товар</th>
							<th>Тип</th>
							<th>Статус</th>
							<th style={{ textAlign: 'right' }}>Действия</th>
						</tr>
					</thead>

					<tbody>
						{orders.map((order) => (
							<tr
								key={order._id}
								className={styles.row}
								onClick={() => setSelectedOrder(order)}
							>
								<td className={styles.idCell}>#{order._id.slice(-6)}</td>
								<td>{order.userId?.login || 'Гость'}</td>
								<td className={styles.productCell}>
									{order.productId?.title || 'Удаленный товар'}
								</td>
								<td>
									<span
										className={
											order.type === 'Rent'
												? styles.typeRent
												: styles.typePurchase
										}
									>
										{order.type === 'Rent' ? 'Аренда' : 'Покупка'}
									</span>
								</td>
								<td>
									<span
										className={`${styles.statusBadge} ${getStatusClass(order.status)}`}
									>
										{order.status}
									</span>
								</td>
								<td style={{ textAlign: 'right' }}>
									<button
										type="button"
										className={styles.deleteBtn}
										onClick={(e) => {
											e.stopPropagation();
											handleDeleteClick(order._id);
										}}
									>
										🗑
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<OrderModal
				order={selectedOrder}
				onClose={() => setSelectedOrder(null)}
				onStatusChange={handleStatusChange}
				onDelete={handleDeleteClick}
			/>

			<ConfirmModal
				isOpen={isOpen}
				onClose={close}
				onConfirm={confirmOrderDelete}
				title="Удаление заявки"
				text="Вы уверены, что хотите удалить эту заявку? Это действие нельзя отменить."
			/>
		</div>
	);
};
