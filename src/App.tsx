import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persister, store } from './redux/store';

import web3 from './web3/web3';

import { useRoutes } from "react-router-dom";
import { routes } from './routes';
import './styles/styles.scss';


function App() {
	let children = useRoutes(routes);
	web3()
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persister}>
				{children}
			</PersistGate>
		</Provider>
	);
}

export default App;
