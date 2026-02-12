import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api';

export function ProductPage() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [product, setProduct] = useState(null);
	const [type, setType] = useState(null);
	const [comment, setComment] = useState('');

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const res = await api.get(`/products/${id}`);
				setProduct(res.data);
			} catch (err) {
				console.error(err);
			}
		};

		fetchProduct();
	}, [id]);

	const handleCreateOrder = async () => {
		if (!type) {
			alert('Выберите тип услуги');
			return;
		}

		try {
			await api.post('/orders', {
				productId: id,
				type,
				comment,
			});

			alert('Заявка отправлена');
			navigate('/claims');
		} catch (err) {
			console.error(err);
			alert('Ошибка при создании заявки');
		}
	};

	if (!product) return <div>Loading...</div>;

	return (
		<div>
			<h2>{product.title}</h2>
			<p>{product.description}</p>

			<div>Тут будет картинка с устройством</div>

			<div>
				<p>тут будет описание и доп параметры</p>
			</div>

			<h3>Выберите услугу</h3>

			<button onClick={() => setType('diagnostic')}>Провести диагностику</button>

			<button onClick={() => setType('repair')}>Необходим ремонт</button>

			<p>Выбрано: {type || 'не выбрано'}</p>

			<div>
				<textarea
					placeholder="Уточнение к заявке"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
			</div>

			<button onClick={handleCreateOrder}>Оформить заявку</button>
		</div>
	);
}
