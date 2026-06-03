import { useState } from 'react';
import { useFetch } from '../../../hooks';
import api from '../../../api/api';
import { Button, ConfirmModal, Loader } from '../../../components';
import { useModal } from '../../../hooks';
import styles from './admin-users-page.module.css'; // Импортируем стили

export const UserPage = () => {
	// 1. Избавились от useEffect и ручных стейтов загрузки.
	// Предполагаем, что useFetch возвращает { data, loading, refetch }
	const { data: userList, loading, refetch } = useFetch('/users', []);

	const { isOpen, open, close } = useModal();
	const [userToDelete, setUserToDelete] = useState(null);

	const handleDeleteClick = (id) => {
		setUserToDelete(id);
		open();
	};

	const confirmDelete = async () => {
		if (!userToDelete) return;

		try {
			await api.delete(`/users/${userToDelete}`);

			// 2. Вместо ручной фильтрации просто обновляем данные с бэкенда
			refetch();

			close();
		} catch (err) {
			console.error(err);
		}
	};

	if (loading) return <Loader />;

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Список пользователей</h2>

			<div className={styles.tableCard}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Логин</th>
							<th>Роль в системе</th>
							<th style={{ textAlign: 'right' }}>Действия</th>
						</tr>
					</thead>
					<tbody>
						{userList.map((user) => (
							<tr key={user._id}>
								<td className={styles.username}>{user.login}</td>
								<td>
									<span
										className={`${styles.badge} ${
											user.role === 'admin'
												? styles.badgeAdmin
												: styles.badgeUser
										}`}
									>
										{user.role}
									</span>
								</td>
								<td style={{ textAlign: 'right' }}>
									{user.role !== 'admin' ? (
										<button
											type="button"
											className={styles.deleteBtn}
											onClick={() => handleDeleteClick(user._id)}
										>
											Удалить
										</button>
									) : (
										<span className={styles.disabledText}>—</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<ConfirmModal
				className={styles.confirmModal}
				isOpen={isOpen}
				onClose={close}
				onConfirm={confirmDelete}
				title="Удаление пользователя"
				text="Вы действительно хотите удалить этого пользователя? Действие необратимо."
			/>
		</div>
	);
};
