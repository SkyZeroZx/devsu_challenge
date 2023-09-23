import { Route } from '@angular/router';
import { ContentComponent } from './layout';

export const appRoutes: Route[] = [
	{ path: '', redirectTo: '/product', pathMatch: 'full' },
	{
		path: 'product',
		component: ContentComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('@/pages/product/product.module').then((m) => m.ProductModule)
			}
		]
	},
	{
		path: 'error',
		loadChildren: () => import('@/pages/error/error.module').then((m) => m.ErrorModule)
	},
	{ path: '**', redirectTo: 'error', pathMatch: 'full' }
];
