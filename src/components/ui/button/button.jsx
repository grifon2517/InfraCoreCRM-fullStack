import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './button.module.css';

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

Button.propTypes = {
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	variant: PropTypes.string,
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
	onClick: PropTypes.func,
	children: PropTypes.node.isRequired,
	to: PropTypes.string,
	as: PropTypes.oneOf(['button', 'link']),
};
