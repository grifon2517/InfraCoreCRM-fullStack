import React from 'react';
import { Button } from '../../components';
import styles from './not-found-page.module.css';

export function NotFoundPage() {
	return (
		<div className={styles.container}>
			<div className={styles.errorCard}>
				<h1 className={styles.errorCode}>404</h1>
				<h2 className={styles.errorTitle}>Страница не найдена</h2>
				<p className={styles.errorText}>
					Возможно, адрес был введен неверно или страница была перемещена.
				</p>

				<Button as="link" to="/">
					Вернуться на главную
				</Button>
			</div>
		</div>
	);
}
