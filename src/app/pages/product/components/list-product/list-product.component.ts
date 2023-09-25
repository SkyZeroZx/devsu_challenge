import { Product } from '@/core/interface/product';
import { filterSearch } from '@/core/utils/filter-search';
import { FilterService } from '@/services/filter';
import { ProductService } from '@/services/product';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PaginationComponent, ToastService } from '@/shared/ui';

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
		'Logo',
		'ID',
		'Nombre',
		'Descripción',
		'Fecha Liberación',
		'Fecha Restructuración',
		'Acciones'
	];
	filterColumns: string[] = ['id', 'name', 'description'];
	@ViewChild('pagination')
	pagination!: PaginationComponent;

	constructor(
		private productService: ProductService,
		private filterService: FilterService,
		private fb: FormBuilder,
		private toastService: ToastService
	) {}

	ngOnInit(): void {
		this.getProducts();
		this.onChangeFilter();
	}

	getProducts() {
		this.productService.get().subscribe({
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
			this.pagination.currentPage = 1;
		});
	}

	confirmDelete(id: string) {
		this.productService.delete(id).subscribe({
			next: () => {
				this.getProducts();
				this.toastService.success({
					title: 'Exito',
					message: 'Se elimino el producto de manera exitosa'
				});
			}
		});
	}
}
