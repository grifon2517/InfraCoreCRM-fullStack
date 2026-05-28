import { Modal } from '../modal/modal'; // Укажи правильный путь к базовой модалке
import styles from './orderModal.module.css';

export const OrderModal = ({ order, onClose, onStatusChange, onDelete }) => {
	// Модалка открыта, если объект order существует (не null и не undefined)
	const isOpen = !!order;

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={order ? `Заявка #${order._id.slice(-6)}` : ''}
		>
			{/* Рендерим содержимое только если заказ выбран, чтобы не было ошибок чтения свойств undefined */}
			{order && (
				<>
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

					<select
						value={order.status}
						onChange={(e) => onStatusChange(order._id, e.target.value)}
					>
						<option value="new">new</option>
						<option value="in_progress">in progress</option>
						<option value="done">done</option>
						<option value="rejected">rejected</option>
					</select>

					<button onClick={() => onDelete(order._id)}>Удалить</button>
				</>
			)}
		</Modal>
	);
};
