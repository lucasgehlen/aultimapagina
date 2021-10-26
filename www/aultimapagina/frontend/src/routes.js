import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/signin" exact component={SignIn} />
            </Switch>
        </BrowserRouter>
    );
}