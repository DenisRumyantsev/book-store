import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../context/Context';
import booksAPI from '../apis/books.api';

const adminBookBtnStl = { position: 'fixed', right: 30, top: 13, zIndex: 100 };

const BookDetails = () => {
    const { isbn } = useParams();
    const { book, setBook } = useContext(Context);

    const fetchData = async () => {
        const book = await booksAPI.getOne(isbn);
        setBook(book);
    };

    useEffect(() => { fetchData(); }, []);

    const updateBookButton = <a href={`/${isbn}/update_book`} style={adminBookBtnStl} class="btn-floating deep-orange accent-3"><i class="material-icons">create</i></a>;

    return (
        <div class="card z-depth-5" style={{ marginTop: 100, marginBottom: 50, marginLeft: 300, marginRight: 300 }}>
            {updateBookButton}
            <div class="card-content" style={{ padding: 100, whiteSpace: 'pre-wrap' }}>
                <div class="row" style={{ marginBottom: 50 }}>
                    <div class="col s12 m4">
                        <center>
                            <img class="z-depth-5" src={`/static/${book.isbn}.jpg`} onError={(event) => event.target.setAttribute('src', '/static/default.jpg')} alt="book cover"/>
                        </center>
                    </div>
                    <div class="col">
                        <h3>{book.title}</h3>
                        <p>isbn: {book.isbn}</p>
                        <br/>
                        <p>Year: {book.year}</p>
                        <p>Author: {book.author?.firstName} {book.author?.lastName}</p>
                        <p>Category: {book.category?.title}</p>
                        <p>Price: ${book.price}</p>
                        <p>Copies in stock: {book.count}</p>
                        {book.star && <p>Rating: {book.star}</p>}
                        <p>Reviews count: {book.reviewsCount}</p>
                    </div>
                </div>
                <p style={{ textAlign: 'justify' }}>{book.annotation}</p>
            </div>
        </div>
    );
};

export default BookDetails;
