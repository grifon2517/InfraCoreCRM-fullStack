import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer } from './store/authReducer';

const rootReducer = combineReducers({
	auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
