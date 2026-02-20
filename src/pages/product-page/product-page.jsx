import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import { Loader } from '../../components';
import styles from './product-page.module.css';

export function ProductPage() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [product, setProduct] = useState(null);
	const [type, setType] = useState(null);
	const [email, setEmail] = useState('');
	const [comment, setComment] = useState('');
	const [errors, setErrors] = useState({});
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true);
				const res = await api.get(`/products/${id}`);

				setProduct(res.data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

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
			setLoading(true);
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
			console.error(err);
			setErrors({ server: 'Ошибка при создании заявки' });
		} finally {
			setLoading(false);
		}
	};

	if (!loading) return <Loader />;

	return (
		<div>
			<h2>{product.title}</h2>

			<div className={styles.imageWrap}>
				<img
					src={product.image || '/placeholder.jpg'}
					alt={product.title}
					className={styles.image}
				/>
			</div>

			<p>{product.description}</p>

			<h3>Выберите услугу</h3>

			<button onClick={() => setType('Purchase')}>Купить оборудование</button>

			<button onClick={() => setType('Rent')}>Арендовать оборудование</button>

			{errors.type && <p style={{ color: 'red' }}>{errors.type}</p>}

			<input
				type="email"
				placeholder="Email для связи"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				style={{ display: 'block', marginTop: '15px' }}
			/>

			{errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

			<textarea
				placeholder="Комментарий к заявке"
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				style={{ display: 'block', marginTop: '15px', width: '300px', height: '100px' }}
			/>

			<button onClick={handleCreateOrder} style={{ marginTop: '15px' }}>
				Оформить заявку
			</button>

			{errors.server && <p style={{ color: 'red' }}>{errors.server}</p>}
			{success && <p style={{ color: 'green' }}>Заявка отправлена</p>}
		</div>
	);
}
