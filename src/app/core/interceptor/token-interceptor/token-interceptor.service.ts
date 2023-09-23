import { Observable } from 'rxjs';

import { AuthService } from '@/services/auth';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
	private readonly authService = inject(AuthService);

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const token = this.authService.token;
		if (token) {
			request = request.clone({
				setHeaders: {
					authorId: token.toString()
				}
			});
		}

		return next.handle(request);
	}
}
