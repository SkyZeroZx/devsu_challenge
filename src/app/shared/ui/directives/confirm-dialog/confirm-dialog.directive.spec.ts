import { ApplicationRef, Component, DebugElement, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogDirective } from './confirm-dialog.directive';
import { By } from '@angular/platform-browser';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AppComponent } from '../../../../app.component';
import { SpinnerComponent } from '../../components/spinner';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastModule } from '../../services/toast/toast.module';
import { RouterTestingModule } from '@angular/router/testing';

//Test Component for Directive
@Component({
	template: ` <button appConfirmDialog id="btn-dialog">Test</button>`
})
class TestComponent {}

describe('ConfirmDialogDirective', () => {
	let directive: ConfirmDialogDirective;
	let viewContainerRef: ViewContainerRef;
	let applicationRef: ApplicationRef;
	let confirmBtn: DebugElement;
	let cancelBtn: DebugElement;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let component: TestComponent;

	let fixture: ComponentFixture<TestComponent>;
	let fixtureAppComponent: ComponentFixture<AppComponent>;
	let appComponent: AppComponent;
	let inputEl: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TestComponent, AppComponent],
			imports: [
				ConfirmDialogDirective,
				SpinnerComponent,
				ToastModule,
				HttpClientTestingModule,
				ConfirmDialogComponent,
				ConfirmDialogDirective,
				RouterTestingModule
			],
			providers: [ViewContainerRef, ApplicationRef, ConfirmDialogDirective]
		}).compileComponents();

		fixture = TestBed.createComponent(TestComponent);
		fixtureAppComponent = TestBed.createComponent(AppComponent);

		viewContainerRef = TestBed.inject(ViewContainerRef);
		applicationRef = TestBed.inject(ApplicationRef);

		fixture.detectChanges();
		component = fixture.componentInstance;
		appComponent = fixtureAppComponent.componentInstance;
		inputEl = fixture.debugElement.query(By.css('button'));
		directive = fixture.debugElement
			.query(By.directive(ConfirmDialogDirective))
			.injector.get(ConfirmDialogDirective) as ConfirmDialogDirective;

		fixture.detectChanges();
		await fixture.whenStable();
	});
	it('should create an of test component', () => {
		expect(fixture).toBeTruthy();
	});

	it('should create a ConfirmDialogComponent when onClick() is called', async () => {
		//spyDirective
		const spyDirective = jest.spyOn(directive, 'onClick');

		//trigger event click
		inputEl.triggerEventHandler('click', new MouseEvent('click'));

		fixture.detectChanges();
		// await execution
		await fixture.whenStable();

		// Validate call function and exist dialog
		expect(directive['existDialog']).toBeTruthy();
		expect(spyDirective).toBeCalled();
	});

	it('should be not multi render when multicliked in button with directive dialog', async () => {
		//spyDirective
		const spyDirective = jest.spyOn(directive, 'onClick');
		// spy Create Component method
		const spyCreateComponent = jest.spyOn(directive, 'createComponent');

		//trigger event click
		inputEl.triggerEventHandler('click', new MouseEvent('click'));
		inputEl.triggerEventHandler('click', new MouseEvent('click'));
		inputEl.triggerEventHandler('click', new MouseEvent('click'));
		inputEl.triggerEventHandler('click', new MouseEvent('click'));

		fixture.detectChanges();
		// await execution
		await fixture.whenStable();

		// Validate call function and exist dialog
		expect(directive['existDialog']).toBeTruthy();
		expect(spyDirective).toBeCalled();
		//Validate only called once the method created component
		expect(spyCreateComponent).toBeCalledTimes(1);
	});
});
