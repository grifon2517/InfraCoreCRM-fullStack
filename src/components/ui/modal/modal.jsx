import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

export const Modal = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlay} onClick={onClose}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				<div className={styles.modalHeader}>
					{title && <h3>{title}</h3>}

					<button
						type="button"
						className={styles.closeButton}
						onClick={onClose}
						aria-label="Закрыть"
					>
						&times;
					</button>
				</div>

				<div className={styles.modalBody}>{children}</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string,
	children: PropTypes.node,
};
