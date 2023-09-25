describe('Funcionality List Products', () => {
	const baseUrl = Cypress.env('baseUrl');
	const displayedColumns: string[] = [
		'Logo',
		'ID',
		'Nombre del producto',
		'Descripción',
		'Fecha Liberación',
		'Fecha Restructuración',
		''
	];

	beforeEach(() => {
		// intercept list product request
		cy.intercept({
			method: 'GET',
			url: baseUrl + '/bp/products'
		}).as('listProduct');
		//Visit base page is product by default
		cy.visit('/');
	});

	it('should display screen correct', () => {
		// wait finish request list product
		cy.wait('@listProduct');

		// Validate name of columns
		cy.get('[data-test="table-column"]').then((element) => {
			displayedColumns.map((columm, index) => {
				expect(element[index].innerText.trim()).equals(columm);
			});
		});
		//validate input search exist and visible
		cy.get('[data-test="input-search-product"]').should('be.visible');
		//validate btn add exist and visible
		cy.get('[data-test="btn-add"]').should('be.visible');
	});

	it('When hover or click menu dropdown display options', () => {
		cy.wait('@listProduct');
		//click the fist button
		cy.get('[data-test="btn-dropdown"]').first().realHover();
		// then dropdown-content first is visible
		cy.get('[data-test="dropdown-content"').first().should('be.visible');
		//Validate icon edit and delete
		cy.get('[data-test="btn-edit"').first().should('be.visible');
		cy.get('[data-test="btn-delete"').first().should('be.visible');
	});

	it('when clicked in delete button show dialog', () => {
		cy.wait('@listProduct');
		//click the fist button
		cy.get('[data-test="btn-dropdown"]').first().realHover();
		//clicked delete
		cy.get('[data-test="btn-delete"').first().click();

		// validate title dialog
		cy.get('[data-test="dialog-title"]')
			.invoke('text')
			.then((text) => {
				expect(text.trim().toLowerCase()).equals('eliminar registro');
			});
		//validate buttons dialog
		cy.get('[data-test="confirm-button"]').should('be.visible');
		cy.get('[data-test="cancel-button"]').should('be.visible');
	});
});
