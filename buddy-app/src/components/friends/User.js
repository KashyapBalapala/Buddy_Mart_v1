import React, { useEffect, useState } from 'react';
import '../../css/Users.css';
// import db from '../../firebase';
// import {useAuth} from '../../contexts/AuthContext';
import likeIcon from '../../resources/like-16x16(1).png';
import emailIcon from '../../resources/email.png';
import  { Avatar } from '@mui/material';

function User({key, id, emailAdd, gender, name, profilePic, isFriend}) {
    // const {currentUser} = useAuth();
    const currentUser = {
        userId: 2000340,
        userName: 'Kashyap',
        email: 'kbalapala@gmail.com',
        password: 'password',
        friends: [2000342],
        basketId: 10032,
        posts: [],
        profilePic: 'https://example.com/profilePics/kashyap.jpg',
        gender: 'male'
      };
    // const [alreadyFriend, setAlreadyFriend] = useState(false);

    

    const sendRequest = () => {
        
    }

    if (currentUser.email === emailAdd) {
        return (
            <div style={{display:'none'}}>
            </div>
        )
    }

    return (
        <div class="card"  style={{height: "fit-content"}}>
            <div class="card-header">
                
            </div>
            <div class="card-body">
                <div className='card-inline'><Avatar src={profilePic} />&nbsp;&nbsp;
                    <h3>{name}</h3>
                </div>
                <p><span><img src={likeIcon} alt="like" style={{height:16, width:16, marginRight:10}} /></span>{gender}</p>
                <p><span><img src={emailIcon} alt="email" style={{height:22, width:22, marginRight:5}} /></span>{emailAdd}</p>
                {isFriend? <p><br />👩🏻‍🤝‍🧑🏻 Friends</p>: <button onClick={sendRequest}>Add Buddy</button>}
            </div>
        </div>
    )
}

export default User
