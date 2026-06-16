import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../../api/api';
import { Loader, ConfirmModal, getProductImageUrl } from '../../../components';
import { ProductFormModal } from '../../../components/ui/product-modal/product-modal';
import { useModal, useFetch } from '../../../hooks';
import styles from './admin-product-page.module.css';

export const AdminProductsPage = () => {
	const [currentProduct, setCurrentProduct] = useState(null);
	const [productToDelete, setProductToDelete] = useState(null);

	const formModal = useModal();
	const deleteModal = useModal();

	const { data: products, loading, setData: setProducts } = useFetch('/products');

	const handleCreateClick = () => {
		setCurrentProduct(null);
		formModal.open();
	};

	const handleEditClick = (product) => {
		setCurrentProduct(product);
		formModal.open();
	};

	const handleSaveProduct = async (formData) => {
		try {
			if (currentProduct) {
				const res = await api.put(`/products/${currentProduct._id}`, formData);
				setProducts((prev) =>
					prev.map((p) => (p._id === currentProduct._id ? res.data : p)),
				);
				toast.success('Данные товара обновлены');
			} else {
				const res = await api.post('/products', formData);
				setProducts((prev) => [...prev, res.data]);
				toast.success('Товар добавлен');
			}
			formModal.close();
		} catch (err) {
			console.error('Ошибка при сохранении товара:', err);
			toast.error('Ошибка сохранения товара');
		}
	};

	const handleDeleteClick = (id) => {
		setProductToDelete(id);
		deleteModal.open();
	};

	const confirmProductDelete = async () => {
		if (!productToDelete) return;
		try {
			await api.delete(`/products/${productToDelete}`);
			setProducts((prev) => prev.filter((p) => p._id !== productToDelete));
			toast.success('Товар удален');
		} catch (err) {
			console.error('Ошибка при удалении товара:', err);
			toast.error('Ошибка удаления');
		} finally {
			deleteModal.close();
		}
	};

	if (loading) return <Loader />;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.pageTitle}>Управление оборудованием</h2>
				<button type="button" className={styles.createBtn} onClick={handleCreateClick}>
					+ Добавить товар
				</button>
			</div>

			{products.length === 0 ? (
				<h3 className={styles.emptyTitle}>Товаров пока нет</h3>
			) : (
				<div className={styles.tableCard}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th style={{ width: '100px' }}>Картинка</th>
								<th style={{ width: '200px' }}>Название</th>
								<th>Описание</th>
								<th style={{ textAlign: 'right', width: '120px' }}>Действия</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id} className={styles.row}>
									<td>
										<img
											src={getProductImageUrl(product.image)}
											alt={product.title}
											className={styles.imgPreview}
										/>
									</td>
									<td className={styles.productTitle}>{product.title}</td>
									<td>
										<div className={styles.descWrapper}>
											{product.description}
										</div>
									</td>
									<td style={{ textAlign: 'right' }}>
										<div className={styles.btnGroup}>
											<button
												type="button"
												className={styles.editBtn}
												onClick={() => handleEditClick(product)}
												title="Редактировать"
											>
												✏️
											</button>
											<button
												type="button"
												className={styles.deleteBtn}
												onClick={() => handleDeleteClick(product._id)}
												title="Удалить"
											>
												🗑
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			<ProductFormModal
				isOpen={formModal.isOpen}
				onClose={formModal.close}
				onSave={handleSaveProduct}
				product={currentProduct}
			/>

			<ConfirmModal
				isOpen={deleteModal.isOpen}
				onClose={deleteModal.close}
				onConfirm={confirmProductDelete}
				title="Удаление товара"
				text="Вы уверены, что хотите удалить это оборудование из каталога?"
			/>
		</div>
	);
};
