import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const RequireAuth = ({ children, role }) => {
	const { isAuth, user, loading } = useSelector((state) => state.auth);

	// пока грузим /auth/me
	if (loading) return null;

	// не залогинен
	if (!isAuth) {
		return <Navigate to="/login" />;
	}

	// если требуется роль и она не совпадает
	if (role && user?.role !== role) {
		return <Navigate to="/products" />;
	}

	return children;
};
