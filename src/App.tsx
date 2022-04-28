import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persister, store} from './redux/store';

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persister}>
				<div className='App'>Start</div>
			</PersistGate>
		</Provider>
	);
}

export default App;
