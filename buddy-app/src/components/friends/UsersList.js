import React, { useState, useEffect, useCallback } from 'react';
import User from './User';
import '../../App.css';
import { httpGetAllUsers } from '../../services/facade.service';

function UsersList() {
    const [users, setUsers] = useState([]);

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

    const checkFriend = (userId) => {
      if (currentUser.friends.indexOf(userId) >= 0) {
        console.log(userId);
        return true;
      } 
      return false;
    }

    const getAllUsers = useCallback(async () => {
      const fetchedUsers = await httpGetAllUsers();
      setUsers(fetchedUsers);
    }, []);
  
    useEffect(() => {
      getAllUsers();
    }, [getAllUsers]);

    return (
        <div>
          <h2 className="users-heading">
            Find your shopping buddy! 
            <span>
              <img src="https://img.icons8.com/emoji/48/000000/purple-heart.png" alt="emoji" />
              <img src="https://img.icons8.com/color/48/000000/friends-hanging-out.png" alt="emoji" />
            </span>
          </h2>

          <div className="user__row">
            {users.map(user => (
              <User 
                key={user.userId}
                id={user.userId}
                emailAdd={user.email}
                gender={user.gender}
                name={user.name}
                profilePic={user.profilePic}
                isFriend={checkFriend(user.userId)}
              />
            ))}
          </div>
        </div>
      );
}

export default UsersList;
