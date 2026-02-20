import { useEffect, useState } from 'react';
import api from '../../api/api';
import { Loader } from '../../components';

export function ClaimsPage() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true);
				const res = await api.get('/orders/my');
				setOrders(res.data);
			} catch (err) {
				console.error(err);
				alert('Ошибка загрузки заявок');
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	if (loading) return <Loader />;

	return (
		<div>
			<h2>Мои заявки</h2>

			{orders.length === 0 && <p>Заявок пока нет</p>}

			{orders.map((order) => (
				<div key={order._id} style={{ marginBottom: 20 }}>
					<h4>{order.productId.title}</h4>
					<p>{order.productId.description}</p>
					<p>Тип: {order.type}</p>
					<p>Статус: {order.status}</p>
					<p>Комментарий: {order.comment}</p>
				</div>
			))}
		</div>
	);
}
