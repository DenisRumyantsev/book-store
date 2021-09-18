import React, { useState } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import '../styles/styles.css';

const CartBook = (b) => {
    const { book } = b;
    const [deleted, setDeleted] = useState(false);
    const [countInOrder, setCountInOrder] = useState(book.countInOrder);
    const handleMinusOne = (e) => {
        e.preventDefault();
        (countInOrder > 1) && setCountInOrder(countInOrder - 1);
    };
    const handlePlusOne = (e) => {
        e.preventDefault();
        if (countInOrder < book.count) {
            setCountInOrder(countInOrder + 1);
        } else { alert(`There are only ${book.count} copies in stock`); }
    };
    const handleDelete = (e) => {
        e.preventDefault();
        setDeleted(!deleted);
    };
    useBeforeunload(() => {
        const cartBooks = JSON.parse(localStorage.getItem('cart'));
        for (const i in cartBooks) {
            if (cartBooks[i].isbn === book.isbn) {
                cartBooks[i].countInOrder = countInOrder;
                deleted && cartBooks.splice(i, 1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(cartBooks));
    });
    return (
        <tr>
            <td>{book.title}</td>
            <td>{book.isbn}</td>
            <td>{book.year}</td>
            <td>{book.author?.firstName} {book.author?.lastName}</td>
            <td>{book.category?.title}</td>
            <td>${book.price}</td>
            <td>
                <i onClick={handleMinusOne} class="material-icons unselectable" style={{ cursor: 'pointer', position: 'relative', top: 7, right: 7, color: 'orangered' }}>remove</i>
                {countInOrder}
                <i onClick={handlePlusOne} class="material-icons unselectable" style={{ cursor: 'pointer', position: 'relative', top: 7, left: 7, color: 'orangered' }}>add</i>
            </td>
            <td><i onClick={handleDelete} class="material-icons unselectable" style={{ cursor: 'pointer', position: 'relative', top: 7, color: 'orangered' }}>{deleted ? <>add_shopping_cart</> : <>remove_shopping_cart</>}</i></td>
        </tr>
    );
};

export default CartBook;
