import api from '../api/api';

export const fetchMe = () => async (dispatch) => {
	try {
		const res = await api.get('/auth/me');

		dispatch({
			type: 'AUTH_SUCCESS',
			payload: res.data,
		});
	} catch (error) {
		console.error('fetchMe error', error);
		dispatch({ type: 'AUTH_FINISH_LOADING' });
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('token');

	dispatch({
		type: 'AUTH_LOGOUT',
	});
};
