import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AuthService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should be return token', () => {
		const tokenFromService = service.getToken();

		expect(tokenFromService).toEqual(environment.authorId);
		expect(tokenFromService).toBeDefined();
	});
});
