import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastService } from '../toast.service';
import { ToastComponent } from './toast.component';
import { ToastData } from '../interface/toast.interface';

describe('ToastService', () => {
	let component: ToastComponent;
	let toastService: ToastService;

	let fixture: ComponentFixture<ToastComponent>;

	const toastDefault: ToastData = {
		message: 'Success!',
		title: 'Title Success'
	};

	const toastTimeout: ToastData = {
		message: 'Success!',
		title: 'Title Success',
		timeout: 600
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ToastComponent],
			imports: [BrowserAnimationsModule],
			providers: [ToastService]
		}).compileComponents();

		fixture = TestBed.createComponent(ToastComponent);

		toastService = TestBed.inject(ToastService);
		// Set initial state with service
		toastService.success(toastDefault);

		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should service open with sucess should be call counterdown default timeout', async () => {
		const spyCounterDown = jest.spyOn(component, 'countDown');
		// Open the toast
		toastService.success({ ...toastDefault });

		fixture.detectChanges();
		await fixture.whenStable();

		expect(spyCounterDown).toHaveBeenCalledWith(undefined);
	});

	it('should service open with sucess should be call counterdown with timeout', async () => {
		const spyCounterDown = jest.spyOn(component, 'countDown');
		// Open the toast
		toastService.success({ ...toastTimeout });

		fixture.detectChanges();
		await fixture.whenStable();

		expect(spyCounterDown).toHaveBeenCalledWith(toastTimeout.timeout);
	});

	it('should call hide when count finish', fakeAsync(async () => {
		const spyHide = jest.spyOn(toastService, 'hide');
		// Open the toast
		toastService.success({ ...toastTimeout });

		//Detect Changes and await
		fixture.detectChanges();

		await fixture.whenStable();

		//Run time in fake async
		tick(3001);

		expect(spyHide).toHaveBeenCalledTimes(1);
	}));
});
