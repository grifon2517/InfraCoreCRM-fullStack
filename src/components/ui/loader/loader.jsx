import styles from './loader.module.css';

export const Loader = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.spinner}></div>
		</div>
	);
};
