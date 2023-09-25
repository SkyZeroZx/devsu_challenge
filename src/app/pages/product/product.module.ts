import { NgModule } from '@angular/core';
import { ListProductComponent, CreateProductComponent, UpdateProductComponent } from './components';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogDirective, PaginationComponent } from '@/shared/ui';

@NgModule({
	declarations: [ListProductComponent, CreateProductComponent, UpdateProductComponent],
	imports: [
		CommonModule,
		ProductRoutingModule,
		ConfirmDialogDirective,
		FormsModule,
		ReactiveFormsModule,
		PaginationComponent
	]
})
export class ProductModule {}
