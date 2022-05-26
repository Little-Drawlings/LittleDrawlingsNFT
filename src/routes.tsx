import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';

import Mint from './templates/Mint';
import Studio from './templates/Studio';
import Canvas from './templates/Canvas';

const ProtectedRoute = ({ token, children }: { token: string | null, children: JSX.Element }) => {
	console.log(token, 'ku token');

	if (!token) {
		return <Navigate to="/" replace />;
	}
	return children;
};

export const DefaultRoutes = () => {
	const token = localStorage.getItem('@storage_Key');

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