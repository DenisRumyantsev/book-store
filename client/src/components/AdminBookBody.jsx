import React, { useState, useEffect } from 'react';
import booksAPI from '../apis/books.api';
import AdminBookInfo from './AdminBookInfo';
import AdminBookAnnotation from './AdminBookAnnotation';
import AdminBookCover from './AdminBookCover';

const mg = { marginTop: 80, marginLeft: 50, marginRight: 50 };

let currentIsbn = '';

const emptyBook = {
    isbn: '',
    authorId: '',
    categoryId: '',
    title: '',
    year: '',
    price: '',
    count: '',
    annotation: '',
    coverExists: false
};

const AdminBookBody = (urlPath) => {
    const [book, setBook] = useState(emptyBook);
    const [cover, setCover] = useState('');
    const [coverDeleted, setCoverDeleted] = useState(false);

    useEffect(() => {
        let mounted = true;

        if (urlPath[1] === 'update_book') {
            currentIsbn = urlPath[0];
            const fetchData = async () => {
                try {
                    const book = await booksAPI.getOne(currentIsbn);
                    if (mounted) {
                        setBook(book);
                        emptyBook.coverExists = book.coverExists;
                    }
                } catch (err) { console.log(err); }
            };
            fetchData();
        }

        return () => { mounted = false; };
    }, []);

    const bookProps = {
        book, setBook,
        cover, setCover,
        coverDeleted, setCoverDeleted,
        currentIsbn, emptyBook
    };

    return (
        <div class="row" style={mg}>
            {AdminBookInfo(bookProps)}
            {AdminBookAnnotation(bookProps)}
            {AdminBookCover(bookProps)}
        </div>
    );
};

export default AdminBookBody;
