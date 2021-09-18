// Books Service - M O C K

class BooksService {
    getAll () {
        return Promise.resolve('mock');
    }

    getOne (isbn) {
        if (isbn === '7935148627643') {
            return Promise.resolve('mock');
        }
        return Promise.resolve(null);
    }

    create () {
        return Promise.resolve('mock');
    }

    update (isbn) {
        return Promise.resolve(Number(isbn === '7935148627643'));
    }

    delete (isbn) {
        return Promise.resolve(Number(isbn === '7935148627643'));
    }
}

const booksService = new BooksService();

module.exports = booksService;
