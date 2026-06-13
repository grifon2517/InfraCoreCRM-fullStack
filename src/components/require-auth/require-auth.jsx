import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Loader } from '../ui/loader/loader';
import { Navigate } from 'react-router-dom';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';

export const RequireAuth = ({ children, role }) => {
	const { isAuth, user, loading } = useSelector((state) => state.auth);

	if (loading) {
		return <Loader />;
	}

	if (role === 'admin') {
		if (!isAuth || user?.role !== 'admin') {
			return <NotFoundPage />;
		}
	}

	if (!isAuth) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

RequireAuth.propTypes = {
	children: PropTypes.node.isRequired,
	role: PropTypes.string,
};
