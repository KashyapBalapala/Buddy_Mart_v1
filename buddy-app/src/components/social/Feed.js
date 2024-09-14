import React, { useEffect, useState } from 'react'
import '../../css/Feed.css'
import MessageSender from './MessageSender'
import Post from './Post'
import StoryReel from './StoryReel'
// import db from '../../firebase'
// import {useAuth} from '../../contexts/AuthContext';

function Feed() {
    // const {currentUser} = useAuth();
    const currentUser = {
        uid: 1,
    };
    const [posts, setPosts] = useState([
        {
          id: 'post1',
          post: {
            profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
            message: 'Just got a new bike! Excited to start riding.',
            timestamp: '2024-09-06T12:34:56Z',
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
            timestamp: '2024-09-05T16:20:30Z',
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
            timestamp: '2024-09-04T10:00:00Z',
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
            timestamp: '2024-09-03T14:50:12Z',
            username: 'EmilyDavis',
            image: 'https://example.com/images/getaway.jpg',
            likes: 58
          }
        }
      ]
      );

    useEffect(() => {
        // db.collection('posts')
        //     .orderBy("timestamp", "desc")
        //     .onSnapshot((snapshot) => 
        //     setPosts(snapshot.docs.map((doc) => ({
        //         id: doc.id,
        //         post: doc.data()
        //     })))
        // );
    }, [])

    return (
        <div className="feed">
            <StoryReel />
            <MessageSender />

            {posts.map(({ id, post }) => (
                <Post
                    key={id}
                    postId={id}
                    profilePic={post.profilePic}
                    message={post.message}
                    timestamp={post.timestamp}
                    username={post.username}
                    image={post.image}
                    userId={currentUser.uid}
                    likes={post.likes}
                />
            ))}
        </div>
    )
}

export default Feed
