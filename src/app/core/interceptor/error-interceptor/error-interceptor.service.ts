import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DEFAULT_ERROR } from '@/core/constant';
import { ToastService } from '@/shared/ui';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
	constructor(private readonly toastService: ToastService) {}

	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(req).pipe(
			catchError((returnedError) => {
				let errorMessage = '';

				if (returnedError instanceof HttpErrorResponse) {
					errorMessage = `Error Status ${returnedError.status}: ${returnedError.statusText} - ${returnedError.error}`;
				}

				console.error(errorMessage || returnedError);

				this.toastService.error({
					title: 'Error',
					message: `${returnedError.error.message || returnedError.error || DEFAULT_ERROR}`
				});

				if (errorMessage) {
					return throwError(() => new Error(errorMessage));
				}
				return throwError(() => new Error(DEFAULT_ERROR));
			})
		);
	}
}
