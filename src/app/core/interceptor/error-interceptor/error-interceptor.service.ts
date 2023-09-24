import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DEFAULT_ERROR } from '@/core/constant';

@Injectable({
	providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(req).pipe(
			catchError((returnedError) => {
				let errorMessage = '';

				if (returnedError instanceof HttpErrorResponse) {
					errorMessage = `Error Status ${returnedError.status}: ${returnedError.statusText} - ${returnedError.error}`;
				}

				console.error(errorMessage ? errorMessage : returnedError);

				alert(`${returnedError.error.message || returnedError.error || DEFAULT_ERROR}`);

				if (errorMessage) {
					return throwError(() => new Error(errorMessage));
				}
				return throwError(() => new Error(DEFAULT_ERROR));
			})
		);
	}
}