import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persister, store } from './redux/store';
import { DefaultRoutes } from './routes';

import './styles/styles.scss';


function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persister}>
				<DefaultRoutes />
			</PersistGate>
		</Provider>
	);
}

export default App;
