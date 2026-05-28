import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../../api/api';
import { Button, Loader, ConfirmModal } from '../../../components';
import { ProductFormModal } from '../../../components/ui/ProductModal/ProductFormModal';
import { useModal } from '../../../hooks';
import styles from './admin-product-page.module.css';

export const AdminProductsPage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	// Состояния для редактирования и удаления
	const [currentProduct, setCurrentProduct] = useState(null);
	const [productToDelete, setProductToDelete] = useState(null);

	// Модалки: одна для формы, вторая для подтверждения удаления
	const formModal = useModal();
	const deleteModal = useModal();

	const fetchProducts = async () => {
		try {
			setLoading(true);
			const res = await api.get('/products');
			setProducts(res.data);
		} catch (err) {
			console.error(err);
			toast.error('Ошибка загрузки товаров');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	// Открытие модалки для создания нового товара
	const handleCreateClick = () => {
		setCurrentProduct(null);
		formModal.open();
	};

	// Открытие модалки для редактирования существующего товара
	const handleEditClick = (product) => {
		setCurrentProduct(product);
		formModal.open();
	};

	// Сохранение (и создание, и обновление)
	const handleSaveProduct = async (formData) => {
		try {
			if (currentProduct) {
				// Обновление товара
				const res = await api.put(`/products/${currentProduct._id}`, formData);
				setProducts((prev) =>
					prev.map((p) => (p._id === currentProduct._id ? res.data : p)),
				);
				toast.success('Товар обновлен');
			} else {
				// Создание товара
				const res = await api.post('/products', formData);
				setProducts((prev) => [...prev, res.data]);
				toast.success('Товар добавлен');
			}
			formModal.close();
		} catch (err) {
			console.error(err);
			toast.error('Ошибка сохранения товара');
		}
	};

	// Открытие модалки удаления
	const handleDeleteClick = (id) => {
		setProductToDelete(id);
		deleteModal.open();
	};

	// Подтверждение удаления
	const confirmProductDelete = async () => {
		if (!productToDelete) return;
		try {
			await api.delete(`/products/${productToDelete}`);
			setProducts((prev) => prev.filter((p) => p._id !== productToDelete));
			toast.success('Товар удален');
		} catch (err) {
			console.error(err);
			toast.error('Ошибка удаления');
		} finally {
			deleteModal.close();
		}
	};

	if (loading) return <Loader />;

	return (
		<>
			<div className={styles.header}>
				<h2>Управление оборудованием</h2>
				<Button onClick={handleCreateClick}>+ Добавить товар</Button>
			</div>

			{products.length === 0 ? (
				<h3>Товаров пока нет</h3>
			) : (
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Картинка</th>
							<th>Название</th>
							<th>Описание</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id} className={styles.row}>
								<td>
									<img
										src={
											product.image
												? `http://localhost:5000${product.image}`
												: '/placeholder.jpg'
										}
										alt={product.title}
										className={styles.imgPreview}
									/>
								</td>
								<td>{product.title}</td>
								<td className={styles.descCell}>{product.description}</td>
								<td>
									<div className={styles.btnGroup}>
										<Button onClick={() => handleEditClick(product)}>✏️</Button>
										<Button onClick={() => handleDeleteClick(product._id)}>
											🗑
										</Button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			{/* Модалка формы создания/редактирования */}
			<ProductFormModal
				isOpen={formModal.isOpen}
				onClose={formModal.close}
				onSave={handleSaveProduct}
				product={currentProduct}
			/>

			{/* Модалка подтверждения удаления */}
			<ConfirmModal
				isOpen={deleteModal.isOpen}
				onClose={deleteModal.close}
				onConfirm={confirmProductDelete}
				title="Удаление товара"
				text="Вы уверены, что хотите удалить это оборудование из каталога?"
			/>
		</>
	);
};
