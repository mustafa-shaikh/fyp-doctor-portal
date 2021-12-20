import React from 'react';

import { accountService } from '@/_services';

function Home() {
    const user = accountService.userValue;

    return (
        <div className="content-container">
            <div className="container-fluid">
                <div className="jumbotron">
                    {console.log(user)}
                    <h1>Hi Dr. {user.firstName} {user.lastName}!</h1>
                </div>
            </div>
        </div>
    );
}

export { Home };
