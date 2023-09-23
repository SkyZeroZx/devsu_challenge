import { NgModule } from '@angular/core';
import { ListProductComponent, CreateProductComponent, UpdateProductComponent } from './components';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product.routing';
import { ConfirmDialogDirective } from '../../shared/directives/confirm-dialog/confirm-dialog.directive';

@NgModule({
	declarations: [ListProductComponent, CreateProductComponent, UpdateProductComponent],
	imports: [CommonModule, ProductRoutingModule, ConfirmDialogDirective]
})
export class ProductModule {}
