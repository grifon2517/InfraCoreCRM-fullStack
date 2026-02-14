import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import './index.css';
import Diplom from './Diplom';

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<BrowserRouter>
			<Diplom />
		</BrowserRouter>
	</Provider>,
);
