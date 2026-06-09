const initialState = {
	user: null,
	isAuth: false,
	loading: true,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'AUTH_SUCCESS':
			return {
				...state,
				user: action.payload,
				isAuth: true,
				loading: false,
			};

		case 'AUTH_LOGOUT':
			return {
				...state,
				user: null,
				isAuth: false,
				loading: false,
			};

		case 'AUTH_FINISH_LOADING':
			return {
				...state,
				loading: false,
			};

		default:
			return state;
	}
};
