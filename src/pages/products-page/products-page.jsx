import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';

export function ProductsPage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await api.get('/products');
				setProducts(res.data);
			} catch (err) {
				console.error(err);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div>
			<h2>Моя продукция</h2>

			{products.map((product) => (
				<Link key={product._id} to={`/product/${product._id}`}>
					<div>
						<h3>{product.title}</h3>
						<p>{product.description}</p>
					</div>
				</Link>
			))}
		</div>
	);
}
