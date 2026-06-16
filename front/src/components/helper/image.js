import { SERVER_URL } from '../../api/api';

export const getProductImageUrl = (image) => {
	if (!image) return '/placeholder.svg';

	if (image.includes('uploads')) {
		const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL || SERVER_URL;
		const slash = image.startsWith('/') ? '' : '/';

		return `${baseUrl}${slash}${image}`;
	}

	return image;
};
