import React from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '@/_services';
//import qr from './QR.png';


function Details({ match }) {
    const { path } = match;
    const user = accountService.userValue;

    return (
        <div>
            <h1>My Profile</h1>
            <p>
                <strong>Name: </strong>{user.firstName} {user.lastName}<br />
                <strong>Email: </strong> {user.email}
            </p>
            <p><Link to={`${path}/update`}>Update Profile</Link></p>
        </div>
        // <div className="qr">
        //     <img src={QR} alt= "QR image" height={200} width={200} />
        // </div>
    );
}

export { Details };
