import React, { useContext } from 'react';
import { Context } from '../context/Context';
import booksAPI from '../apis/books.api';

const styles = {
    body: { height: 40, fontWeight: 600, color: 'black', cursor: 'pointer' },
    line: { position: 'relative', bottom: 20 }
};

const AuthorRow = (author) => {
    const context = useContext(Context);
    const handleAuthorFilter = async (e) => {
        e.preventDefault();
        await booksAPI.getAll({ authorId: author.id }, context);
    };
    return (
        <row class="col s10 offset-s1" style={styles.body}>
            <center onClick={handleAuthorFilter}>{author.firstName} {author.lastName}</center>
            <hr color="silver" style={styles.line}/>
        </row>
    );
};

export default AuthorRow;
