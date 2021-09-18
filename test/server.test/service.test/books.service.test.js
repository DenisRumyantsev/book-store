const sequelize = require('../../../server/sequelize/models');
const booksService = require('../../../server/service/books.service');
const data = require('./data');
jest.mock('../../../server/sequelize/establish');

function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const count = 8;
const init = async () => {
    await sequelize.models.books.destroy({ where: {} });
    await sequelize.models.authors.destroy({ where: {} });
    await sequelize.models.categories.destroy({ where: {} });
    await sequelize.models.authors.create(data.authors.asObject[0]);
    await sequelize.models.categories.create(data.categories.asObject[0]);
    for (let i = 0; i < count; i++) {
        await sequelize.models.books.create(data.books.asObject[i]);
    }
};

class BooksServiceTest {
    getAll (params, expected) {
        test(
            'Books Service Should Get All Books',
            async () => {
                await init();
                const received = await booksService.getAll(...params);
                for (const i in received.rows) {
                    received.rows[i] = received.rows[i].dataValues;
                    received.rows[i].author = received.rows[i].author.dataValues;
                    received.rows[i].category = received.rows[i].category.dataValues;
                    delete received.rows[i].createdAt;
                    delete received.rows[i].updatedAt;
                    delete received.rows[i].author.createdAt;
                    delete received.rows[i].author.updatedAt;
                }
                expect(received).toEqual(expected);
            }
        );
    }

    getOne (isbn, expected) {
        test(
            'Books Service Should Get One Book',
            async () => {
                await init();
                let received = await booksService.getOne(isbn);
                if (received) {
                    received = received.dataValues;
                    received.author = received.author.dataValues;
                    received.category = received.category.dataValues;
                    delete received.createdAt;
                    delete received.updatedAt;
                    delete received.author.createdAt;
                    delete received.author.updatedAt;
                }
                expect(received).toEqual(expected);
            }
        );
    }

    create (book, expected) {
        test(
            'Books Service Should Create Book',
            async () => {
                await init();
                const received = (await booksService.create(...book)).dataValues;
                delete received.createdAt;
                expect(received).toEqual(expected);
            }
        );
    }

    update (isbn, book, expected) {
        test(
            'Books Service Should Update Book',
            async () => {
                await init();
                const received = await booksService.update(isbn, ...book);
                expect(received).toEqual(expected);
            }
        );
    }

    delete (isbn, expected) {
        test(
            'Books Service Should Delete Book',
            async () => {
                await init();
                const received = await booksService.delete(isbn);
                expect(received).toEqual(expected);
            }
        );
    }
}

test(
    'Database synchronization',
    async () => {
        await timeout(1000);
    }
);

const booksServiceTest = new BooksServiceTest();

const getProps = {
    star: null,
    author: data.authors.asObject[0],
    category: data.categories.asObject[0]
};

booksServiceTest.getAll(
    [null, null, null, 'price asc', 2],
    {
        count,
        rows: [
            { ...data.books.asObject[4], ...getProps },
            { ...data.books.asObject[1], ...getProps },
            { ...data.books.asObject[7], ...getProps }
        ]
    }
);

booksServiceTest.getOne(
    data.books.asObject[0].isbn,
    { ...data.books.asObject[0], ...getProps }
);

booksServiceTest.getOne(
    data.books.asObject[count].isbn,
    null
);

booksServiceTest.create(
    data.books.asArray[count],
    data.books.asObject[count]
);

booksServiceTest.update(
    data.books.asObject[0].isbn,
    data.books.asArray[count], 1
);

booksServiceTest.update(
    data.books.asObject[count].isbn,
    data.books.asArray[count], 0
);

booksServiceTest.delete(
    data.books.asObject[0].isbn, 1
);

booksServiceTest.delete(
    data.books.asObject[count].isbn, 0
);
