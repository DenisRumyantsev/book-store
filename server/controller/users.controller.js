// USERS CONTROLLER

const query = require('../db');

function uuidValid (uuid) { return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid); }

class UsersController {
    async getAll (req, res) {
        try {
            const result = await query('select * from users');
            if (result.rows[0]) {
                res.status(200).json({ result: result.rows });
            } else { res.status(204).json(); }
        } catch (err) { res.status(500).json(); }
    }

    async getOne (req, res) {
        try {
            if (uuidValid(req.params.id)) {
                const result = await query('select * from users where id = $1', [req.params.id]);
                if (result.rows[0]) {
                    res.status(200).json({ result: result.rows[0] });
                } else { res.status(404).json(); }
            } else { res.status(400).json(); }
        } catch (err) { res.status(500).json(); }
    }

    async delete (req, res) {
        try {
            if (uuidValid(req.params.id)) {
                const result = await query('delete from users where id = $1 returning *', [req.params.id]);
                if (result.rows[0]) {
                    res.status(200).json({ result: result.rows[0] });
                } else { res.status(404).json(); }
            } else { res.status(400).json(); }
        } catch (err) { res.status(500).json(); }
    }

    async update (req, res) {
        try {
            if (uuidValid(req.params.id) && req.body.login && req.body.password && req.body.last_name && req.body.first_name) {
                const result = await query(
                    'update users set login = $1, password = $2, last_name = $3, first_name = $4, middle_name = $5, ' +
                    'phone_number = $6, email_address = $7, street_address = $8 where id = $9 returning *',
                    [
                        req.body.login, req.body.password, req.body.last_name, req.body.first_name, req.body.middle_name,
                        req.body.phone_number, req.body.email_address, req.body.street_address, req.params.id
                    ]
                );
                if (result.rows[0]) {
                    res.status(200).json({ result: result.rows[0] });
                } else { res.status(404).json(); }
            } else { res.status(400).json(); }
        } catch (err) { res.status(500).json(); }
    }

    async create (req, res) {
        try {
            if (req.body.login && req.body.password && req.body.last_name && req.body.first_name) {
                const result = await query(
                    'insert into users (login, password, last_name, first_name, middle_name, ' +
                    'phone_number, email_address, street_address) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *',
                    [
                        req.body.login, req.body.password, req.body.last_name, req.body.first_name, req.body.middle_name,
                        req.body.phone_number, req.body.email_address, req.body.street_address
                    ]
                );
                res.status(201).json({ result: result.rows[0] });
            } else { res.status(400).json(); }
        } catch (err) { res.status(500).json(); }
    }
}

const usersController = new UsersController();

module.exports = usersController;
