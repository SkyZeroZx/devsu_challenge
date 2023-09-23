import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoaderService } from '@/core/interceptor/loader-interceptor/loader.service';

@Component({
	selector: 'app-spinner',
	standalone: true,
	imports: [AsyncPipe, NgIf],
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
	loader = inject(LoaderService);
}
