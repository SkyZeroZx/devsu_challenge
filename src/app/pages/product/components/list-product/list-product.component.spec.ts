import { of } from 'rxjs';

import { Product } from '@/core/interface/product';
import { FilterService } from '@/services/filter';
import { ProductService } from '@/services/product';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListProductComponent } from './list-product.component';
import { PaginationComponent } from '../../../../shared/ui';

describe('ListProductComponent', () => {
	let component: ListProductComponent;
	let filterService: FilterService;
	let productService: ProductService;
	let fixture: ComponentFixture<ListProductComponent>;
	const listProductMock: Product[] = [
		{
			name: 'Product 1',
			description: 'Product 1 description',
			id: '1',
			logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png',
			date_release: '2023-09-22T23:06:57.803+00:00',
			date_revision: '2023-09-22T23:06:57.803+00:00'
		}
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ListProductComponent],
			imports: [HttpClientTestingModule, PaginationComponent, FormsModule, ReactiveFormsModule],
			providers: [ProductService, FilterService]
		}).compileComponents();

		fixture = TestBed.createComponent(ListProductComponent);
		filterService = TestBed.inject(FilterService);
		productService = TestBed.inject(ProductService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('When init componet validate call product and suscription of filter', () => {
		//Spy filter and get products
		const spyGetProducts = jest.spyOn(component, 'getProducts');
		const spyOnChangeFilter = jest.spyOn(component, 'onChangeFilter');

		component.ngOnInit();

		expect(spyOnChangeFilter).toHaveBeenCalled();
		expect(spyGetProducts).toHaveBeenCalled();
	});

	it('When change value of filter call filter service and filter list products', fakeAsync(async () => {
		const newInputValue = 'MOCK_VALUE';
		const spyFilterData = jest.spyOn(filterService, 'filterData').mockReturnValue(listProductMock);
		//Init component with suscription of value change of form control
		component.ngOnInit();

		// set new value for throw valueChanges
		component.filter.setValue(newInputValue);

		//Detect Changes
		fixture.detectChanges();
		await fixture.whenStable();
		//use fakeasync with tick because exist debounceTime in filter
		tick(1000);

		//Validate spy and vlaue of listProduct
		expect(spyFilterData).toHaveBeenCalledWith(newInputValue, component.filterColumns);

		expect(component.listProduct()).toEqual(listProductMock);
	}));

	it('Validate confirmDelete call delete service', () => {
		const spyDeleteProduct = jest.spyOn(productService, 'delete').mockReturnValueOnce(of('OK'));
		const spyGetProducts = jest.spyOn(component, 'getProducts');
		const id = '1';

		component.confirmDelete(id);

		expect(spyDeleteProduct).toHaveBeenCalledWith(id);
		expect(spyGetProducts).toHaveBeenCalled();
	});

	it('When getProduct valite set Intial Data Filter and set Signal Products', () => {
		const spyProductService = jest
			.spyOn(productService, 'get')
			.mockReturnValueOnce(of(listProductMock));
		const spyFilterService = jest.spyOn(filterService, 'setInitialData');

		component.getProducts();

		expect(spyFilterService).toHaveBeenCalledWith(listProductMock);
		expect(component.listProduct()).toEqual(listProductMock);
		expect(spyProductService).toHaveBeenCalled();
	});
});
