import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent, ListProductComponent, UpdateProductComponent } from './components';

export const productRoute: Routes = [
	{
		path: '',
		component: ListProductComponent
	},
	{
		path: 'create',
		component: CreateProductComponent
	},
	{
		path: 'update',
		component: UpdateProductComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(productRoute)],
	exports: [RouterModule]
})
export class ProductRoutingModule {}
