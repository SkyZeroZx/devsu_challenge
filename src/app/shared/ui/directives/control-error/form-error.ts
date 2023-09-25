import { InjectionToken } from '@angular/core';
import { ControlErrors } from './interface/control-error.interface';

export const defaultErrors: ControlErrors<unknown> = {
	required: () => `Este campo es requerido`,
	minlength: ({ requiredLength }: any) => `Se requiere minimo ${requiredLength} caracteres`,
	maxlength: ({ requiredLength }: any) => `El maximo de caracteres permitos es ${requiredLength}`
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
	providedIn: 'root',
	factory: () => defaultErrors
});
