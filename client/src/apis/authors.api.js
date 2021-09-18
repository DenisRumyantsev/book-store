import axios from './api.v1';

class API {
    async getAll (params) {
        let query = '?';
        for (const key of Object.keys(params)) {
            query += `${key}=${params[key]}&`;
        }
        query = query.slice(0, -1);
        try {
            const res = await axios.get(`/authors${query}`);
            return res.data.result;
        } catch (err) { console.log(err); }
    }

    async getOne (id) {
        try {
            const res = await axios.get(`/authors/${id}`);
            return res.data.result;
        } catch (err) { console.log(err); }
    }

    async create (author) {
        try {
            await axios.post('/authors', author);
        } catch (err) { console.log(err); }
    }

    async update (id, author) {
        try {
            await axios.put(`/authors/${id}`, author);
        } catch (err) { console.log(err); }
    }

    async delete (id) {
        try {
            await axios.delete(`/authors/${id}`);
        } catch (err) { console.log(err); }
    }
}

export default new API();
