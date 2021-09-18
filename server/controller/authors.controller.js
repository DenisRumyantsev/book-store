// AUTHORS CONTROLLER

const authorsService = require('../service/authors.service');
const validator = require('../resources/validator');

function paramsValid (params) {
    const { firstName, lastName, biography } = params;

    if (!firstName) {
        return {
            code: 'firstName is missing',
            message: 'Request must contain author first name'
        };
    }

    if (!lastName) {
        return {
            code: 'lastName is missing',
            message: 'Request must contain author last name'
        };
    }

    if (!biography) {
        return {
            code: 'biography is missing',
            message: 'Request must contain author biography'
        };
    }

    return 0;
}

class AuthorsController {
    async getAll (req, res) {
        const { bunch, search } = req.query;
        try {
            const result = await authorsService.getAll(bunch, search);
            res.status(200).json({ result });
        } catch (err) {
            res.status(500).json();
        }
    }

    async getOne (req, res) {
        const id = req.params.id;
        const error = validator.uuid(id, 'author');
        if (error) {
            return res.status(400).json({ error });
        }

        try {
            const result = await authorsService.getOne(id);
            if (result) {
                return res.status(200).json({ result });
            }
            return res.status(404).json();
        } catch (err) {
            return res.status(500).json();
        }
    }

    async delete (req, res) {
        const id = req.params.id;
        const error = validator.uuid(id, 'author');
        if (error) {
            return res.status(400).json({ error });
        }

        try {
            const result = await authorsService.delete(id);
            if (result) {
                return res.status(204).json();
            }
            return res.status(404).json();
        } catch (err) {
            return res.status(500).json();
        }
    }

    async update (req, res) {
        const id = req.params.id;
        let error = validator.uuid(id, 'author');
        if (error) {
            return res.status(400).json({ error });
        }
        const params = req.body;
        error = paramsValid(params);
        if (error) {
            return res.status(400).json({ error });
        }
        const { firstName, lastName, biography } = params;

        try {
            const result = await authorsService.update(
                id, firstName, lastName, biography
            );
            if (result) {
                return res.status(200).json({ result });
            }
            return res.status(404).json();
        } catch (err) {
            return res.status(500).json();
        }
    }

    async create (req, res) {
        const params = req.body;
        const error = paramsValid(params);
        if (error) {
            return res.status(400).json({ error });
        }
        const { firstName, lastName, biography } = params;

        try {
            const result = await authorsService.create(
                firstName, lastName, biography
            );
            if (result) {
                return res.status(201).json({ result });
            }
            return res.status(404).json();
        } catch (err) {
            return res.status(500).json();
        }
    }
}

const authorsController = new AuthorsController();

module.exports = authorsController;
