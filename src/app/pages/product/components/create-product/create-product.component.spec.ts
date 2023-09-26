import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProductComponent } from './create-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../../../../services/product';
import { Product } from '../../../../core/interface/product';
import { ToastModule, ToastService } from '../../../../shared/ui';
import { of } from 'rxjs';

describe('CreateProductComponent', () => {
	let component: CreateProductComponent;
	let fixture: ComponentFixture<CreateProductComponent>;
	let productService: ProductService;
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
			declarations: [CreateProductComponent],
			imports: [
				RouterTestingModule,
				HttpClientTestingModule,
				FormsModule,
				ReactiveFormsModule,
				ToastModule
			],
			providers: [ProductService, ToastService]
		}).compileComponents();

		productService = TestBed.inject(ProductService);
		toastService = TestBed.inject(ToastService);
		fixture = TestBed.createComponent(CreateProductComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when init component call initForm', () => {
		const spyInitForm = jest.spyOn(component, 'initCreateForm');

		component.ngOnInit();

		expect(spyInitForm).toHaveBeenCalled();
	});

	it('when call create call service product to create register', () => {
		const spyProductService = jest.spyOn(productService, 'create');

		//arrange form with product to test
		component.initCreateForm();
		// set value to form
		component.createProductForm.patchValue(product);

		// call method update for test
		component.create();

		//validate call of service with correct arguments
		expect(spyProductService).toBeCalledWith(product);
	});

	it('should add year to form control date_revision when change date_release', async () => {
		const mockInitialDate = '2023-09-24';
		const mockDateWithOneYear = '2024-09-24';
		const eventMock = {
			target: {
				value: mockInitialDate
			} as HTMLInputElement
		} as unknown as Event;

		component.initCreateForm();

		component.onChangeReleaseDate(eventMock);
		//Await to detect changes
		fixture.detectChanges();
		await fixture.whenStable();

		const date_revision = component.createProductForm.get('date_revision')?.value;
		expect(date_revision).toEqual(mockDateWithOneYear);
	});

	it('when call reset should be initCreateForm the form', () => {
		const spyResetForm = jest.spyOn(component.createProductForm, 'reset');

		component.reset();

		expect(spyResetForm).toHaveBeenCalled();
	});

	it('should be call toast when sucessfull create product', () => {
		//spy and mock create of product service
		const spyCreateProduct = jest.spyOn(productService, 'create').mockReturnValueOnce(of(product));
		const spyToastSucess = jest.spyOn(toastService, 'success');

		component.create();

		expect(spyCreateProduct).toHaveBeenCalled();
		expect(spyToastSucess).toHaveBeenCalled();
	});
});
