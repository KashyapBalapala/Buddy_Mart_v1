import React, { useEffect, useState } from "react";
import "../../css/Checkout.css";
import CheckoutProduct from './CheckoutProduct';
// import db from '../../firebase';
// import {useAuth} from '../../contexts/AuthContext';
import Subtotal from "./Subtotal";

// import ShareBasketModal from './ShareBasketModal'

function Checkout() {
  const item = {
    id: 1,
    productId: 1,
    itemName: 'Tokyo Talkies Green Solid A line Dress, perfect for nightouts and parties',
    itemPrice: 1200,
    itemImage: 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/22241876/2023/9/21/f5bb5c18-6233-47db-8479-be5205a3fea81695294768389WROGNMenColourblockedRunningShoes1.jpg',
    itemRating: 4,
    itemQuantity: 100     
  };
    // const {currentUser} = useAuth();
    const [items, setItems] = useState([item, item, item, item]);
    const [length, setLength] = useState(0);
    const [total, setTotal] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        // if (currentUser) {
        //     db.collection("users").doc(currentUser.uid).get().then(docc => {
        //         const data = docc.data();
        //         setTotal(data.subtotal);
        //         setLength(data.noItems);
        //     })
        // }
        

        // setItems();
    }, [])
    

    useEffect(() => {
        // db.collection("users").doc(currentUser.uid).collection("basketItems")
        //     .onSnapshot((snapshot) => 
        //     setItems(snapshot.docs.map((doc) => ({
        //         id: doc.id,
        //         item: doc.data()
        //     })))
        // );
    // eslint-disable-next-line
    }, [])

    const showModal = () => {
        setShow(true);
    };
  
  	const hideModal = () => {
      	setShow(false);
  	};

    return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/4/3/aa5e9ecb-b4ba-4f27-82be-c27e5985e7231617445678068-Main_Banners_Desktop1.jpg"
          alt=""
        />

        <div className="checkout__products">
          <h2 className="checkout__title">Your shopping Basket</h2>
          {/* {items.map(({ id, item }) => ( */}
            {items.map(item => (
              <CheckoutProduct 
              key = {item.id}
              productId = {item.id}
              title = {item.itemName}
              price = {item.itemPrice}
              image = {item.itemImage}
              rating = {item.itemRating} 
              quantity = {item.itemQuantity}
              setLength = {setLength}
              setTotal = {setTotal}
            />
            ))}
              
          {/* ))} */}
        </div>
      </div>
      <div className="checkout__right">
			<Subtotal 
				checkout
				length = {length}
				total = {total}
			/>
		  {/* <ShareBasketModal show={show} handleClose={hideModal}>
          <p>Modal</p>
      </ShareBasketModal> */}
      <button onClick={showModal} style={{margin:"20px 30px"}}>Share Basket</button>
      </div>
    </div>
  );
}

export default Checkout;