import { Observable } from 'rxjs';

import { Product, UpdateProduct } from '@/core/interface/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	private readonly base = environment.API_URL;
	constructor(private readonly http: HttpClient) {}

	get(): Observable<Product[]> {
		return this.http.get<Product[]>(`${this.base}/bp/products`);
	}

	create(createProduct: Product): Observable<Product> {
		return this.http.post<Product>(`${this.base}/bp/products`, createProduct);
	}

	update(id: string, updateProduct: UpdateProduct): Observable<Product> {
		return this.http.put<Product>(`${this.base}/bp/products`, { id, ...updateProduct });
	}

	delete(id: string): Observable<string> {
		let params = new HttpParams();
		params = params.set('id', id);
		//Add reponseType text because not return a JSON return a plain text
		return this.http.delete(`${this.base}/bp/products`, { params, responseType: 'text' });
	}

	validateExistId(id: string): Observable<boolean> {
		let params = new HttpParams();
		params = params.set('id', id);
		return this.http.get<boolean>(`${this.base}/bp/products`, { params });
	}
}
