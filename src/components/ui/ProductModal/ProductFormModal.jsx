import { useState, useEffect } from 'react';
import { Button } from '../button/button';
import styles from './ProductFormModal.module.css';

export const ProductFormModal = ({ isOpen, onClose, onSave, product }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);

	// Если открыли для редактирования, заполняем поля данными товара
	useEffect(() => {
		if (product) {
			setTitle(product.title || '');
			setDescription(product.description || '');
			setImage(null); // сбрасываем выбранный файл
		} else {
			setTitle('');
			setDescription('');
			setImage(null);
		}
	}, [product, isOpen]);

	if (!isOpen) return null;

	const handleSubmit = (e) => {
		e.preventDefault();

		// Упаковываем данные в FormData для отправки на бэкенд
		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		if (image) {
			formData.append('image', image);
		}

		onSave(formData);
	};

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h3>{product ? 'Редактировать товар' : 'Добавить товар'}</h3>

				<form onSubmit={handleSubmit} className={styles.form}>
					<input
						type="text"
						placeholder="Название оборудования"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>

					<textarea
						placeholder="Подробное описание"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className={styles.textarea}
						required
					/>

					<div className={styles.fileInput}>
						<label>Картинка товара:</label>
						<input
							type="file"
							accept="image/*"
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</div>

					<div className={styles.actions}>
						<Button type="button" onClick={onClose}>
							Отмена
						</Button>
						<Button type="submit">Сохранить</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
