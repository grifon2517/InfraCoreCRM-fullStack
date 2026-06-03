import { useState, useEffect, useRef } from 'react';
import { Button } from '../button/button';
import styles from './ProductFormModal.module.css';

export const ProductFormModal = ({ isOpen, onClose, onSave, product }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [imageFile, setImageFile] = useState(null);
	const [selectedFileName, setSelectedFileName] = useState(''); // Стейт для имени файла

	const fileInputRef = useRef(null);

	// Синхронизируем стейты, если зашли в режиме редактирования товара
	useEffect(() => {
		if (isOpen) {
			if (product) {
				setTitle(product.title || '');
				setDescription(product.description || '');
				setSelectedFileName(product.image ? 'Текущее изображение' : '');
			} else {
				// Если создаем новый — очищаем форму
				setTitle('');
				setDescription('');
				setSelectedFileName('');
			}
			setImageFile(null);
		}
	}, [product, isOpen]);

	if (!isOpen) return null;

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			setSelectedFileName(file.name); // Теперь имя файла мгновенно выведется на экран!
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Переводим данные в FormData, чтобы бэкенд смог переварить картинку (multer)
		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);

		if (imageFile) {
			formData.append('image', imageFile);
		}

		onSave(formData);
	};

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				{/* Крестик закрытия */}
				<button type="button" className={styles.closeCross} onClick={onClose}>
					&times;
				</button>

				<h3 className={styles.modalTitle}>
					{product ? 'Редактирование оборудования' : 'Добавление оборудования'}
				</h3>

				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.inputGroup}>
						<label>Название товара</label>
						<input
							type="text"
							required
							placeholder="Например: AI-вычислительный узел"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className={styles.input}
						/>
					</div>

					<div className={styles.inputGroup}>
						<label>Описание и характеристики</label>
						<textarea
							required
							placeholder="Укажите подробные спецификации оборудования..."
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className={styles.textarea}
						/>
					</div>

					<div className={styles.inputGroup}>
						<label>Изображение</label>
						<div className={styles.fileUploadContainer}>
							{/* Настоящий инпут прячем, кликаем по нему через label */}
							<input
								type="file"
								accept="image/*"
								ref={fileInputRef}
								onChange={handleFileChange}
								style={{ display: 'none' }}
								id="modal-file-input"
							/>
							<label htmlFor="modal-file-input" className={styles.fileLabel}>
								Выбрать файл...
							</label>

							{/* Показываем пользователю, что файл успешно прикрепился */}
							{selectedFileName && (
								<span className={styles.fileName} title={selectedFileName}>
									📎 {selectedFileName}
								</span>
							)}
						</div>
					</div>

					<div className={styles.actions}>
						<button
							type="button"
							className={`${styles.btn} ${styles.cancelBtn}`}
							onClick={onClose}
						>
							Отмена
						</button>
						<button type="submit" className={`${styles.btn} ${styles.saveBtn}`}>
							Сохранить
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
