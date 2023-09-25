import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastData } from './interface/toast.interface';
import { ToastTypes } from './constant/toast.enum';

describe('ToastService', () => {
	let service: ToastService;

	const toastDataSucess: ToastData = {
		message: 'Success!',
		title: 'Title Success'
	};
	const toastDataWarn: ToastData = {
		message: 'Warn!',
		title: 'Title Warn'
	};

	const toastDataError: ToastData = {
		message: 'Error!',
		title: 'Title Error'
	};

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ToastService);
	});

	it('should open a success toast', () => {
		const spyToastOpen = jest.spyOn(service.open, 'next');

		service.success(toastDataSucess);

		expect(service.data).toEqual({
			...toastDataSucess,
			show: true,
			type: ToastTypes.success
		});

		expect(spyToastOpen).toHaveBeenCalledWith(service.data);
	});

	it('should open a warn toast', () => {
		const spyToastOpen = jest.spyOn(service.open, 'next');

		service.warn(toastDataWarn);

		expect(service.data).toEqual({
			...toastDataWarn,
			show: true,
			type: ToastTypes.warn
		});

		expect(spyToastOpen).toHaveBeenCalledWith(service.data);
	});

	it('should open a error toast', () => {
		const spyToastOpen = jest.spyOn(service.open, 'next');

		service.error(toastDataError);

		expect(service.data).toEqual({
			...toastDataError,
			show: true,
			type: ToastTypes.error
		});

		expect(spyToastOpen).toHaveBeenCalledWith(service.data);
	});

	it('should hide the toast', () => {
		const spyToastOpen = jest.spyOn(service.open, 'next');
		service.data = {
			...toastDataSucess
		};
		service.hide();

		expect(spyToastOpen).toBeCalledWith({ show: false, ...toastDataSucess });
	});
});
