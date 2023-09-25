import { Component, Input, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
	templateUrl: './control-error.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./control-error.component.scss']
})
export class ControlErrorComponent {
	_text = signal<any>(null);
	_hide = signal<boolean>(true);

	@Input() set text(value: any) {
		if (value !== this._text) {
			this._text.set(value);
			this._hide.set(!value);
		}
	}
}
