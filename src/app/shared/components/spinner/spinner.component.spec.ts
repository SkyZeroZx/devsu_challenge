import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { LoaderService } from '../../../core/interceptor/loader-interceptor/loader.service';

describe('SpinnerComponent', () => {
	let component: SpinnerComponent;
	let fixture: ComponentFixture<SpinnerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SpinnerComponent],
			providers: [LoaderService]
		}).compileComponents();

		fixture = TestBed.createComponent(SpinnerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
