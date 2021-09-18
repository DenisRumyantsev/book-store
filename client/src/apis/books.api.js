import axios from './api.v1';

class API {
    async getAll (params, context) {
        const { limit, setQuery, setCurrentPage, setMaxPage, useFilter } = context;
        let query = '?';
        for (const key of Object.keys(params)) {
            query += `${key}=${params[key]}&`;
        }
        query = query.slice(0, -1);
        history.pushState('', '', `/${query}`);
        try {
            const res = await axios.get(`/books${query}`);
            const { count, rows } = res.data.result;
            setQuery(new URLSearchParams(query));
            setCurrentPage(1);
            setMaxPage(Math.ceil(count / limit));
            useFilter(rows);
        } catch (err) { console.log(err); }
    }

    async getOne (isbn) {
        try {
            const res = await axios.get(`/books/${isbn}`);
            return res.data.result;
        } catch (err) { console.log(err); }
    }

    async create (book) {
        try {
            await axios.post('/books', book);
        } catch (err) { console.log(err); }
    }

    async update (isbn, book) {
        try {
            await axios.put(`/books/${isbn}`, book);
        } catch (err) { console.log(err); }
    }

    async delete (isbn) {
        try {
            await axios.delete(`/books/${isbn}`);
        } catch (err) { console.log(err); }
    }
}

export default new API();
