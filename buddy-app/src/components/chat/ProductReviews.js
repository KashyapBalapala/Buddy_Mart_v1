import React, { useEffect, useState } from 'react'
// import { useAuth } from '../../contexts/AuthContext'
// import db from '../../firebase'
import ProductReview from './ProductReview';

function ProductReviews({productId}) {

    // const {currentUser} = useAuth();
    const [reviews, setReviews] = useState([
        {
          reviewId: 'review1',
          review: {
            productFeedback: 'Amazing quality! Exceeded my expectations.',
            productFitting: 'Perfect fit, just as described.',
            productMaterial: 'High-quality material, feels very durable.',
            productQuality: 'Excellent quality, worth the price.',
            productValMoney: 'Great value for the money.',
            reviewerName: 'Alice Johnson'
          }
        },
        {
          reviewId: 'review2',
          review: {
            productFeedback: 'Decent product, but arrived with a small scratch.',
            productFitting: 'A bit loose, but still wearable.',
            productMaterial: 'Material feels a bit cheap.',
            productQuality: 'Good quality overall.',
            productValMoney: 'Fair value for the price.',
            reviewerName: 'Bob Smith'
          }
        },
        {
          reviewId: 'review3',
          review: {
            productFeedback: 'Fantastic! Highly recommend it.',
            productFitting: 'Fits like a glove.',
            productMaterial: 'Material is top-notch.',
            productQuality: 'Excellent quality and craftsmanship.',
            productValMoney: 'Definitely worth the money.',
            reviewerName: 'Clara Davies'
          }
        },
        {
          reviewId: 'review4',
          review: {
            productFeedback: 'Not satisfied with the product.',
            productFitting: 'Runs small, ordered a size up.',
            productMaterial: 'Material feels flimsy.',
            productQuality: 'Below average quality.',
            productValMoney: 'Not a good value for the price.',
            reviewerName: 'David Lee'
          }
        }
      ]
      );

    
      

    useEffect(() => {
        // db.collection('users').doc(currentUser.uid).collection('surveyResults').doc(productId).collection('reviews')
        // .onSnapshot((snapshot) => 
        //     setReviews(snapshot.docs.map((doc) => ({
        //         ReviewId: doc.id,
        //         review: doc.data()
        //     })))
        // );
    // eslint-disable-next-line
    }, [])

    return (
        <div className="checkout">
            <div className="sidebar__chats">
    
            <div>
                <h2 className="checkout__title">Product Reviews</h2>
                {reviews.map(({ reviewId, review }) => (
                    <ProductReview 
                        key = {reviewId}
                        id = {reviewId}
                        feedback = {review.productFeedback}
                        fitting = {review.productFitting}
                        material = {review.productMaterial}
                        quality = {review.productQuality}
                        valMoney = {review.productValMoney}
                        reviewer = {review.reviewerName}
                    />
                ))}
            </div>
            </div>
        </div>
    )
}

export default ProductReviews
