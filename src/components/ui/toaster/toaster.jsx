import { Toaster as BaseToaster } from 'react-hot-toast';
import styles from './toaster.module.css';

export function MyToaster() {
	return (
		<BaseToaster
			position="top-center"
			toastOptions={{
				className: styles.customToast,
				success: {
					iconTheme: {
						primary: '#4ade80',
						secondary: '#1a1d24',
					},
				},
				error: {
					iconTheme: {
						primary: '#ef4444',
						secondary: '#1a1d24',
					},
				},
			}}
		/>
	);
}
