import { useState, useEffect } from 'react';
import api from '../api/api';

export const useFetch = (url, initialData = []) => {
	const [data, setData] = useState(initialData);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await api.get(url);
			setData(res.data);
		} catch (err) {
			console.error('Ошибка в useFetch:', err);
			setError(err.response?.data?.message || 'Произошла ошибка при загрузке данных');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (url) {
			fetchData();
		}
	}, [url]);

	return { data, loading, error, setData, refetch: fetchData };
};
