import React from 'react';

import { accountService } from '@/_services';

//var React = require('react');
var QRCode = require('qrcode.react');
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
            <div className="container-fluid col-5">
                <div classname="jumborton">
                    {/* <QRCode value="http://google.com" />, */}
                    <p>Scan this QR code from patient's device</p>
                    <QRCode value={user.id}/>,
                    
                </div>
            </div>
            
            {/* <div className="container-fluid">
                <div className="jumbotron">
                    <img alt = "" src = {require("./QR.png").default} />
                </div>
            </div> */}
        </div>
    );
}

export { Home };
