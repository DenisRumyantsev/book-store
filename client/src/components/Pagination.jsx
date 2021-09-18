import React, { useContext } from 'react';
import { Context } from '../context/Context';
import booksAPI from '../apis/books.api';
import NoBooksFound from './NoBooksFound';

const pgbtn = { cursor: 'pointer', margin: 5 };
const pgbtnFW = { ...pgbtn, fontWeight: 600 };
const white = { color: 'whitesmoke' };
const red = { color: 'orangered' };
const black = { color: 'black' };

const Pagination = () => {
    const context = useContext(Context);
    const { query, currentPage, setCurrentPage, maxPage } = context;

    function paginator (pg) {
        return async (e) => {
            e.preventDefault();
            query.set('page', pg);
            await booksAPI.getAll(Object.fromEntries(query), context);
            setCurrentPage(pg);
        };
    }

    function handleGoTo (way) {
        switch (way) {
        case 'left':
            if (currentPage > 1) {
                return paginator(currentPage - 1);
            }
            break;
        case 'right':
            if (currentPage < maxPage) {
                return paginator(currentPage + 1);
            }
            break;
        default:
            if (way >= 1 && way <= maxPage) {
                return paginator(way);
            }
            break;
        }
    }

    function currentPageIsExtreme (way) {
        switch (way) {
        case 'left':
            return currentPage === 1;
        case 'right':
            return currentPage === maxPage;
        }
    }

    function pageButton (pageNumber, way) {
        switch (way) {
        case 'current':
            return <li class="deep-orange accent-3" style={pgbtn}><a style={white}>{pageNumber}</a></li>;
        case 'another':
            return <li onClick={handleGoTo(pageNumber)} class="grey darken-4" style={pgbtnFW}><a style={red}>{pageNumber}</a></li>;
        default:
            if (currentPageIsExtreme(way)) {
                return <li class="turn-off grey darken-2" style={pgbtn}><a><i class="material-icons" style={black}>{`chevron_${way}`}</i></a></li>;
            }
            return <li onClick={handleGoTo(way)} class="turn-on grey darken-4" style={pgbtn}><a><i class="material-icons" style={red}>{`chevron_${way}`}</i></a></li>;
        }
    }

    const pageButtons = [];
    pageButtons.push(pageButton(currentPage, 'left'));
    const scope = 4;
    for (let i = Math.max(1, currentPage - scope); i <= Math.min(maxPage, currentPage + scope); i++) {
        pageButtons.push(pageButton(i, currentPage === i ? 'current' : 'another'));
    }
    pageButtons.push(pageButton(currentPage, 'right'));

    return (
        <center>
            {!maxPage && <NoBooksFound/>}
            {!!maxPage && <ul class="pagination">{pageButtons}</ul>}
        </center>
    );
};

export default Pagination;
