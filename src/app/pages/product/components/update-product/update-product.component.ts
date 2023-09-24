import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@/core/interface/product';

@Component({
	selector: 'app-update-product',
	templateUrl: './update-product.component.html',
	styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
	constructor(private activatedRoute: ActivatedRoute) {}
	ngOnInit(): void {
		this.activatedRoute.data.subscribe({
			next: (res) => {
				const data = res['product'] as Product;
				console.log('data', data);
			}
		});
	}
}
