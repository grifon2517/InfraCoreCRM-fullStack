import { Link } from 'react-router-dom';
import styles from './products-card.module.css';

export function ProductCard({ product }) {
	return (
		<Link to={`/product/${product._id}`} className={styles.card}>
			<div className={styles.imageWrap}>
				<img
					src={
						product.image
							? product.image.includes('uploads')
								? `http://localhost:5000${product.image.startsWith('/') ? '' : '/'}${product.image}`
								: product.image
							: '/placeholder.jpg'
					}
					alt={product.title}
					className={styles.image}
				/>
			</div>

			<div className={styles.content}>
				<h3 className={styles.title}>{product.title}</h3>
				<p className={styles.description}>{product.shortDescription}</p>

				{/* цена пока фейковая */}
				<div className={styles.price}>По запросу</div>
			</div>
		</Link>
	);
}
