import {
	ComponentRef,
	Directive,
	Inject,
	Input,
	OnInit,
	Optional,
	ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { ControlErrorComponent } from '../components/control-error.component';
import { FORM_ERRORS } from '../form-error';
import { ControlErrorContainerDirective } from './control-error-container.directive';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[formControl], [formControlName]',
	standalone: true
})
export class ControlErrorsDirective implements OnInit {
	ref!: ComponentRef<ControlErrorComponent>;
	container: ViewContainerRef;

	//Posibility of custom error in text message
	@Input() customErrors: any = {};

	// eslint-disable-next-line max-params
	constructor(
		_vcr: ViewContainerRef,
		private viewContainerRef: ViewContainerRef,
		@Optional() controlErrorContainer: ControlErrorContainerDirective,
		@Inject(FORM_ERRORS) private errors: any,
		private ngControl: NgControl
	) {
		this.container = controlErrorContainer ? controlErrorContainer.vcr : _vcr;
	}

	ngOnInit() {
		this.control?.valueChanges.subscribe(() => {
			const controlErrors = this.control?.errors;
			if (controlErrors) {
				const firstKey = Object.keys(controlErrors)[0];
				const getError = this.errors[firstKey];
				const text = this.customErrors[firstKey] || getError(controlErrors[firstKey]);
				this.setError(text);
			} else if (this.ref) {
				this.setError(null);
			}
		});
	}

	get control() {
		return this.ngControl.control;
	}

	setError(text: string | null) {
		if (!this.ref) {
			this.ref = this.viewContainerRef.createComponent(ControlErrorComponent);
		}

		this.ref.instance.text = text;
	}
}
