import React, { useState, useEffect } from 'react';
import authorsAPI from '../apis/authors.api';
import AuthorRow from './AuthorRow';

const styles = {
    body: {
        shell: { position: 'absolute', top: -370, right: 230, width: 600, height: 800, pointerEvents: 'none' },
        dropdown: { position: 'absolute', bottom: 0, left: 0, width: 400, pointerEvents: 'all' }
    },
    search: {
        body: { position: 'absolute', top: 0, height: 70 },
        icon: { color: 'orangered', marginRight: 15 },
        line: { width: 240, color: 'whitesmoke' },
        clear: { cursor: 'pointer', color: 'orangered', marginLeft: 15 }
    },
    scroll: {
        body: { position: 'relative', top: 70, height: 330, overflow: 'auto', backgroundColor: 'gainsboro' },
        seeMore: { height: 40, fontWeight: 700, color: 'orangered', whiteSpace: 'pre-wrap', cursor: 'pointer' }
    }
};

const AuthorsDropdown = (scale) => {
    const [authors, setAuthors] = useState([]);
    const [search, setSearch] = useState('');
    const [bunch, setBunch] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setBunch(2);
        let mounted = true;
        const fetchData = async () => {
            try {
                const params = { ...(search.length) && { search } };
                const { count, rows } = await authorsAPI.getAll(params);
                if (mounted) {
                    setCount(count);
                    setAuthors(rows);
                }
            } catch (err) { console.log(err); }
        };
        fetchData();
        return () => { mounted = false; };
    }, [search]);

    const handleSeeMore = async (e) => {
        e.preventDefault();
        setBunch(bunch + 1);
        try {
            const params = { bunch, ...(search.length) && { search } };
            const { rows } = await authorsAPI.getAll(params);
            setAuthors(authors.concat(rows));
        } catch (err) { console.log(err); }
    };

    const seeMoreButton = <row class="col s12"
        style={styles.scroll.seeMore}>
        <center onClick={handleSeeMore}>S E E     M O R E</center>
    </row>;

    return (
        <div class={`scale-transition scale-${scale}`} style={styles.body.shell}>
            <div class="z-depth-5" style={styles.body.dropdown}>
                <div class="row grey darken-4" style={styles.search.body}>
                    <div class="col s1 offset-s1">
                        <i class="material-icons" style={styles.search.icon}>search</i>
                    </div>
                    <div class="col s7">
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Type here to search author . . ." style={styles.search.line}/>
                    </div>
                    <div class="col s1">
                        <i onClick={() => setSearch('')} class="material-icons" style={styles.search.clear}>clear</i>
                    </div>
                    <div class="col s2"/>
                </div>
                <div class="row" style={styles.scroll.body}>
                    {authors && authors.map(author => AuthorRow(author))}
                    {(authors.length < count) && seeMoreButton}
                </div>
            </div>
        </div>
    );
};

export default AuthorsDropdown;
