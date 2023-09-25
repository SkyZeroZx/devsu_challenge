import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
	let component: PaginationComponent;
	let fixture: ComponentFixture<PaginationComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PaginationComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(PaginationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should not select a page number that is greater than the total number of pages', () => {
		component.collectionSize = 10;
		component.pageSize = 5;
		component.currentPage = 2;

		component.next();

		expect(component.currentPage).toBe(2);
	});

	it('should be call selectPageNumber when next page is enabled', () => {
		// Spy SelectPageNumber
		const spySelectPageNumber = jest.spyOn(component, 'selectPageNumber');
		// Prepare test set current page and totalPages
		component.currentPage = 1;
		component.totalPages = Array.from(Array(10).keys());
		//Calculate next Page
		const nextPage = component.currentPage + 1;

		component.next();

		//validate call selectPageNumber with correct argument
		expect(spySelectPageNumber).toHaveBeenCalledWith(nextPage);
	});

	it('should update the `pageSize` property when the user changes the page size', () => {
		component.pageSize = 5;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		component.onChangeSize({ target: { value: 10 } } as any);

		expect(component.pageSize).toBe(10);
	});

	it('should select the previous page number', () => {
		// Spy SelectPageNumber
		const spySelectPageNumber = jest.spyOn(component, 'selectPageNumber');
		component.currentPage = 2;
		const previousPage = component.currentPage - 1;
		component.previous();

		expect(component.currentPage).toBe(1);
		expect(spySelectPageNumber).toHaveBeenCalledWith(previousPage);
	});

	it('should not select a page number that is less than 1', () => {
		// Spy SelectPageNumber
		const spySelectPageNumber = jest.spyOn(component, 'selectPageNumber');
		component.currentPage = 1;

		component.previous();

		expect(component.currentPage).toBe(1);
		expect(spySelectPageNumber).not.toHaveBeenCalled();
	});

	it('should  call calculateTotalPage in ngOnChanges', async () => {
		const spyCalculateTotalPages = jest.spyOn(component, 'calculateTotalPages');

		component.ngOnChanges();

		expect(spyCalculateTotalPages).toHaveBeenCalled();
	});
});
