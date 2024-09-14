import React, { useEffect, useState } from 'react';
import '../../css/Checkout.css';
import '../../css/CheckoutProduct.css';
import '../../css/Users.css';
// import { useAuth } from '../../contexts/AuthContext';
// import db from '../../firebase';
import SharedBasketUser from './SharedBasketUser';

function SharedBaskets() {
    const [friends, setFriends] = useState([
        {
          id: '1',
          data: {
            read: true,
            friendName: 'Alice Johnson',
            friendEmail: 'alice.johnson@example.com',
            friendProfilePic: 'https://randomuser.me/api/portraits/women/1.jpg'
          }
        },
        {
          id: '2',
          data: {
            read: false,
            friendName: 'Bob Smith',
            friendEmail: 'bob.smith@example.com',
            friendProfilePic: 'https://randomuser.me/api/portraits/men/2.jpg'
          }
        },
        {
          id: '3',
          data: {
            read: true,
            friendName: 'Clara Davies',
            friendEmail: 'clara.davies@example.com',
            friendProfilePic: 'https://randomuser.me/api/portraits/women/3.jpg'
          }
        },
        {
          id: '4',
          data: {
            read: false,
            friendName: 'David Lee',
            friendEmail: 'david.lee@example.com',
            friendProfilePic: 'https://randomuser.me/api/portraits/men/4.jpg'
          }
        },
        {
          id: '5',
          data: {
            read: true,
            friendName: 'Evelyn Stone',
            friendEmail: 'evelyn.stone@example.com',
            friendProfilePic: 'https://randomuser.me/api/portraits/women/5.jpg'
          }
        }
      ]
    );
    // const {currentUser} = useAuth();

 

    useEffect(() => {
        // db.collection("users").doc(currentUser.uid).collection("friends").get().then(querySnapshot => {
        //     setFriends(querySnapshot.docs.map((doc) => ({
        //         id: doc.id,
        //         data: doc.data()
        //     })))
        // });
    // eslint-disable-next-line
    }, [])

    return (
        <div>
        <h2 className="users-heading">Shared Baskets <img src="https://img.icons8.com/fluent/48/000000/favorite-cart.png" alt="" /></h2>
        <div class="baskets-container">
            {friends.map(({id, data}) => {
                return(
                    <div>
                    {data.read === true? 
                        <div>
                        <SharedBasketUser key={id} id={id} name={data.friendName} emailAdd={data.friendEmail} profilePic={data.friendProfilePic} />
                        </div>
                        : <div></div>
                    }
                    </div>
            )})}
        </div>
        </div>
    )
}

export default SharedBaskets
