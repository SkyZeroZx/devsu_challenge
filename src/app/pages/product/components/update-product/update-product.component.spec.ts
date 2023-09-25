import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateProductComponent } from './update-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../../../../services/product';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../../core/interface/product';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ToastModule, ToastService } from '../../../../shared/ui';

describe('UpdateProductComponent', () => {
	let component: UpdateProductComponent;
	let productService: ProductService;
	let fixture: ComponentFixture<UpdateProductComponent>;
	let toastService: ToastService;

	const product: Product = {
		name: 'Product 1',
		description: 'Product 1 description',
		id: '1',
		logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png',
		date_release: '2023-09-22T23:06:57.803+00:00',
		date_revision: '2023-09-22T23:06:57.803+00:00'
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UpdateProductComponent],
			imports: [
				RouterTestingModule,
				HttpClientTestingModule,
				FormsModule,
				ReactiveFormsModule,
				ToastModule
			],
			providers: [
				ProductService,
				FormBuilder,
				ToastService,
				{
					//Mocking by default activetedRoute
					provide: ActivatedRoute,
					useValue: {
						data: of({
							product: product
						})
					}
				}
			]
		}).compileComponents();

		productService = TestBed.inject(ProductService);
		toastService = TestBed.inject(ToastService);
		fixture = TestBed.createComponent(UpdateProductComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when init component call initForm', () => {
		const spyInitForm = jest.spyOn(component, 'initUpdateForm');

		component.ngOnInit();

		expect(spyInitForm).toHaveBeenCalledWith(product);
	});

	it('should add year to form control date_revision when change date_release', async () => {
		const mockInitialDate = '2023-09-24';
		const mockDateWithOneYear = '2024-09-24';
		const eventMock = {
			target: {
				value: mockInitialDate
			} as HTMLInputElement
		} as unknown as Event;
		component.initUpdateForm(product);

		component.onChangeReleaseDate(eventMock);
		//Await to detect changes
		fixture.detectChanges();
		await fixture.whenStable();

		const date_revision = component.updateProductForm.get('date_revision')?.value;
		expect(date_revision).toEqual(mockDateWithOneYear);
	});

	it('when call update call service product to update register', () => {
		const spyProductService = jest.spyOn(productService, 'update');

		//arrange form with product to test
		component.initUpdateForm(product);
		// call method update for test
		component.update();

		//validate call of service with correct arguments
		expect(spyProductService).toBeCalledWith(product.id, product);
	});

	it('should be call toast when sucessfull update product', () => {
		//spy and mock create of product service
		const spyCreateProduct = jest.spyOn(productService, 'update').mockReturnValueOnce(of(product));
		const spyToastSucess = jest.spyOn(toastService, 'success');

		component.update();

		expect(spyCreateProduct).toHaveBeenCalled();
		expect(spyToastSucess).toHaveBeenCalled();
	});
});
