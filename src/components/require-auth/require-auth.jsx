import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page'; // Укажи правильный путь к 404 странице

export const RequireAuth = ({ children, role }) => {
	// Подключаемся к твоему стейту auth из Redux
	const { isAuth, user } = useSelector((state) => state.auth);

	// Сценарий 1: Роут требует прав админа (role="admin")
	if (role === 'admin') {
		// Если зашел ГОСТЬ или зашел обычный ЮЗЕР — притворяемся, что страницы не существует.
		// Обычный человек вместо экрана "Доступ запрещен" увидит стандартную 404 страницу!
		if (!isAuth || user?.role !== 'admin') {
			return <NotFoundPage />;
		}
	}

	// Сценарий 2: Роут общего назначения (просто приватная страница, например, /claims или /products)
	if (!isAuth) {
		// Если неавторизованный гость зашел на страницу пользователя — отправляем его на логин
		return <Navigate to="/login" replace />;
	}

	// Если все проверки пройдены (или юзер авторизован, или это легитимный админ) — рендерим страницу
	return children;
};
