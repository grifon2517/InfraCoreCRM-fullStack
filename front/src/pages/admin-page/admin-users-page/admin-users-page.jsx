import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../../api/api';
import { ConfirmModal, Loader } from '../../../components';
import { useModal, useFetch } from '../../../hooks';
import styles from './admin-users-page.module.css';

export const UserPage = () => {
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
			toast.success('Пользователь успешно удален');
			refetch();
		} catch (err) {
			console.error('Ошибка при удалении пользователя:', err);
			toast.error(err.response?.data?.message || 'Ошибка при удалении пользователя');
		} finally {
			close();
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
				isOpen={isOpen}
				onClose={close}
				onConfirm={confirmDelete}
				title="Удаление пользователя"
				text="Вы действительно хотите удалить этого пользователя? Действие необратимо."
			/>
		</div>
	);
};
