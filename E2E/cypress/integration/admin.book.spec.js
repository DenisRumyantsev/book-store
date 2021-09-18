describe('Create / update / delete book - tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Should create book', { retries: 3 }, () => {
        cy.fixture('admin.book').then(book => {
            cy.log('Go to create book page');
            cy.get('a i').contains('create').click();

            cy.log('Input book info');
            cy.get('input').eq(3).type(book.isbn);
            cy.get('input').eq(4).type(book.authorId);
            cy.get('input').eq(5).type(book.categoryId);
            cy.get('input').eq(6).type(book.title);
            cy.get('input').eq(7).type(book.year);
            cy.get('input').eq(8).type(book.price);
            cy.get('input').eq(9).type(book.count);
            cy.get('textarea').type(book.annotation);

            cy.log('Submit');
            cy.get('a').contains('submit').click();

            cy.log('Go back to home page');
            cy.get('a').contains('Book Store').click();

            cy.log('Check creating');
            cy.get('a h5').contains(book.title).should('exist');
        });
    });

    it('Should update book', { retries: 3 }, () => {
        cy.fixture('admin.book').then(book => {
            cy.log('Go to book details page');
            cy.get('a h5').first().click();

            cy.log('Go to update book page');
            cy.get('a i').contains('create').click();

            cy.log('Update').wait(1000);
            cy.get('input').eq(8).clear().type(book.update.price);
            cy.get('input').eq(9).clear().type(book.update.count);
            cy.get('textarea').clear().type(book.update.annotation);

            cy.log('Submit');
            cy.get('a').contains('submit').click();

            cy.log('Check updating');
            cy.get('p').contains('Price: $').should('contain', `Price: $${book.update.price}`);
            cy.get('p').contains('Copies in stock:').should('contain', `Copies in stock: ${book.update.count}`);
            cy.get('p').contains(book.update.annotation).should('exist');
        });
    });

    it('Should delete book', { retries: 3 }, () => {
        cy.fixture('admin.book').then(book => {
            cy.log('Go to book details page');
            cy.get('a h5').first().click();

            cy.log('Go to update book page');
            cy.get('a i').contains('create').click();

            cy.wait(1000);

            cy.log('Delete');
            cy.get('a').contains('delete').click();

            cy.log('Submit');
            cy.get('a').contains('submit').click();

            cy.log('Check deleting');
            cy.get('a h5').contains(book.title).should('not.exist');
        });
    });
});
