import styles from './modal.module.css';

export const OrderModal = ({ order, onClose, onStatusChange, onDelete }) => {
	if (!order) return null;

	return (
		<div>
			<div className={styles.modalOverlay} onClick={onClose}>
				<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
					<h2>Заявка #{order._id.slice(-6)}</h2>

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
				</div>
			</div>
		</div>
	);
};
