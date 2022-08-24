import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ParallaxProvider } from 'react-scroll-parallax';

import { persister, store } from './redux/store';
import BlockerLoader from './components/BlockerLoader';
import { DefaultRoutes } from './routes';

import './styles/styles.scss';


function App() {

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persister}>
				<BlockerLoader />
				<ParallaxProvider>
					<DefaultRoutes />
				</ParallaxProvider>
			</PersistGate>
		</Provider>
	);
}

export default App;
