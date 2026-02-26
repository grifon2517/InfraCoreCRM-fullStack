import { useEffect, useState } from 'react';
import api from '../../../api/api';
import { Button } from '../../../components';

export const UserPage = () => {
	const [userList, setUserList] = useState([]);

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

	const handleDelete = async (id) => {
		try {
			await api.delete(`/users/${id}`);

			// обновляем список
			setUserList((prev) => prev.filter((user) => user._id !== id));
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<h2>Список пользователей</h2>

			{userList.map((user) => (
				<div key={user._id}>
					<span>
						{user.login} ({user.role})
					</span>

					{user.role !== 'admin' && (
						<Button onClick={() => handleDelete(user._id)}>Delete</Button>
					)}
				</div>
			))}
		</div>
	);
};
