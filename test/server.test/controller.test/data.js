
const query = {
    authorId: 'c3f89575-4030-4c0f-ab6e-6476d6f73cba',
    categoryId: '00d015bc-2c17-4766-956e-fb19bf66d705',
    search: 'express',
    sort: 'price asc',
    page: 12
};

const body = {
    isbn: '7935148627643',
    authorId: 'c3f89575-4030-4c0f-ab6e-6476d6f73cba',
    categoryId: '00d015bc-2c17-4766-956e-fb19bf66d705',
    title: 'Test Book',
    year: 1987,
    price: 65.43,
    count: 21,
    annotation: 'Lorem Ipsum'
};

const missing = (prop) => {
    const deficientBody = {};
    for (const key of Object.keys(body)) {
        if (key !== prop) {
            deficientBody[key] = body[key];
        }
    }
    return deficientBody;
};

module.exports = {
    params: {
        ok: { isbn: '7935148627643' },

        incorrect: {
            isbn: { isbn: '793514862Z643' }
        }
    },

    query: {
        ok: query,

        incorrect: {
            authorId: { ...query, authorId: 'c3f89575-4030-4c0f-ab6e-6476d6fz3cba' },
            categoryId: { ...query, categoryId: '00d015bc-2c17-4766-956e-fb19bf66dz05' },
            page: { ...query, page: 'abc' }
        }
    },

    body: {
        ok: body,

        missing: {
            isbn: missing('isbn'),
            authorId: missing('authorId'),
            categoryId: missing('categoryId'),
            title: missing('title'),
            year: missing('year'),
            price: missing('price'),
            count: missing('count'),
            annotation: missing('annotation')
        },

        incorrect: {
            isbn: { ...body, isbn: '793514862Z643' },
            authorId: { ...body, authorId: 'c3f89575-4030-4c0f-ab6e-6476d6fz3cba' },
            categoryId: { ...body, categoryId: '00d015bc-2c17-4766-956e-fb19bf66dz05' }
        }
    }
};
