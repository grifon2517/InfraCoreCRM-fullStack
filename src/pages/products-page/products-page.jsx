import { useEffect, useState } from 'react';
import api from '../../api/api';
import { ProductCard } from '../../components/products-card/products-card';
import { Loader } from '../../components';
import styles from './products-page.module.css';

export function ProductsPage() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const res = await api.get('/products');
				setProducts(res.data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	if (loading) return <Loader />;
	return (
		<div className={styles.wrapper}>
			<h2>Моя продукция</h2>

			<div className={styles.grid}>
				{products.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</div>
	);
}
