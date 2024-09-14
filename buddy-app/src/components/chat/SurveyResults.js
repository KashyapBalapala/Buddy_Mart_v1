import React, { useEffect, useState } from 'react'
// import { useAuth } from '../../contexts/AuthContext'
// import db from '../../firebase'
import SurveyProduct from './SurveyProduct';
import Header from '../Header.js'
import '../../css/Users.css'

function SurveyResults() {
    // const {currentUser} = useAuth();
    const [products, setProducts] = useState([
        {
          productId: '1',
          product: {
            itemName: 'Sleek Modern Sofa',
            itemImage: 'https://example.com/images/sofa.jpg'
          }
        },
        {
          productId: '2',
          product: {
            itemName: 'Bluetooth Headphones',
            itemImage: 'https://example.com/images/headphones.jpg'
          }
        },
        {
          productId: '3',
          product: {
            itemName: 'Smartwatch Series 7',
            itemImage: 'https://example.com/images/smartwatch.jpg'
          }
        },
        {
          productId: '4',
          product: {
            itemName: 'Stainless Steel Coffee Maker',
            itemImage: 'https://example.com/images/coffeemaker.jpg'
          }
        },
        {
          productId: '5',
          product: {
            itemName: 'Compact Digital Camera',
            itemImage: 'https://example.com/images/camera.jpg'
          }
        }
      ]);
    const [length, setLength] = useState(0);
    const [requests, setRequests] = useState(0);
  
      
    useEffect(() => {
        // if (currentUser) {
        //     db.collection("users").doc(currentUser.uid).get().then(docc => {
        //         const data = docc.data();
        //         setLength(data.noItems);
        //     })
        //     db.collection("users").doc(currentUser.uid).collection("friendRequests").get().then(snapshot => {
        //       setRequests(snapshot.size);
        //   })
        // }
    })

    useEffect(() => {
    //     db.collection('users').doc(currentUser.uid).collection('surveyResults')
    //     .onSnapshot((snapshot) => 
    //     setProducts(snapshot.docs.map((doc) => ({
    //         productId: doc.id,
    //         product: doc.data()
    //     })))
    // );
    // eslint-disable-next-line
    }, [])

    return (
      <div>
        <Header length={length} noRequests={requests} />
        <h2 className="users-heading">Survey Results <span><img src="https://img.icons8.com/color/64/000000/report-card.png" alt="" /></span></h2>
        <div className="user__row" style={{marginTop: "40px"}}>
            {products.map(({ productId, product }) => (
				<SurveyProduct 
					key = {productId}
					id = {productId}
					productName = {product.itemName}
					productImage = {product.itemImage}
				/>
            ))}
          </div>
    </div>
    )
}

export default SurveyResults
