import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Loader, Button } from '../../components';
import { useFetch } from '../../hooks/useFetch';
import styles from './product-page.module.css';

export function ProductPage() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: product, loading: pageLoading } = useFetch(`/products/${id}`, null);

	const [type, setType] = useState(null);
	const [email, setEmail] = useState('');
	const [comment, setComment] = useState('');
	const [errors, setErrors] = useState({});
	const [success, setSuccess] = useState(false);
	const [orderLoading, setOrderLoading] = useState(false);

	const validate = () => {
		const newErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			newErrors.email = 'Введите корректный email';
		}

		if (!type) {
			newErrors.type = 'Выберите тип услуги';
		}

		return newErrors;
	};

	const handleCreateOrder = async () => {
		const validationErrors = validate();

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		try {
			setOrderLoading(true);
			await api.post('/orders', {
				productId: id,
				type,
				contactEmail: email,
				comment,
			});

			setSuccess(true);
			setErrors({});

			setTimeout(() => {
				navigate('/claims');
			}, 1000);
		} catch (err) {
			console.error('Ошибка при создании заявки:', err);
			setErrors({ server: 'Ошибка при создании заявки' });
		} finally {
			setOrderLoading(false);
		}
	};

	const getProductImageUrl = (image) => {
		if (!image) return '/placeholder.jpg';
		if (image.includes('uploads')) {
			return `http://localhost:5000${image.startsWith('/') ? '' : '/'}${image}`;
		}
		return image;
	};

	if (pageLoading) return <Loader />;

	if (!product) {
		return <p className={styles.notFound}>Продукт не найден</p>;
	}

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{product.title}</h2>

			<div className={styles.imageWrap}>
				<img
					src={getProductImageUrl(product.image)}
					alt={product.title}
					className={styles.image}
				/>
			</div>

			<p className={styles.description}>{product.description}</p>

			<div className={styles.orderCard}>
				<h3 className={styles.cardTitle}>Оформление заявки</h3>

				<p className={styles.label}>Выберите тип услуги:</p>
				<div className={styles.serviceGroup}>
					<button
						type="button"
						className={`${styles.typeBtn} ${type === 'Purchase' ? styles.activeType : ''}`}
						onClick={() => setType('Purchase')}
					>
						Купить оборудование
					</button>

					<button
						type="button"
						className={`${styles.typeBtn} ${type === 'Rent' ? styles.activeType : ''}`}
						onClick={() => setType('Rent')}
					>
						Арендовать оборудование
					</button>
				</div>
				<span className={styles.errorText}>{errors.type || ''}</span>

				<div className={styles.inputGroup}>
					<input
						type="email"
						placeholder="Email для связи"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={styles.input}
					/>
					<span className={styles.errorText}>{errors.email || ''}</span>
				</div>

				<div className={styles.inputGroup}>
					<textarea
						placeholder="Комментарий к заявке (требования, сроки, конфигурация)"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						className={styles.textarea}
					/>
				</div>

				<Button onClick={handleCreateOrder} loading={orderLoading}>
					Оформить заявку
				</Button>

				{errors.server && <p className={styles.serverError}>{errors.server}</p>}
				{success && <p className={styles.successText}>Заявка успешно отправлена!</p>}
			</div>
		</div>
	);
}
