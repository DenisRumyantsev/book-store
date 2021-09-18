describe('Sorting & Searching & Filtering & Pagination - tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    Cypress.Commands.add('paginator', check => {
        cy.wait(1000).get('card').its('length').then(limit => {
            for (let i = 0; i < limit; i++) {
                cy.get('card').eq(i).then(card => check(card));
            }
        }).then(() => {
            cy.get('li.turn-on').then(btn => {
                if (btn.eq(btn.length - 1).text() === 'chevron_right') {
                    btn.eq(btn.length - 1).click();
                    cy.paginator(check);
                }
            });
        });
    });

    it('Should sort books by price', { retries: 3 }, () => {
        let price = 0;
        const checkPriceAsc = card => {
            cy.get(card).find('p').contains('$').then(text => {
                const nextPrice = Number(text.text().split(' ')[0].slice(1));
                expect(nextPrice).to.be.at.least(price);
                price = nextPrice;
            });
        };

        cy.get('a').contains('menu').click();
        cy.get('a').contains('price asc').click();
        cy.paginator(checkPriceAsc);
    });

    it('Should search book', { retries: 3 }, () => {
        cy.fixture('pagination').then(search => {
            const checkSearchBook = card => {
                cy.get(card).find('a h5').then(text => {
                    expect(text).to.contain(search.book);
                });
            };

            cy.get('input[placeholder="Type here to search book . . ."]').type(search.book);
            cy.get('i').contains('search').click();
            cy.paginator(checkSearchBook);
        });
    });

    it('Should filter books by category', { retries: 3 }, () => {
        let category;
        const checkCategory = card => {
            cy.get(card).find('p').contains('Category:').find('a').then(text => {
                expect(text).to.contain(category);
            });
        };

        cy.get('p').contains('Category:').find('a').then(text => {
            category = text.text();
            cy.get(text).click();
        });
        cy.paginator(checkCategory);
    });
});
