describe('Cart - tests', () => {
    it('Should add books to cart', { retries: 3 }, () => {
        cy.visit('/');

        cy.get('card').its('length').then(limit => {
            const isbns = [];

            Cypress.Commands.add('addBooksToCart', () => {
                for (let i = 0; i < limit; i++) {
                    cy.get('card').eq(i).find('a i').contains('add_shopping_cart').click();

                    cy.get('card').eq(i).find('p').contains('isbn').then(isbn => {
                        isbns.push(
                            ...isbn.text().split(' ').slice(-1)
                        );
                    });
                }
            });

            cy.addBooksToCart().then(() => {
                cy.get('a i').contains('cart').click();

                for (let i = 0; i < limit; i++) {
                    cy.get('td').contains(isbns[i]).should('exist');
                }
            });
        });
    });
});
