describe('Create Product', () => {
	const baseUrl = Cypress.env('baseUrl');
	beforeEach(() => {
		cy.intercept({
			method: 'GET',
			url: baseUrl + '/bp/products'
		}).as('listProduct');
		cy.visit('/');
	});

	it('when clicked in add button navigate to screen create product', () => {
		cy.wait('@listProduct');
		//click en button
		cy.get('[data-test="btn-add"]').click();
		//validate url
		cy.url().then((url) => {
			expect(url).contains('/product/create');
		});
		// validate title
		cy.get('[data-test="create-product-title"]')
			.invoke('text')
			.then((text) => {
				expect(text.trim().toLowerCase()).equals('formulario de registro');
			});
		//valid exist and visible buttons
		cy.get('[data-test="btn-create-product"]').should('be.visible');
		cy.get('[data-test="btn-reset"]').should('be.visible');
		cy.get('[data-test="btn-back"]').should('be.visible');
		//validate inputs
		cy.get('[formControlName="id"]').should('be.visible');
		cy.get('[formControlName="name"]').should('be.visible');
		cy.get('[formControlName="description"]').should('be.visible');
		cy.get('[formControlName="date_release"]').should('be.visible');
        //validate date_revision input is disabled
		cy.get('[formControlName="date_revision"]').should('be.visible').should('be.disabled');
	});
});
