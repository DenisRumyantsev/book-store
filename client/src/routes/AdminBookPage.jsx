import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import AdminBookBody from '../components/AdminBookBody';
import Footer from '../components/Footer';

const AdminBookPage = () => {
    const urlPath = useLocation().pathname.slice(1).split('/');
    return (
        <>
            <Header/>
            {AdminBookBody(urlPath)}
            <Footer/>
        </>
    );
};

export default AdminBookPage;
