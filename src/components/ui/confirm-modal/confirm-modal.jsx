import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../modal/modal';
import styles from './confirm-modal.module.css';

export const ConfirmModal = ({
	isOpen,
	onClose,
	onConfirm,
	title = 'Подтверждение действия',
	text,
	confirmText = 'Да, удалить',
	cancelText = 'Отмена',
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title={title}>
			<p className={styles.text}>{text}</p>

			<div className={styles.actions}>
				<button
					type="button"
					className={`${styles.btn} ${styles.cancelBtn}`}
					onClick={onClose}
				>
					{cancelText}
				</button>

				<button
					type="button"
					className={`${styles.btn} ${styles.confirmBtn}`}
					onClick={onConfirm}
				>
					{confirmText}
				</button>
			</div>
		</Modal>
	);
};

ConfirmModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	title: PropTypes.string,
	text: PropTypes.string.isRequired,
	confirmText: PropTypes.string,
	cancelText: PropTypes.string,
};
