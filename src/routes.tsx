import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';

import Mint from './templates/Mint';
import Studio from './templates/Studio';
import Canvas from './templates/Canvas';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ token, children }: { token: string | null, children: JSX.Element }) => {
	if (!token) {
		return <Navigate to="/" replace />;
	}
	return children;
};

export const DefaultRoutes = () => {
	const [token, setToken] = useState<string | null>(null)
	const storageToken = localStorage.getItem('@storage_Key');

	useEffect(() => {
		setToken(storageToken)
	}, [storageToken])

	return (
		<Routes>
			<Route index element={<Mint />} />
			<Route path='/studio/:id' element={
				<ProtectedRoute token={token}>
					<Canvas />
				</ProtectedRoute>} />
			<Route path="studio" element={<ProtectedRoute token={token}>
				<Studio />
			</ProtectedRoute>} />
			<Route path="*" element={<p>There's nothing here: 404!</p>} />
		</Routes>
	)
}