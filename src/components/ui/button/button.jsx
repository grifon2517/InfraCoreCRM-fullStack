import styles from './Button.module.css';

export function Button({
	type = 'button',
	variant = 'primary',
	disabled = false,
	loading = false,
	onClick,
	children,
}) {
	return (
		<button
			type={type}
			className={`${styles.button} ${styles[variant]}`}
			onClick={onClick}
			disabled={disabled || loading}
		>
			{loading ? 'Загрузка...' : children}
		</button>
	);
}
