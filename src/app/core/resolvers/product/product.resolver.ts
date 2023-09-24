import { map } from 'rxjs';

import { ProductService } from '@/services/product';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Product } from '../../interface/product';

export const productResolver: ResolveFn<Product | undefined> = (
	route,
	_state,
	productService = inject(ProductService)
) => {
	const productId = route.params['id'] as string;
	return productService
		.get()
		.pipe(map((products) => products.find((product) => product.id === productId)));
};
