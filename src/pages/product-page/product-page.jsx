import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api';

export function ProductPage() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);

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

	if (!product) return <div>Loading...</div>;

	return (
		<div>
			<h2>{product.title}</h2>
			<p>{product.description}</p>

			<button>Оформить заявку</button>
		</div>
	);
}
