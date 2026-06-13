import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../modal/modal'; // Путь выверен
import styles from './order-modal.module.css';

export const OrderModal = ({ order, onClose, onStatusChange, onDelete }) => {
	if (!order) return null;

	return (
		<Modal isOpen={!!order} onClose={onClose} title={`Заявка #${order._id.slice(-6)}`}>
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

			<select
				className={styles.selectStatus}
				value={order.status}
				onChange={(e) => onStatusChange(order._id, e.target.value)}
			>
				<option value="Новая">Новая</option>
				<option value="В работе">В работе</option>
				<option value="Выполнена">Выполнена</option>
			</select>

			<button type="button" className={styles.deleteBtn} onClick={() => onDelete(order._id)}>
				Удалить заявку
			</button>
		</Modal>
	);
};

OrderModal.propTypes = {
	order: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		userId: PropTypes.shape({
			login: PropTypes.string,
		}),
		productId: PropTypes.shape({
			title: PropTypes.string,
		}),
		type: PropTypes.string.isRequired,
		comment: PropTypes.string,
		status: PropTypes.string.isRequired,
	}),
	onClose: PropTypes.func.isRequired,
	onStatusChange: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};
