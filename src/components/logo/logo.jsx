import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './logo.module.css';

export const Logo = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.logoWrapper} onClick={() => navigate('/')} title="На главную">
			<svg
				width="56"
				height="28"
				viewBox="0 0 56 28"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={styles.svgIcon}
			>
				{/* Верхний мощный серверный модуль */}
				<rect width="56" height="7" rx="3.5" fill="#3b82f6" />
				<circle cx="8" cy="3.5" r="2" fill="#10b981" /> {/* Лампочка активности */}
				<rect
					x="16"
					y="2.5"
					width="28"
					height="2"
					rx="1"
					fill="#1a1d24"
					fillOpacity="0.4"
				/>
				{/* Средний серверный модуль */}
				<rect y="10.5" width="56" height="7" rx="3.5" fill="#3b82f6" />
				<circle cx="8" cy="14" r="2" fill="#10b981" />
				<rect x="16" y="13" width="20" height="2" rx="1" fill="#1a1d24" fillOpacity="0.4" />
				{/* Нижний серверный модуль */}
				<rect y="21" width="56" height="7" rx="3.5" fill="#2563eb" />
				<circle cx="8" cy="24.5" r="2" fill="#f59e0b" /> {/* Индикатор загрузки диска */}
				<rect
					x="16"
					y="23.5"
					width="32"
					height="2"
					rx="1"
					fill="#1a1d24"
					fillOpacity="0.4"
				/>
			</svg>
		</div>
	);
};
