import {
	Directive,
	EventEmitter,
	HostListener,
	Input,
	Output,
	ViewContainerRef
} from '@angular/core';

@Directive({
	selector: '[appConfirmDialog]',
	standalone: true
})
export class ConfirmDialogDirective {
	@Input()
	message = '¿ Esta seguro ?';

	@Input()
	confirmButtonText = 'Confirmar';

	@Input()
	cancelButtonText = 'Cancelar';

	@Input()
	title = 'Title';

	@Output()
	confirm = new EventEmitter<void>();

	@Output()
	cancel = new EventEmitter<void>();

	private existDialog = false;

	constructor(private viewContainerRef: ViewContainerRef) {}

	@HostListener('click', ['$event'])
	async onClick(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();

		this.createComponent();
	}

	private async createComponent() {
		if (this.existDialog) {
			return;
		}

		const { ConfirmDialogComponent } = await import(
			'./components/confirm-dialog/confirm-dialog.component'
		);

		const confirmDialogComponent = this.viewContainerRef.createComponent(ConfirmDialogComponent);

		const { instance } = confirmDialogComponent;

		instance.confirmDialogOptions = {
			message: this.message,
			title: this.title,
			confirmButtonText: this.confirmButtonText,
			cancelButtonText: this.cancelButtonText
		};

		confirmDialogComponent.changeDetectorRef.detectChanges();

		instance.confirmed.subscribe({
			next: () => {
				this.confirm.emit();
			}
		});

		instance.canceled.subscribe({
			next: () => {
				this.cancel.emit();
			}
		});
	}
}
