import {
	Directive,
	EventEmitter,
	HostListener,
	Input,
	Output,
	ViewContainerRef,
	inject
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

	private readonly viewContainerRef = inject(ViewContainerRef);

	@HostListener('click', ['$event'])
	async onClick(event: MouseEvent) {
		event?.preventDefault();

		event?.stopPropagation();

		if (this.existDialog) {
			return;
		}

		this.createComponent();
	}

	async createComponent() {
		this.existDialog = true;

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

		instance.confirmed.subscribe(() => {
			this.existDialog = false;
			console.log('CONFIRMED');
			this.confirm.emit();
		});

		instance.canceled.subscribe(() => {
			this.existDialog = false;
			this.cancel.emit();
		});
	}
}
