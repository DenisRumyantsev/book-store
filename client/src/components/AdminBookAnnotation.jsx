import React, { useState } from 'react';
import booksAPI from '../apis/books.api';
import { isUuid } from 'uuidv4';
import { isIsbn } from '../resources/validators';
import { styles } from '../styles/styles';

const AdminBookAnnotation = (bookProps) => {
    const [deleted, setDeleted] = useState(false);

    const { book, setBook, cover, setCover, coverDeleted, currentIsbn, emptyBook } = bookProps;

    const paramsValid = () => {
        return (
            isIsbn(book.isbn) &&
            isUuid(book.authorId) &&
            isUuid(book.categoryId) &&
            book.title &&
            book.year &&
            book.price &&
            (book.count || book.count === 0) &&
            book.annotation
        );
    };

    const handleClear = () => {
        setBook(emptyBook);
        setCover('');
    };

    const handleSubmit = () => {
        book.cover = cover;
        book.coverDeleted = coverDeleted;
        if (deleted) {
            booksAPI.delete(currentIsbn);
            window.location.replace('/');
        } else if (currentIsbn) {
            booksAPI.update(currentIsbn, book);
            window.location.replace(`/${book.isbn}`);
        } else {
            booksAPI.create(book);
            handleClear();
        }
    };

    const deleteBtn = <a
        onClick={() => setDeleted(!deleted)}
        class={deleted ? styles.btnWavesDarken : styles.btnWavesOrange}
        style={deleted ? styles.btnR2red : styles.btnR2}>
        {deleted ? <>restore</> : <>delete</>}
        <i class="material-icons right">{deleted ? <>restore</> : <>delete_forever</>}</i>
    </a>;

    return (
        <div class="col s12 m6">
            <div class="card z-depth-5" style={styles.card}>
                <center><h4 style={styles.bold}>Annotation</h4></center>
                <div class="input-field">
                    <textarea value={book.annotation} onChange={(e) => setBook({ ...book, annotation: e.target.value })} style={styles.textArea} class="materialize-textarea"/>
                </div>
                <a onClick={handleSubmit} class={`${styles.btnWavesOrange}${paramsValid() ? '' : ' disabled'}`} style={styles.btnL1}>submit<i class="material-icons left">publish</i></a>
                <a onClick={handleClear} class={`${styles.btnWavesOrange}`} style={styles.btnR1}>clear<i class="material-icons right">clear</i></a>
                {currentIsbn && deleteBtn}
            </div>
        </div>
    );
};

export default AdminBookAnnotation;
