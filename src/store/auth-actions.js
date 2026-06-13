import api from '../api/api';
import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_FINISH_LOADING } from './action-types';

export const logout = () => (dispatch) => {
	localStorage.removeItem('token');
	dispatch({ type: AUTH_LOGOUT });
};

export const fetchMe = () => async (dispatch) => {
	try {
		const res = await api.get('/auth/me');

		dispatch({
			type: AUTH_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		console.error('Ошибка при запросе профиля (fetchMe):', error);

		dispatch(logout());
	}
};
