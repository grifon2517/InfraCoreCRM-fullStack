import { useSelector, useDispatch } from 'react-redux';

export function Header() {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const logout = () => {
		localStorage.removeItem('token');
		dispatch({ type: 'AUTH_LOGOUT' });
	};

	return (
		<header>
			{user ? (
				<>
					<span>
						{user.login} ({user.role})
					</span>
					<button onClick={logout}>Выйти</button>
				</>
			) : (
				<span>Не авторизован</span>
			)}
		</header>
	);
}
