import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import BooksList from '../components/BooksList';
import Footer from '../components/Footer';

const Home = () => {
    const query = new URLSearchParams(useLocation().search);
    return (
        <>
            <Header/>
            {BooksList(query)}
            <Footer/>
        </>
    );
};

export default Home;
