import React from 'react';
import { useFetch } from '../../hooks';
import { Loader, ProductCard } from '../../components';
import styles from './products-page.module.css';

export function ProductsPage() {
	const { data: products, loading } = useFetch('/products');

	if (loading) return <Loader />;

	if (!products.length) {
		return <h3 className={styles.emptyText}>Товары отсутствуют</h3>;
	}

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>Каталог оборудования</h2>

			<div className={styles.grid}>
				{products.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</div>
	);
}
