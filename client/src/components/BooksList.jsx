import React, { useEffect, useContext } from 'react';
import { Context } from '../context/Context';
import booksAPI from '../apis/books.api';
import Book from './Book';
import Pagination from './Pagination';

const adminBookBtnStl = { position: 'fixed', right: 30, top: 13, zIndex: 100 };

const BooksList = (query) => {
    const context = useContext(Context);
    const { books, setCurrentPage } = context;

    const fetchData = async () => {
        await booksAPI.getAll(Object.fromEntries(query), context);
        setCurrentPage(Math.round(query.get('page')) || 1);
    };

    useEffect(() => { fetchData(); }, []);

    const createBookButton = <a href="/create_book" style={adminBookBtnStl} class="btn-floating deep-orange accent-3"><i class="material-icons">create</i></a>;

    return (
        <>
            {createBookButton}
            <div class="row" style={{ marginTop: 80, marginLeft: 150, marginRight: 150 }}>
                {books && books.map(book => <Book key={book.isbn} book={book}/>)}
            </div>
            <Pagination/>
        </>
    );
};

export default BooksList;
