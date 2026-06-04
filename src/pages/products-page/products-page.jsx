import { useFetch } from '../../hooks/useFetch';
import { ProductCard } from '../../components/product-card/product-card';
import { Loader } from '../../components';
import styles from './products-page.module.css';

export function ProductsPage() {
	// Вся грязная работа с загрузкой и try/catch теперь инкапсулирована тут
	const { data: products, loading } = useFetch('/products');

	if (loading) return <Loader />;

	if (!products.length) {
		return <h3 className={styles.emptyText}>Товары отсутствуют</h3>;
	}

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>Моя продукция</h2>

			<div className={styles.grid}>
				{products.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</div>
	);
}
