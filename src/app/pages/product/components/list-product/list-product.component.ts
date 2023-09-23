import { Product } from '@/core/interface/product';
import { filterSearch } from '@/core/utils/filter-search';
import { FilterService } from '@/services/filter';
import { ProductService } from '@/services/product';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-list-product',
	templateUrl: './list-product.component.html',
	styleUrls: ['./list-product.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListProductComponent implements OnInit {
	filter = this.fb.control<string>('', { nonNullable: true });
	listProduct = signal<Product[]>([]);
	displayedColumns: string[] = [
		'ID',
		'Nombre',
		'Descripción',
		'Logo',
		'Fecha Liberación',
		'Fecha Restructuración',
		'Acciones'
	];
	filterColumns: string[] = ['id', 'name', 'description'];

	constructor(
		private productService: ProductService,
		private filterService: FilterService,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.getProducts();
		this.onChangeFilter();
	}

	getProducts() {
		this.productService.getProducts().subscribe({
			next: (res) => {
				this.filterService.setInitialData(res);
				this.listProduct.set(res);
			}
		});
	}

	onChangeFilter() {
		this.filter.valueChanges.pipe(filterSearch()).subscribe((filter) => {
			const dataFilter = this.filterService.filterData<Product>(filter, this.filterColumns);
			this.listProduct.set(dataFilter);
		});
	}

	confirmDelete(id: string) {
		this.productService.deleteProduct(id).subscribe({
			next: () => {
				this.getProducts();
			}
		});
	}
}
