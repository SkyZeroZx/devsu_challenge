import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-pagination',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
	/** The total number of records */
	@Input()
	collectionSize = 0;

	/** The numbers list to display in select size of page to display */
	@Input()
	listPageSize: number[] = [5, 10, 15, 20, 30, 40, 50];

	/** The number of records to display */
	@Input()
	pageSize = 5;

	/** Current page */
	@Input()
	currentPage = 1;

	/** The number of buttons to show either side of the current page */
	@Input()
	maxSize = 2;

	/** Display the First/Last buttons */
	@Input()
	firstLastButtons = false;

	/** Display the Next/Previous buttons */
	@Input()
	nextPreviousButtons = true;

	/** Display small pagination buttons */
	@Input()
	small = false;

	totalPages: any[] = [];

	ngOnInit(): void {
		this.calculateTotalPages();
	}

	ngOnChanges() {
		this.calculateTotalPages();
	}

	calculateTotalPages() {
		this.totalPages = new Array(Math.ceil(this.collectionSize / this.pageSize));
	}

	/** Set page number */
	selectPageNumber(pageNumber: number) {
		this.currentPage = pageNumber;
	}

	/** Set next page number */
	next() {
		const nextPage = this.currentPage + 1;
		nextPage <= this.totalPages.length && this.selectPageNumber(nextPage);
	}

	/** Set previous page number */
	previous() {
		const previousPage = this.currentPage - 1;
		previousPage >= 1 && this.selectPageNumber(previousPage);
	}

	onChangeSize(event: Event) {
		const value = (event.target as HTMLSelectElement).value;
		this.pageSize = Number(value);
		this.currentPage = 1;
		this.calculateTotalPages();
	}
}
