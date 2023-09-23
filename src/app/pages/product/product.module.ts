import { NgModule } from '@angular/core';
import { ListProductComponent, CreateProductComponent, UpdateProductComponent } from './components';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product.routing';
import { ConfirmDialogDirective } from '../../shared/directives/confirm-dialog/confirm-dialog.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

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
