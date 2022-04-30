import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persister, store } from './redux/store';

import { useRoutes } from "react-router-dom";
import { routes } from './routes';
import './styles/styles.scss';

function App() {
	let children = useRoutes(routes);
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persister}>
				{children}
			</PersistGate>
		</Provider>
	);
}

export default App;
