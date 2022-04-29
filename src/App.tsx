import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Header from './components/Header';
import { persister, store } from './redux/store';

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persister}>
				<Header />
			</PersistGate>
		</Provider>
	);
}

export default App;
