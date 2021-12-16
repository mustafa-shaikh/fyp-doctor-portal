import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Details } from './Details';
import { Update } from './Update';

function Profile({ match }) {
    const { path } = match;

    return (
        <div className="content-container">
            <div className="container-fluid">
                <div className="jumbotron">
                    <Switch>
                        <Route exact path={path} component={Details} />
                        <Route path={`${path}/update`} component={Update} />
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export { Profile };