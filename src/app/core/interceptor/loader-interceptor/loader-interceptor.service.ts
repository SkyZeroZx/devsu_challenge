import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
	providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
	constructor(private loader: LoaderService) {}
	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		console.log('req', req.url);
		this.loader.showLoader();
		return next.handle(req).pipe(
			finalize(() => {
				this.loader.hideLoader();
				console.log('req', req.url);
			})
		);
	}
}
