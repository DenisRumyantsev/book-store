import React, { useState, useContext } from 'react';
import { Context } from '../context/Context';
import booksAPI from '../apis/books.api';
import Stars from './Stars';

const Book = (b) => {
    const context = useContext(Context);
    const { book } = b;
    function checkInCart () {
        const cartBooks = JSON.parse(localStorage.getItem('cart'));
        return cartBooks?.filter(cb => cb.isbn === book.isbn).length > 0;
    }
    const [inCart, setInCart] = useState(checkInCart());
    function makeFilter (params) {
        return async (e) => {
            e.preventDefault();
            await booksAPI.getAll(params, context);
        };
    }
    const handleAuthorFilter = makeFilter({ authorId: book.authorId });
    const handleCategoryFilter = makeFilter({ categoryId: book.categoryId });
    const handleAddToCart = (e) => {
        e.preventDefault();
        setInCart(true);
        const cartBooks = JSON.parse(localStorage.getItem('cart')) || [];
        book.countInOrder = 1;
        cartBooks.push(book);
        localStorage.setItem('cart', JSON.stringify(cartBooks));
    };
    const handleRemoveFromCart = (e) => {
        e.preventDefault();
        setInCart(false);
        let cartBooks = JSON.parse(localStorage.getItem('cart'));
        cartBooks = cartBooks.filter(cb => cb.isbn !== book.isbn);
        localStorage.setItem('cart', JSON.stringify(cartBooks));
    };
    const addToCartButton = <a onClick={handleAddToCart} class="waves-effect waves-light btn-floating deep-orange accent-3" style={{ position: 'absolute', bottom: 20, right: 20 }}><i class="material-icons">add_shopping_cart</i></a>;
    const removeFromCartButton = <a onClick={handleRemoveFromCart} class="waves-effect waves-light btn-floating grey darken-3" style={{ position: 'absolute', bottom: 20, right: 20 }}><i class="material-icons" style={{ color: 'orangered' }}>remove_shopping_cart</i></a>;
    return (
        <card class="col s12 m4">
            <div class="card horizontal z-depth-5" style={{ marginLeft: 10, marginRight: 10, marginTop: 30, marginBottom: 30 }}>
                <div class="card-image z-depth-5">
                    <img src={`/static/${book.isbn}.jpg`} onError={(event) => event.target.setAttribute('src', '/static/default.jpg')} alt="book cover" style={{ height: 350 }}/>
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <a href={`/${book.isbn}`} style={{ color: 'orangered', fontWeight: 600 }}><h5>{book.title}</h5></a>
                        {book.title?.length < 20 && <br/>}
                        <p>isbn: {book.isbn}</p>
                        <br/>
                        <p>{book.year}, <a onClick={handleAuthorFilter} style={{ cursor: 'pointer', color: 'orangered', fontWeight: 600 }}>{book.author?.firstName} {book.author?.lastName}</a></p>
                        <p>Category: <a onClick={handleCategoryFilter} style={{ cursor: 'pointer', color: 'orangered', fontWeight: 600 }}>{book.category?.title}</a></p>
                        <br/>
                        <p>${book.price} ({book.count === 0 && <>No copies</>}{book.count === 1 && <>1 copy</>}{book.count > 1 && <>{book.count} copies</>} in stock)</p>
                        <br/>
                        {Stars(book.star)}
                        <p>{book.reviewsCount === 0 && <>No reviews</>}{book.reviewsCount === 1 && <>1 review</>}{book.reviewsCount > 1 && <>{book.reviewsCount} reviews</>}</p>
                    </div>
                </div>
                {inCart ? removeFromCartButton : addToCartButton}
            </div>
        </card>
    );
};

export default Book;
