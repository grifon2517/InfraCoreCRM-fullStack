import { useState, useCallback } from 'react';

export const useModal = (initialState = false) => {
	const [isOpen, setIsOpen] = useState(initialState);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);
	const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

	return {
		isOpen,
		open,
		close,
		toggle,
	};
};

// Бонус для защиты: Если спросят, зачем тут useCallback, смело отвечай: «Чтобы ссылки на функции не пересоздавались при каждом рендере компонента. Это оптимизация, чтобы дочерние компоненты не делали лишних перерисовок».
