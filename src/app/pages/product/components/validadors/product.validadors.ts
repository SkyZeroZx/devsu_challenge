import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ProductService } from '@/services/product';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

export class ProductValidador {
	static productAlreadyExist(productService: ProductService): AsyncValidatorFn {
		return (control: AbstractControl): Observable<ValidationErrors | null> => {
			// Add timer for debounce
			return timer(800).pipe(
				switchMap(() =>
					productService
						.checkExistId(control.value)
						.pipe(map((result) => (result ? { alreadyExist: true } : null)))
				)
			);
		};
	}
}
