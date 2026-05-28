import { useEffect, useState } from 'react';
import api from '../../../api/api';
import { Button } from '../../../components';
import { useModal } from '../../../hooks';
import { ConfirmModal } from '../../../components';

export const UserPage = () => {
	const [userList, setUserList] = useState([]);

	// 2. Достаем функции из нашего кастомного хука
	const { isOpen, open, close } = useModal();

	// 3. Создаем стейт, чтобы запомнить, на какого именно юзера кликнули
	const [userToDelete, setUserToDelete] = useState(null);

	const fetchUsers = async () => {
		try {
			const res = await api.get('/users');
			setUserList(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	// 4. Эта функция теперь просто открывает модалку и сохраняет ID
	const handleDeleteClick = (id) => {
		setUserToDelete(id);
		open();
	};

	// 5. А вот эта функция реально удаляет (передали ее в ConfirmModal)
	const confirmDelete = async () => {
		if (!userToDelete) return; // защита от ошибок

		try {
			await api.delete(`/users/${userToDelete}`);
			// обновляем список
			setUserList((prev) => prev.filter((user) => user._id !== userToDelete));
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<h2>Список пользователей</h2>

			{userList.map((user) => (
				<div key={user._id} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
					<span>
						{user.login} ({user.role})
					</span>

					{user.role !== 'admin' && (
						<Button onClick={() => handleDeleteClick(user._id)}>Delete</Button>
					)}
				</div>
			))}

			{/* 7. Рендерим нашу модалку в самом низу */}
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
