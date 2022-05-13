import { RouteObject } from 'react-router';

import Mint from './templates/Mint';
import Studio from './templates/Studio';
import Canvas from './templates/Canvas';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <Mint />,
	},
	{
		path: '/studio/:id',
		element: <Canvas />,
		
	},
	{
		path: '/studio',
		element: <Studio />,
		
	}
];
