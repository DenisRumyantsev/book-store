// AUTHORS SERVICE

const DEFAULT_NUMBER_OF_AUTHORS_PER_BUNCH = 3;

const { uuid } = require('uuidv4');
const { Op, fn } = require('sequelize');
const sequelize = require('../sequelize/models');

class AuthorsService {
    async getAll (bunch, search) {
        const limit = DEFAULT_NUMBER_OF_AUTHORS_PER_BUNCH;
        const query = { limit };
        if (bunch) {
            query.offset = query.limit * (bunch - 1);
        }
        if (search) {
            const substr = { [Op.substring]: search };
            query.where = {
                [Op.or]: [
                    { firstName: substr },
                    { lastName: substr }
                ]
            };
        }
        return await sequelize.models.authors.findAndCountAll(query);
    }

    async getOne (id) {
        return await sequelize.models.authors.findOne({ where: { id } });
    }

    async delete (id) {
        return await sequelize.models.authors.destroy({ where: { id } });
    }

    async update (id, firstName, lastName, biography) {
        return (await sequelize.models.authors.update({
            firstName, lastName, biography, updatedAt: fn('now')
        }, { where: { id } }))[0];
    }

    async create (firstName, lastName, biography) {
        return await sequelize.models.authors.create({
            id: uuid(), firstName, lastName, biography
        });
    }
}

const authorsService = new AuthorsService();

module.exports = authorsService;
