import { Link } from 'react-router-dom';
import styles from './Button.module.css';

export function Button({
	type = 'button',
	variant = 'primary',
	disabled = false,
	loading = false,
	onClick,
	children,
	to,
	as = 'button',
}) {
	const className = `${styles.button} ${styles[variant]}`;

	if (as === 'link') {
		return (
			<Link to={to} className={className}>
				{children}
			</Link>
		);
	}

	return (
		<button type={type} className={className} onClick={onClick} disabled={disabled || loading}>
			{loading ? 'Загрузка...' : children}
		</button>
	);
}
