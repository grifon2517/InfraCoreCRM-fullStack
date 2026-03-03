import toast from 'react-hot-toast';

export const confirmDelete = (onConfirm) => {
	toast((t) => (
		<div>
			<p>Удалить заявку?</p>

			<div style={{ display: 'flex', gap: 8 }}>
				<button
					onClick={() => {
						toast.dismiss(t.id);
						onConfirm();
					}}
				>
					Да
				</button>

				<button onClick={() => toast.dismiss(t.id)}>Отмена</button>
			</div>
		</div>
	));
};
