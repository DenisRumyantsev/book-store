// BOOKS SERVICE

const DEFAULT_NUMBER_OF_PRODUCTS_PER_PAGE = 3;

const { Op } = require('sequelize');
const sequelize = require('../sequelize/models');
const include = [sequelize.models.authors, sequelize.models.categories];
const sortable = ['star', 'year', 'price'];
const orderable = ['asc', 'desc'];

class BooksService {
    async getAll (authorId, categoryId, search, sort, page) {
        const limit = DEFAULT_NUMBER_OF_PRODUCTS_PER_PAGE;
        const query = { include, order: [['createdAt', 'desc']], limit };
        if (page) { query.offset = query.limit * (page - 1); }
        if (sort) {
            const order = [sort.split(' ')];
            if (order[0].length === 2 && sortable.includes(order[0][0]) &&
                orderable.includes(order[0][1])) { query.order = order; }
        }
        query.order[0][1] += ' nulls last';
        query.where = {
            ...(authorId) && { authorId },
            ...(categoryId) && { categoryId },
            ...(search) && { title: { [Op.substring]: search } }
        };
        return await sequelize.models.books.findAndCountAll(query);
    }

    async getOne (isbn) {
        return await sequelize.models.books.findOne({ where: { isbn }, include });
    }

    async delete (isbn) {
        return await sequelize.models.books.destroy({ where: { isbn } });
    }

    async update (isbn, trueIsbn, authorId, categoryId, title, year, price, count, annotation) {
        return (await sequelize.models.books.update({
            isbn: trueIsbn, authorId, categoryId, title, year, price, count, annotation, updatedAt: Date()
        }, { where: { isbn } }))[0];
    }

    async create (isbn, authorId, categoryId, title, year, price, count, annotation) {
        return await sequelize.models.books.create({
            isbn, authorId, categoryId, title, year, price, count, annotation
        });
    }
}

const booksService = new BooksService();

module.exports = booksService;
