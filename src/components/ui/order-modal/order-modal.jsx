import { Modal } from '../modal/modal'; // Укажи правильный путь к базовой модалке
import styles from './order-modal.module.css';

export const OrderModal = ({ order, onClose, onStatusChange, onDelete }) => {
	// Если клика по заявке не было, модалка спит
	if (!order) return null;

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				{/* Крестик закрытия */}
				<button type="button" className={styles.closeCross} onClick={onClose}>
					&times;
				</button>

				<h3 className={styles.title}>Заявка #{order._id.slice(-6)}</h3>

				{/* Структурированный вывод информации */}
				<p className={styles.infoLine}>
					<strong>Пользователь:</strong> {order.userId?.login || 'Гость'}
				</p>
				<p className={styles.infoLine}>
					<strong>Товар:</strong> {order.productId?.title || 'Удаленный товар'}
				</p>
				<p className={styles.infoLine}>
					<strong>Тип услуги:</strong> {order.type === 'Rent' ? 'Аренда' : 'Покупка'}
				</p>
				<p className={styles.infoLine}>
					<strong>Комментарий:</strong> {order.comment || '—'}
				</p>

				{/* Кастомизированный селект изменения статуса */}
				<select
					className={styles.selectStatus}
					value={order.status}
					onChange={(e) => onStatusChange(order._id, e.target.value)}
				>
					<option value="new">new</option>
					<option value="in_progress">in_progress</option>
					<option value="done">done</option>
				</select>

				{/* Кнопка удаления заявки */}
				<button
					type="button"
					className={styles.deleteBtn}
					onClick={() => onDelete(order._id)}
				>
					Удалить заявку
				</button>
			</div>
		</div>
	);
};
