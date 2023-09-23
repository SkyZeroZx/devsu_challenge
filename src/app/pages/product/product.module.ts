import { NgModule } from '@angular/core';
import { ListProductComponent, CreateProductComponent, UpdateProductComponent } from './components';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product.routing';

@NgModule({
	declarations: [ListProductComponent, CreateProductComponent, UpdateProductComponent],
	imports: [CommonModule, ProductRoutingModule]
})
export class ProductModule {}
