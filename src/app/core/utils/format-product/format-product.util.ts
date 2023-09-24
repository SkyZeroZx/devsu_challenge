import { Observable, map } from 'rxjs';
import { Product } from '../../interface/product';
import { DatePipe } from '@angular/common';

export function formatProduct() {
	const datePipe = new DatePipe('en-US');
	return function (source$: Observable<Product | undefined>): Observable<Product | undefined> {
		return source$.pipe(
			map((value) => {
				return {
					...value,
					date_release: datePipe.transform(value?.date_release, 'YYYY-MM-dd', '+0000'),
					date_revision: datePipe.transform(value?.date_revision, 'YYYY-MM-dd', '+0000')
				} as Product | undefined;
			})
		);
	};
}
