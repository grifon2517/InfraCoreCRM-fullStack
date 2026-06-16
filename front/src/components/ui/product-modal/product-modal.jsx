import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../modal/modal';
import styles from './product-modal.module.css';

export const ProductFormModal = ({ isOpen, onClose, onSave, product }) => {
	const [title, setTitle] = useState('');
	const [shortDescription, setShortDescription] = useState('');
	const [description, setDescription] = useState('');
	const [imageFile, setImageFile] = useState(null);
	const [selectedFileName, setSelectedFileName] = useState('');

	const fileInputRef = useRef(null);

	useEffect(() => {
		if (isOpen) {
			if (product) {
				setTitle(product.title || '');
				setShortDescription(product.shortDescription || '');
				setDescription(product.description || '');
				setSelectedFileName(product.image ? 'Текущее изображение' : '');
			} else {
				setTitle('');
				setShortDescription('');
				setDescription('');
				setSelectedFileName('');
			}
			setImageFile(null);
		}
	}, [product, isOpen]);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			setSelectedFileName(file.name);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('title', title);
		formData.append('shortDescription', shortDescription);
		formData.append('description', description);

		if (imageFile) {
			formData.append('image', imageFile);
		}

		onSave(formData);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={product ? 'Редактирование оборудования' : 'Добавление оборудования'}
		>
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
					<label>Краткое описание (для карточки в каталоге)</label>
					<input
						type="text"
						required
						maxLength={100}
						placeholder="Например: Компактное решение для интенсивных вычислений"
						value={shortDescription}
						onChange={(e) => setShortDescription(e.target.value)}
						className={styles.input}
					/>
				</div>

				<div className={styles.inputGroup}>
					<label>Полное описание и характеристики</label>
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
		</Modal>
	);
};

ProductFormModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
	product: PropTypes.shape({
		title: PropTypes.string,
		shortDescription: PropTypes.string,
		description: PropTypes.string,
		image: PropTypes.string,
	}),
};
