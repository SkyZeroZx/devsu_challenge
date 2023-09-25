import { TypedFormControls } from '@/core/interface/forms';
import { Product } from '@/core/interface/product';
import { addYearToDate, currentDate } from '@/core/utils/date';
import { ProductService } from '@/services/product';
import { ToastService } from '@/shared/ui';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductValidador } from '../validadors';

@Component({
	selector: 'app-create-product',
	templateUrl: './create-product.component.html',
	styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
	createProductForm!: FormGroup<TypedFormControls<Product>>;

	minDate = currentDate();

	constructor(
		private fb: FormBuilder,
		private productService: ProductService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.initCreateForm();
	}

	initCreateForm() {
		this.createProductForm = this.fb.group({
			id: this.fb.control('', {
				nonNullable: true,
				validators: Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(10)
				]),
				asyncValidators: ProductValidador.productAlreadyExist(this.productService)
			}),
			name: this.fb.control('', {
				nonNullable: true,
				validators: Validators.compose([
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(100)
				])
			}),
			logo: this.fb.control('', {
				nonNullable: true,
				validators: Validators.compose([Validators.required])
			}),
			description: this.fb.control('', {
				nonNullable: true,
				validators: Validators.compose([
					Validators.required,
					Validators.minLength(10),
					Validators.maxLength(200)
				])
			}),

			date_release: this.fb.control('', {
				nonNullable: true,
				validators: Validators.compose([Validators.required])
			}),
			date_revision: this.fb.control(
				{
					value: '',
					disabled: true
				},
				{
					nonNullable: true,
					validators: Validators.compose([Validators.required])
				}
			)
		});
	}

	onChangeReleaseDate(event: Event) {
		const target = event.target as HTMLInputElement;
		const dateAdd = addYearToDate(target.value);
		this.createProductForm.get('date_revision')?.setValue(dateAdd);
	}

	create() {
		const createProduct = this.createProductForm.getRawValue();
		this.productService.create(createProduct).subscribe({
			next: () => {
				this.toastService.success({
					title: 'Exito',
					message: 'Se creo nuevo producto exitosamente'
				});
			}
		});
	}

	reset() {
		this.createProductForm.reset();
	}
}
