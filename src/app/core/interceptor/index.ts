import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './loader-interceptor/loader-interceptor.service';
import { ErrorInterceptorService } from './error-interceptor/error-interceptor.service';

export const interceptorsProviders = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: ErrorInterceptorService,
		multi: true
	},
	{
		provide: HTTP_INTERCEPTORS,
		useClass: LoaderInterceptorService,
		multi: true
	}
];
