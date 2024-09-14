import React, { useState, useEffect } from 'react';
import Header from '../Header';
import UsersList from './UsersList';
import "../../css/Users.css";

function UsersSmart() {
    const currentUser = {
        photoURL: '',
        displayName: 'B Kashyap',
    };

    const [length, setLength] = useState(0);
    const [requests, setRequests] = useState(0);

    return (
        <div>
            <Header length={length} noRequests={requests}/>
            <UsersList />
        </div>
    )
}

export default UsersSmart