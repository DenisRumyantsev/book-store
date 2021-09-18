import React, { useState } from 'react';
import { isbnValidIfPresent, uuidValidIfPresent } from '../resources/validators';
import { styles } from '../styles/styles';

const AdminBookInfo = (bookProps) => {
    const [scaleAuthorList, setScaleAuthorList] = useState('out');
    const [scaleCategoryList, setScaleCategoryList] = useState('out');

    const { book, setBook } = bookProps;

    const handleScaleAuthorList = () => {
        if (scaleAuthorList === 'out') {
            setScaleAuthorList('in');
            setScaleCategoryList('out');
        } else {
            setScaleAuthorList('out');
        }
    };

    const handleScaleCategoryList = () => {
        if (scaleCategoryList === 'out') {
            setScaleCategoryList('in');
            setScaleAuthorList('out');
        } else {
            setScaleCategoryList('out');
        }
    };

    function listRow (content) {
        return <row class="col s12" style={styles.dropRow}><center>{content}</center></row>;
    }

    const authorsList = [];
    for (let i = 1; i <= 30; i++) {
        authorsList.push(listRow(`Author ${i}`)); // TODO: provide actual authors list here
    }

    const categoriesList = [];
    for (let i = 1; i <= 20; i++) {
        categoriesList.push(listRow(`Category ${i}`)); // TODO: provide actual categories list here
    }

    return (
        <div class="col s12 m3">
            <div class="card z-depth-5" style={styles.card}>
                <center><h4 style={styles.bold}>Book Info</h4></center>
                <i onClick={handleScaleAuthorList} class="material-icons" style={styles.arrowAuthor}>arrow_drop_down_circle</i>
                <div class={`row z-depth-5 scale-transition scale-${scaleAuthorList}`} style={styles.dropAuthor}>
                    {authorsList}
                </div>
                <i onClick={handleScaleCategoryList} class="material-icons" style={styles.arrowCategory}>arrow_drop_down_circle</i>
                <div class={`row z-depth-5 scale-transition scale-${scaleCategoryList}`} style={styles.dropCategory}>
                    {categoriesList}
                </div>
                <div class="input-field">
                    <input value={book.isbn} onChange={(e) => setBook({ ...book, isbn: e.target.value })} class={isbnValidIfPresent(book.isbn)} type="text"/>
                    <span style={styles.bold} class="helper-text" data-error="I S B N — invalid" data-success="I S B N — correct">I S B N</span>
                </div>
                <div class="input-field">
                    <input value={book.authorId} onChange={(e) => setBook({ ...book, authorId: e.target.value })} class={uuidValidIfPresent(book.authorId)} type="text"/>
                    <span style={styles.bold} class="helper-text" data-error="A U T H O R _ U U I D — invalid" data-success="A U T H O R _ U U I D — correct">A U T H O R _ U U I D</span>
                </div>
                <div class="input-field">
                    <input value={book.categoryId} onChange={(e) => setBook({ ...book, categoryId: e.target.value })} class={uuidValidIfPresent(book.categoryId)} type="text"/>
                    <span style={styles.bold} class="helper-text" data-error="C A T E G O R Y _ U U I D — invalid" data-success="C A T E G O R Y _ U U I D — correct">C A T E G O R Y _ U U I D</span>
                </div>
                <div class="input-field">
                    <input value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} type="text"/>
                    <span style={styles.bold}>T I T L E</span>
                </div>
                <div class="row">
                    <div class="input-field col s12 m4">
                        <input value={book.year} onChange={(e) => setBook({ ...book, year: e.target.value })} type="text"/>
                        <span style={styles.bold}>Y E A R</span>
                    </div>
                    <div class="input-field col s12 m4">
                        <input value={book.price} onChange={(e) => setBook({ ...book, price: e.target.value })} id="price" type="text"/>
                        <span style={styles.bold}>P R I C E</span>
                    </div>
                    <div class="input-field col s12 m4">
                        <input value={book.count} onChange={(e) => setBook({ ...book, count: e.target.value })} id="count" type="text"/>
                        <span style={styles.bold}>C O U N T</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBookInfo;
