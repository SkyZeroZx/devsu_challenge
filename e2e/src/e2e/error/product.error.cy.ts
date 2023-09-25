describe('Error List Products', () => {
	const baseUrl = Cypress.env('baseUrl');
	beforeEach(() => {
		// intercept list product request
		cy.intercept({
			method: 'GET',
			url: baseUrl + '/bp/products'
		}).as('listProduct');
	});

	it('should show error when list product throw error request of api', () => {
		cy.intercept(
			{
				method: 'GET',
				url: baseUrl + '/bp/products'
			},
			{
				forceNetworkError: true
			}
		).as('errorListProduct');
		cy.visit('/');
		cy.wait('@errorListProduct');
		cy.get('[data-test="toast-wrapper"]').should('be.visible');
		cy.get('[data-test="toast-title"]')
			.should('be.visible')
			.invoke('text')
			.then((text) => {
				expect(text.trim().toLowerCase()).equals('error');
			});
	});

	it('when try delete product but throw error by network error show toast error', () => {
		cy.visit('/');
		cy.intercept(
			{
				method: 'DELETE',
				url: baseUrl + '/bp/products?id=*'
			},
			{
				forceNetworkError: true
			}
		).as('productDeleteError');
		cy.wait('@listProduct');
		cy.get('[data-test="btn-dropdown"]').first().realHover();

		cy.get('[data-test="btn-delete"]').first().click();
		cy.get('[data-test="confirm-button"]').click();
		cy.wait('@productDeleteError');
		cy.get('[data-test="toast-wrapper"]').should('be.visible');
		cy.get('[data-test="toast-title"]')
			.should('be.visible')
			.invoke('text')
			.then((text) => {
				expect(text.trim().toLowerCase()).equals('error');
			});
	});
});
