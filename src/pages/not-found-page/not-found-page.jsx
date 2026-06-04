import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './not-found-page.module.css';

export function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.errorCard}>
				<h1 className={styles.errorCode}>404</h1>
				<h2 className={styles.errorTitle}>Страница не найдена</h2>
				<p className={styles.errorText}>
					Возможно, адрес был введен неверно или страница была перемещена.
				</p>
				<button type="button" className={styles.homeBtn} onClick={() => navigate('/')}>
					Вернуться на главную
				</button>
			</div>
		</div>
	);
}
