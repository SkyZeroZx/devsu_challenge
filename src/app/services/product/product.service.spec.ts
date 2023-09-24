import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { Product, UpdateProduct } from '../../core/interface/product';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ProductService', () => {
	const RESPONSE_OK = 'OK';
	const product: Product = {
		name: 'Product 1',
		description: 'Product 1 description',
		id: '1',
		logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png',
		date_release: '2023-09-22T23:06:57.803+00:00',
		date_revision: '2023-09-22T23:06:57.803+00:00'
	};

	let service: ProductService;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
		service = TestBed.inject(ProductService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should create a product', () => {
		const expectedProduct: Product = { ...product };

		//Mocking http return post
		jest.spyOn(service['http'], 'post').mockReturnValueOnce(of(expectedProduct));

		service.create(product).subscribe((res) => {
			expect(res).toEqual(expectedProduct);
		});
	});

	it('should get list products', () => {
		const lisProducts: Product[] = [product, product, product];
		jest.spyOn(service['http'], 'get').mockReturnValueOnce(of(lisProducts));

		service.get().subscribe((res) => {
			expect(res).toEqual(lisProducts);
		});
	});

	it('should update  products', () => {
		const updateProductPartial: UpdateProduct = {
			name: 'ModidyName'
		};

		const id = product.id;

		const expectedProduct: Product = { ...product, ...updateProductPartial };

		jest.spyOn(service['http'], 'put').mockReturnValueOnce(of(expectedProduct));

		service.update(id, updateProductPartial).subscribe((res) => {
			expect(res).toEqual(expectedProduct);
		});
	});

	it('should delete product', () => {
		const id = product.id;
		jest.spyOn(service['http'], 'delete').mockReturnValueOnce(of(RESPONSE_OK));

		service.delete(id).subscribe((res) => {
			expect(res).toEqual(RESPONSE_OK);
		});
	});

	it('should validate exist product', () => {
		const id = product.id;
		jest.spyOn(service['http'], 'get').mockReturnValueOnce(of(true));

		service.checkExistId(id).subscribe((res) => {
			expect(res).toEqual(true);
		});
	});
});
