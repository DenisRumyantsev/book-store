import React, { useState, createContext } from 'react';

export const Context = createContext();

export const ContextProvider = (props) => {
    const limit = 3;
    const [book, setBook] = useState({});
    const [books, setBooks] = useState([]);
    const [cartBooks, setCartBooks] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [query, setQuery] = useState(new URLSearchParams(''));
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const useFilter = (books) => { setBooks(books); };
    return (
        <Context.Provider value={{
            limit,
            book,
            setBook,
            books,
            setBooks,
            cartBooks,
            setCartBooks,
            query,
            setQuery,
            currentPage,
            setCurrentPage,
            maxPage,
            setMaxPage,
            useFilter
        }}>{props.children}</Context.Provider>
    );
};
