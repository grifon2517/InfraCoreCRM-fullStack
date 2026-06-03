import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './home-page.module.css';

export function HomePage() {
	const navigate = useNavigate();

	const handleGoToCatalog = () => {
		navigate('/products');
	};

	return (
		<div className={styles.container}>
			{/* 1. HERO SECTION */}
			<section className={styles.hero}>
				<h1 className={styles.heroTitle}>Оборудование для современных дата-центров</h1>
				<p className={styles.heroSubtitle}>
					Продажа и аренда серверных решений для бизнеса любого масштаба
				</p>
				<p className={styles.heroDesc}>
					Сегодня дата-центры — это фундамент цифровой инфраструктуры. От стабильности
					серверного оборудования зависит работа сервисов, безопасность данных и
					масштабирование бизнеса. На нашей платформе вы можете подобрать оборудование для
					создания или расширения собственного дата-центра: серверы, системы хранения
					данных и сопутствующую инфраструктуру.
				</p>
				<button type="button" className={styles.primaryBtn} onClick={handleGoToCatalog}>
					Перейти в каталог
				</button>
			</section>

			{/* 2. WHAT IS AVAILABLE SECTION */}
			<section>
				<h2 className={styles.sectionTitle}>Что доступно на платформе</h2>
				<div className={styles.grid}>
					<div className={styles.card}>
						<h3 className={styles.cardTitle}>Серверное оборудование</h3>
						<p className={styles.cardText}>
							Высокопроизводительные серверы для бизнеса, облачных решений и
							enterprise-проектов.
						</p>
					</div>
					<div className={styles.card}>
						<h3 className={styles.cardTitle}>Системы хранения данных</h3>
						<p className={styles.cardText}>
							Надежные решения для хранения и резервирования критически важных данных.
						</p>
					</div>
					<div className={styles.card}>
						<h3 className={styles.cardTitle}>Гибкая аренда</h3>
						<p className={styles.cardText}>
							Возможность арендовать передовое оборудование без крупных первоначальных
							вложений.
						</p>
					</div>
				</div>
			</section>

			{/* 3. HOW IT WORKS SECTION */}
			<section className={styles.stepsContainer}>
				<h2 className={styles.sectionTitle}>Как это работает</h2>
				<div className={styles.stepsGrid}>
					<div className={styles.stepRow}>
						<div className={styles.stepNumber}>1</div>
						<div className={styles.stepText}>Вы выбираете оборудование в каталоге</div>
					</div>
					<div className={styles.stepRow}>
						<div className={styles.stepNumber}>2</div>
						<div className={styles.stepText}>Оформляете заявку с типом услуги</div>
					</div>
					<div className={styles.stepRow}>
						<div className={styles.stepNumber}>3</div>
						<div className={styles.stepText}>Отслеживаете статус в личном кабинете</div>
					</div>
					<div className={styles.stepRow}>
						<div className={styles.stepNumber}>4</div>
						<div className={styles.stepText}>
							Администратор обрабатывает и подтверждает заказ
						</div>
					</div>
				</div>
			</section>

			{/* 4. FINAL CTA BLOCK */}
			<section className={styles.ctaBlock}>
				<h3 className={styles.ctaTitle}>Готовы начать?</h3>
				<p className={styles.ctaText}>
					Перейти в каталог и выберите оборудование для вашего проекта.
				</p>
				<button type="button" className={styles.primaryBtn} onClick={handleGoToCatalog}>
					Перейти в каталог
				</button>
			</section>
		</div>
	);
}
