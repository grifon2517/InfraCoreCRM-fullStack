import { useEffect, useState } from 'react';
import api from '../../api/api';
import toast from 'react-hot-toast';
import { Loader } from '../../components';
import styles from './claims-page.module.css'; // Подключаем наш новый CSS-модуль

export function ClaimsPage() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true);
				const res = await api.get('/orders/my');
				setOrders(res.data);
			} catch (err) {
				console.error(err);
				toast.error(err.response?.data?.message || 'Ошибка сервера');
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	// Вспомогательная функция для динамической раскраски статусов
	const getStatusClass = (status) => {
		if (status === 'new') return styles.statusNew;
		if (status === 'in_progress') return styles.statusProgress;
		if (status === 'done') return styles.statusDone;
		return '';
	};

	if (loading) return <Loader />;

	return (
		<div className={styles.container}>
			<h2 className={styles.pageTitle}>Мои заявки</h2>

			{orders.length === 0 ? (
				<h3 className={styles.emptyTitle}>Вы еще не подавали заявок на оборудование</h3>
			) : (
				<div className={styles.claimsList}>
					{orders.map((order) => (
						<div key={order._id} className={styles.claimCard}>
							{/* HEADER КАРТОЧКИ */}
							<div className={styles.cardHeader}>
								<h3 className={styles.productTitle}>
									{order.productId?.title || 'Удаленное оборудование'}
								</h3>

								<div className={styles.metaInfo}>
									{/* Тип услуги (Аренда / Покупка) */}
									<span
										className={`${styles.typeBadge} ${
											order.type === 'Rent'
												? styles.typeRent
												: styles.typePurchase
										}`}
									>
										{order.type === 'Rent' ? '• Аренда' : '• Покупка'}
									</span>

									{/* Красивый цветной статус */}
									<span
										className={`${styles.statusBadge} ${getStatusClass(order.status)}`}
									>
										{order.status}
									</span>
								</div>
							</div>

							{/* BODY КАРТОЧКИ */}
							<div className={styles.cardBody}>
								{/* Техническое описание товара */}
								{order.productId?.description && (
									<p className={styles.description}>
										{order.productId.description}
									</p>
								)}

								{/* Твой личный комментарий к заказу */}
								<div className={styles.commentBlock}>
									<div className={styles.commentLabel}>
										Ваш комментарий к заявке:
									</div>
									<p className={styles.commentText}>
										{order.comment || 'Комментарий отсутствует'}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
