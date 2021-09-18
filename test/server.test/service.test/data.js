
const books = [
    [
        '1234567890123',
        'a8cb9a9e-b211-4cdb-8ef4-1442732fffa8',
        '048b5fae-06c5-4b73-b47c-2c33af2cf227',
        'Test Book', 1987, 93.43, 21,
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    ], [
        '6728135491',
        'a8cb9a9e-b211-4cdb-8ef4-1442732fffa8',
        '048b5fae-06c5-4b73-b47c-2c33af2cf227',
        'Some Book', 1935, 79.85, 37,
        `Ut enim ad minim veniam, quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat.`
    ], [
        '4281083749731',
        'a8cb9a9e-b211-4cdb-8ef4-1442732fffa8',
        '048b5fae-06c5-4b73-b47c-2c33af2cf227',
        'Awesome Book', 1961, 85.43, 72,
        `Duis aute irure dolor in reprehenderit
in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
    ], [
        '6728013827',
        'a8cb9a9e-b211-4cdb-8ef4-1442732fffa8',
        '048b5fae-06c5-4b73-b47c-2c33af2cf227',
        'Another Book', 1954, 46.27, 64,
        `Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.`
    ], [
        '6842137595674',
        'a8cb9a9e-b211-4cdb-8ef4-1442732fffa8',
        '048b5fae-06c5-4b73-b47c-2c33af2cf227',
        'Best Book Ever', 1929, 65.51, 13,
        `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`
    ], [
        '5428731657',
        'a8cb9a9e-b211-4cdb-8ef4-1442732fffa8',
        '048b5fae-06c5-4b73-b47c-2c33af2cf227',
        'First Book', 1953, 62.87, 35,
        `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`
    ], [
        '9538240761645',
        'a8cb9a9e-b211-4cdb-8ef4-1442732fffa8',
        '048b5fae-06c5-4b73-b47c-2c33af2cf227',
        'Second Book', 1966, 39.32, 17,
        `Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`
    ], [
        '9507168248',
        'a8cb9a9e-b211-4cdb-8ef4-1442732fffa8',
        '048b5fae-06c5-4b73-b47c-2c33af2cf227',
        'Third Book', 1995, 83.45, 24,
        `Ut enim ad minima veniam, quis nostrum exercitationem ullam
corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?`
    ], [
        '8732951543604',
        'a8cb9a9e-b211-4cdb-8ef4-1442732fffa8',
        '048b5fae-06c5-4b73-b47c-2c33af2cf227',
        'Book Title', 1973, 58.36, 74,
        `Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`
    ]
];

const authors = [
    [
        'a8cb9a9e-b211-4cdb-8ef4-1442732fffa8',
        'test author first name',
        'test author last name',
        'test author biography'
    ], [
        '7b08f882-4bed-46ea-bff0-00d29105c1de',
        'some author first name',
        'some author last name',
        'some author biography'
    ], [
        '0f0c6b68-b0a4-4a6d-8270-4e3e6e346e79',
        'another author first name',
        'another author last name',
        'another author biography'
    ]
];

const categories = [
    [
        '048b5fae-06c5-4b73-b47c-2c33af2cf227',
        'test category title',
        'test category description'
    ], [
        'dc2ec7b4-fb59-4580-8b62-b01920ceb954',
        'some category title',
        'some category description'
    ], [
        'f6e729b6-04a7-4bc7-bb20-16f4293dedac',
        'another category title',
        'another category description'
    ]
];

const source = { books, authors, categories };

const entities = ['books', 'authors', 'categories'];

const props = {
    books: ['isbn', 'authorId', 'categoryId', 'title', 'year', 'price', 'count', 'annotation'],
    authors: ['id', 'firstName', 'lastName', 'biography'],
    categories: ['id', 'title', 'description']
};

function convertArrsToObjs (entity, arrs) {
    const objs = [];
    for (const arr of arrs) {
        const obj = {};
        for (const i in props[entity]) {
            obj[props[entity][i]] = arr[i];
            if (entity === 'books') {
                obj.reviewsCount = 0;
            }
        }
        objs.push(obj);
    }
    return objs;
}

const data = {};
for (const entity of entities) {
    data[entity] = {
        asArray: source[entity],
        asObject: convertArrsToObjs(entity, source[entity])
    };
}

module.exports = data;
