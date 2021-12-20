import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';

import { Role, Status } from '@/_helpers';
import { accountService } from '@/_services';

import profilePic from './img.jpg';

function Nav() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    if (!user) return null;

    return (
        <div>
            <div className="sidebar-container">
                <div className="sidebar-logo text-left">
                    <h2 className="fs-2 fw-bold">E-Health</h2>
                    <h6 className="fs-6 fst-italic">Doctor's Portal</h6>
                </div>
                    <div className="fa fa-home">
                        {user.doctorStatus === Status.Authorized &&
                            <p className="bg-success text-center" disabled ><br/></p>
                        }
                        {user.doctorStatus === Status.Unauthorized &&
                            <p className="bg-danger text-center" disabled >Access Unauthorized</p>
                        }
                    </div>
                    
                    
                <ul className="sidebar-navigation">
                        <li>
                        <NavLink to="/profile" className="fluid-container">
                            <img src={profilePic} className="rounded float-left"  alt="" width="35%" height="35%" />
                            <p className="text-center">Dr. {user.firstName} {user.lastName}</p>
                            <p className="text-center">{user.title}</p>


                        </NavLink>
                        </li>
                    <li>
                        <NavLink exact to="/" className="fa fa-home">Dashboard</NavLink>
                    </li>
                    {user.doctorStatus === Status.Authorized &&
                        <li>
                            <NavLink to="/manage" className="fa fa-tachometer">Manage</NavLink>
                        </li>
                    }
                    <li>
                        <a onClick={accountService.logout} className="fa fa-tachometer">Logout</a>
                    </li>
                    <Route path="/manage" component={ManageNav} />
                </ul>
            </div >
        </div >
    );
}

function ManageNav({ match }) {
    const { path } = match;

    return (
        <nav className="sidebar-container">
            <div className="sidebar-navigation">
                <li className="header"></li>
                <li>
                    <NavLink to={`${path}/users`} className="fa fa-tachometer">Users</NavLink>
                </li>
            </div>
        </nav>
    );
}

export { Nav };
