import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';

import Mint from './templates/Mint';
import Studio from './templates/Studio';
import Canvas from './templates/Canvas';
import Terms from './templates/html/Terms'
import Privacy from './templates/html/Privacy';
import Disclaimer from './templates/html/Disclaimer';
import Cookies from './templates/html/Cookies';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	if (!localStorage.getItem('@storage_Key')) {
		return <Navigate to="/" replace />;
	}
	return children;
};

export const DefaultRoutes = () => {

	return (
		<Routes>
			<Route index element={<Mint />} />
			<Route path='/studio/:id' element={
				<ProtectedRoute>
					<Canvas />
				</ProtectedRoute>} />
			<Route path="studio" element={<ProtectedRoute>
				<Studio />
			</ProtectedRoute>} />
			<Route path="terms" element={
				<Terms />
			} />
			<Route path="privacy" element={
				<Privacy />
			} />
			<Route path="disclaimer" element={
				<Disclaimer />
			} />
			<Route path="cookies" element={
				<Cookies />
			} />
			<Route path="*" element={<p>There's nothing here: 404!</p>} />
		</Routes>
	)
}