// SERVER

require('dotenv').config();

const path = require('path');

const express = require('express');

const cors = require('cors');

const usersRouter = require('./router/users.router');
const booksRouter = require('./router/books.router');
const authorsRouter = require('./router/authors.router');

const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());

const build = express.static(path.join(__dirname, 'build'));

const URLPaths = [
    '/',
    '/cart',
    '/create_book',
    '/:isbn/update_book',
    '/:isbn'
];

for (const URLPath of URLPaths) {
    app.use(URLPath, build);
}

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/books', booksRouter);
app.use('/api/v1/authors', authorsRouter);

app.listen(port, () => { console.log(`Server is up and listening on port ${port}...`); });
