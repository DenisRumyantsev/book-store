import React, { useState, useContext } from 'react';
import { Context } from '../context/Context';
import booksAPI from '../apis/books.api';
import AuthorsDropdown from './AuthorsDropdown';
import { spaceNorm } from '../resources/normalizators';

const Header = () => {
    const context = useContext(Context);
    const [scaleSortButtons, setScaleSortButtons] = useState('out');
    const [scaleAuthorsDropdown, setScaleAuthorsDropdown] = useState('out');
    const [input, setInput] = useState('');

    const handleScaleSortButtons = (e) => {
        e.preventDefault();
        scaleSortButtons === 'out'
            ? setScaleSortButtons('in')
            : setScaleSortButtons('out');
    };
    const handleScaleAuthorsDropdown = (e) => {
        e.preventDefault();
        scaleAuthorsDropdown === 'out'
            ? setScaleAuthorsDropdown('in')
            : setScaleAuthorsDropdown('out');
    };

    function handleInput (clickSearchButton) {
        const search = spaceNorm(input);

        return async (e) => {
            e.preventDefault();
            if (search && (clickSearchButton || e.key === 'Enter')) {
                await booksAPI.getAll({ search }, context);
            }
        };
    }
    function handleSort (sort) {
        return async (e) => {
            e.preventDefault();
            await booksAPI.getAll({ sort }, context);
        };
    }
    const sortButtonsInfo = [
        { sortOrder: 'star desc', buttonName: 'rating desc' },
        { sortOrder: 'star asc', buttonName: 'rating asc' },
        { sortOrder: 'price desc', buttonName: 'price desc' },
        { sortOrder: 'price asc', buttonName: 'price asc' },
        { sortOrder: 'year desc', buttonName: 'year desc' },
        { sortOrder: 'year asc', buttonName: 'year asc' }
    ];
    const sortButtons = [];
    for (const i in sortButtonsInfo) {
        sortButtons.push(
            <a
                onClick={handleSort(sortButtonsInfo[i].sortOrder)}
                class={`btn deep-orange accent-3 z-depth-5 scale-transition scale-${scaleSortButtons}`}
                style={{ position: 'fixed', left: 50, top: 100 + 60 * i, width: 200 }}
            >
                {sortButtonsInfo[i].buttonName}
            </a>
        );
    }

    return (
        <nav class="grey darken-3 z-depth-5" style={{ position: 'fixed', top: 0, zIndex: 100 }}>
            {sortButtons}
            <div class="nav-wrapper">
                <ul class="left">
                    <li><a onClick={handleScaleSortButtons} style={{ marginLeft: 30, marginRight: 170 }} class="btn-floating deep-orange accent-3"><i class="material-icons">menu</i></a></li>
                    <li><i onClick={handleInput(true)} class="material-icons" style={{ cursor: 'pointer', color: 'orangered', marginRight: 15 }}>search</i></li>
                    <li><input value={input} onChange={(e) => setInput(e.target.value)} onKeyUp={handleInput(false)} placeholder="Type here to search book . . ." style={{ width: 400, color: 'whitesmoke' }}/></li>
                    <li><i onClick={() => setInput('')} class="material-icons" style={{ cursor: 'pointer', color: 'orangered', marginLeft: 15 }}>clear</i></li>
                </ul>
                <a href="/" class="brand-logo center">Book Store</a>
                <ul class="right" style={{ marginRight: 100 }}>
                    <li>
                        <div onClick={handleScaleAuthorsDropdown} style={{ cursor: 'pointer', width: 300, marginRight: 50 }} class="row">
                            <div class="col s10">
                                <div class="input-field">
                                    <input value={'S E L E C T     A U T H O R'} disabled type="text" style={{ fontWeight: 600, color: 'orangered' }}/>
                                </div>
                            </div>
                            <i class="material-icons" style={{ position: 'relative', right: 40, fontSize: 30, color: 'orangered' }}>arrow_drop_down</i>
                        </div>
                        {AuthorsDropdown(scaleAuthorsDropdown)}
                    </li>
                    <li><a href="/cart" class="waves-effect waves-light btn deep-orange accent-3">cart<i class="material-icons right">shopping_cart</i></a></li>
                    <li><a class="waves-effect waves-light btn deep-orange accent-3">sign out<i class="material-icons right">person_outline</i></a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
