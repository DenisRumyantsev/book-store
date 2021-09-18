import React, { useContext } from 'react';
import { Context } from '../context/Context';
import CartBook from './CartBook';

const Cart = () => {
    const { cartBooks } = useContext(Context);
    return (
        <div class="card z-depth-5" style= {{ marginTop: 100, marginBottom: 50, marginLeft: 200, marginRight: 200, paddingTop: 10, paddingBottom: 100, paddingLeft: 100, paddingRight: 100 }}>
            {cartBooks.length ? <center><h1>C A R T</h1></center> : <center style={{ marginTop: 150, marginBottom: 150 }}><h3>Now your cart is empty . . .</h3></center>}
            {cartBooks.length > 0 &&
                <table class="striped centered">
                    <thead>
                        <tr>
                            <th>T I T L E</th>
                            <th>I S B N</th>
                            <th>Y E A R</th>
                            <th>A U T H O R</th>
                            <th>C A T E G O R Y</th>
                            <th>P R I C E</th>
                            <th>C O U N T</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartBooks && cartBooks.map(book => <CartBook key={book.isbn} book={book}/>)}
                    </tbody>
                </table>
            }
        </div>
    );
};

export default Cart;
