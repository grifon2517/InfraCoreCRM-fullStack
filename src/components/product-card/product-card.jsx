import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './product-card.module.css';

export function ProductCard({ product }) {
	const imageUrl = product.image
		? product.image.includes('uploads')
			? `http://localhost:5000${product.image.startsWith('/') ? '' : '/'}${product.image}`
			: product.image
		: '/placeholder.jpg';

	return (
		<Link to={`/product/${product._id}`} className={styles.card}>
			<div className={styles.imageWrap}>
				<img src={imageUrl} alt={product.title} className={styles.image} />
			</div>

			<div className={styles.content}>
				<h3 className={styles.title}>{product.title}</h3>
				<p className={styles.description}>{product.shortDescription}</p>

				<div className={styles.price}>По запросу</div>
			</div>
		</Link>
	);
}

ProductCard.propTypes = {
	product: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		image: PropTypes.string,
		shortDescription: PropTypes.string,
	}).isRequired,
};
