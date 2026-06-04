import { Modal } from '../modal/modal';
import { Button } from '../button/button';
import styles from './confirm-modal.module.css';

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, text }) => {
	// Если модалка закрыта, просто ничего не рендерим
	if (!isOpen) return null;

	return (
		<div className={styles.overlay} onClick={onClose}>
			{/* stopPropagation нужен, чтобы модалка не закрывалась при клике по самому окошку */}
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				{/* Кнопка-крестик в углу */}
				<button type="button" className={styles.closeCross} onClick={onClose}>
					&times;
				</button>

				<h3 className={styles.title}>{title || 'Подтверждение действия'}</h3>

				<p className={styles.text}>{text}</p>

				<div className={styles.actions}>
					{/* Кнопка Отмена (тихая, серая) */}
					<button
						type="button"
						className={`${styles.btn} ${styles.cancelBtn}`}
						onClick={onClose}
					>
						Отмена
					</button>

					{/* Кнопка Удалить (агрессивная, красная) */}
					<button
						type="button"
						className={`${styles.btn} ${styles.confirmBtn}`}
						onClick={onConfirm}
					>
						Да, удалить
					</button>
				</div>
			</div>
		</div>
	);
};
