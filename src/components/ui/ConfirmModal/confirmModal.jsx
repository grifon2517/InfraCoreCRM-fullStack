import { Modal } from '../modal/modal';
import { Button } from '../button/button';

export const ConfirmModal = ({
	isOpen,
	onClose,
	onConfirm,
	title = 'Подтвердите действие',
	text = 'Вы действительно хотите удалить этот элемент?',
}) => {
	const handleConfirm = () => {
		onConfirm();
		onClose(); // Закрываем после подтверждения
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title={title}>
			<p>{text}</p>

			<div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
				{/* Тут можно поиграть с цветами кнопок, если у тебя в Button есть variant="danger" */}
				<Button onClick={handleConfirm}>Да, удалить</Button>
				<Button onClick={onClose} style={{ background: '#555' }}>
					Отмена
				</Button>
			</div>
		</Modal>
	);
};
