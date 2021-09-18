import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './routes/Home';
import AdminBookPage from './routes/AdminBookPage';
import CartPage from './routes/CartPage';
import DetailsPage from './routes/DetailsPage';
import Categories from './routes/Categories';
import Category from './routes/Category';
import Authors from './routes/Authors';
import Author from './routes/Author';
import { ContextProvider } from './context/Context';

const App = () => {
    return (
        <ContextProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/create_book" component={AdminBookPage}/>
                    <Route exact path="/:isbn/update_book" component={AdminBookPage}/>
                    <Route exact path="/cart" component={CartPage}/>
                    <Route exact path="/:isbn" component={DetailsPage}/>
                    <Route exact path="/categories" component={Categories}/>
                    <Route exact path="/categories/:id" component={Category}/>
                    <Route exact path="/authors" component={Authors}/>
                    <Route exact path="/authors/:id" component={Author}/>
                </Switch>
            </Router>
        </ContextProvider>
    );
};

export default App;
