import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Checkout.css";
import Friend from './Friend';
// import db from '../../firebase';
// import {useAuth} from '../../contexts/AuthContext';

import Header from "../Header";
import '../../css/Users.css';
import emailIcon from '../../resources/email.png';
import likeIcon from '../../resources/like-16x16(1).png';
import Post from "../social/Post";
import Avatar from '@mui/material/Avatar';
import { httpGetUserFriends, httpGetUserPosts } from "../../services/facade.service";


function Friends({id, emailAdd, gender, name, profilePic}) {
    const history = useNavigate();
    const [friends, setFriends] = useState([]);
    // const { currentUser} = useAuth();
    const [length, setLength] = useState(0);
    const [posts, setPosts] = useState([
      {
          id: 'post1',
          post: {
              profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
              message: 'Just got a new bike! Excited to start riding.',
              timestamp: '2024-09-06T12:34:56Z', // ISO 8601 format
              username: 'JohnDoe',
              image: 'https://example.com/images/bike.jpg',
              likes: 45
          }
      },
      {
          id: 'post2',
          post: {
              profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
              message: 'Had a great time at the beach today!',
              timestamp: '2024-09-05T16:20:30Z', // ISO 8601 format
              username: 'JaneSmith',
              image: 'https://example.com/images/beach.jpg',
              likes: 78
          }
      },
      {
          id: 'post3',
          post: {
              profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
              message: 'Just finished reading an amazing book.',
              timestamp: '2024-09-04T10:00:00Z', // ISO 8601 format
              username: 'MikeJohnson',
              image: 'https://example.com/images/book.jpg',
              likes: 32
          }
      },
      {
          id: 'post4',
          post: {
              profilePic: 'https://randomuser.me/api/portraits/women/4.jpg',
              message: 'Looking forward to the weekend getaway!',
              timestamp: '2024-09-03T14:50:12Z', // ISO 8601 format
              username: 'EmilyDavis',
              image: 'https://example.com/images/getaway.jpg',
              likes: 58
          }
      }
  ]
  );
    const [Gender, setGender] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [requests, setRequests] = useState(0);

    // const currentUser = {
    //   uid: 'user123',
    //   displayName: 'John Doe',
    //   photoURL: 'https://randomuser.me/api/portraits/men/1.jpg',
    //   email: 'john.doe@example.com'
    // };

    const currentUser = {
      "_id": "66e16475863b37a31b18a136",
      "email": "emma@example.com",
      "__v": 0,
      "friends": [],
      "posts": [],
      "profilePic": "https://randomuser.me/api/portraits/women/3.jpg",
      "userName": "emma_watson",
      "bucketId": null
    }
    

    useEffect(() => {
      const getPosts = async () => {
          try {
              const fetchedPosts = await httpGetUserPosts(currentUser._id);
              setPosts(fetchedPosts);
          } catch (error) {
              console.error('Failed to fetch posts', error);
          }
      };
  
      console.log('Effect triggered');
      getPosts();
  }, []);

  useEffect(() => {
    const getFriends = async () => {
        try {
            const fetchedFriends = await httpGetUserFriends(currentUser._id);
            setPosts(fetchedFriends);
        } catch (error) {
            console.error('Failed to fetch friends', error);
        }
    };

    console.log('Effect triggered');
    getFriends();
}, []);

    useEffect(() => {
      // db.collection('posts')
      // .orderBy("timestamp", "desc")
      // .get().then((querySnapshot) => {
      //   querySnapshot.forEach(doc => {
      //     if (doc.data().userId === currentUser.uid) {
      //       const postObj = {
      //         id: doc.id,
      //         post : doc.data()
      //       }
      //       if (!posts.find(obj => obj.id === postObj.id))
      //         setPosts(posts => [...posts, postObj]);
      //     }
      //   })
      // })
    // eslint-disable-next-line
    }, [])

    const goToUpdateProfile = () => {
      let path = `/update-profile`;
      history(path);
    }

  return (
    <div>
    <Header length = {length} noRequests={requests} />
    <div className="row" style={{width: "99%"}}>
      <div className="col-md-8" style={{alignItems: "center"}}>
      <h2 className="users-heading">Your Profile</h2>
      <div class="card" style={{width:"68.7%", marginLeft: "15%"}}>
            <div class="card-header" style={{width:"100%", height: "150px"}}>
                
            </div>
            <div class="card-body" style={{width:"100%", paddingRight:20}}>
                <div className='card-inline'><Avatar src={currentUser.photoURL} />&nbsp;&nbsp;
                    <h3>{currentUser.displayName}</h3>
                </div>
                <p><span><img src={likeIcon} alt="like" style={{height:16, width:16, marginRight:10}} /></span>{Gender}</p>
                <p><span><img src={emailIcon} alt="like" style={{height:22, width:22, marginRight:5, marginTop:5}} /></span>{currentUser.email}</p>
                <p><span><img src="https://img.icons8.com/ultraviolet/40/000000/phone.png" style={{height:22, width:22, marginRight:5, marginTop:5}} alt="" /></span>{phoneNumber}</p>
                <button onClick={goToUpdateProfile} style={{marginTop:20}}>Update Profile</button>
            </div>
      </div>
      <div className="feed">
      {posts.map((post) => (
                <Post
                    key={post._id}
                    postId={post._id}
                    profilePic={post.profilePic}
                    message={post.content}
                    timestamp={post.createdAt}
                    username={post.userName}
                    image={post.image ? post.image : ''}
                    userId={currentUser.userId}
                    likes={0}
                />
            ))}
      </div>
      </div>
      <div className="col-md-4">
      <h2 className="users-heading">Your Shopping Buddies <span><img src="https://img.icons8.com/emoji/48/000000/purple-heart.png" alt="emoji" />
        <img src="https://img.icons8.com/color/48/000000/friends-hanging-out.png" alt="emoji" /></span></h2>
      <div className="user__row">
      {friends.map(({ friendId, friend }) => (
             <Friend 
              key = {friendId}
              id = {friendId}
              emailAdd = {friend.friendEmail}
              name = {friend.friendName}
              profilePic = {friend.friendProfilePic}
            />
         ))}
      </div>
      </div>
    </div>
    </div>
  );
}

export default Friends;
