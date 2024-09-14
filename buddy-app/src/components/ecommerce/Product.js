import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import ShareIcon from '@mui/icons-material/Share';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IconButton, Tooltip } from '@mui/material';
import ReviewsIcon from '@mui/icons-material/Reviews';
import '../../css/Product.css';
// import ShareProductModal from './ShareProductModal';

function Product({id, title, price, rating, image, quantity, userId, setLength}) {

    const [ tooltipOpen, setTooltipOpen ] = useState({
        rating: false,
        share: false,
        addToCart: false,
        review: false
    }); 

    

    function toolTipToggle(toolTipName) {
        setTooltipOpen((prevState) => ({
            ...prevState,
            [toolTipName]: !prevState[toolTipName]
        }))
    }

    return(
        <div className='product_main'>
            <div>
                <h4>{title}</h4>
                <div className="price_rating_container">
                    <p><small>₹</small> <strong>{price}</strong></p>
                    <Rating name="read-only" value={rating} readOnly />
                </div>

            </div>
            <div>
                <img className="product_image" src={image} alt={title} style={{ width: '140px', height: '140px'}} />
            </div>
            <div className='product_bottom'>
                <div>
                    <Tooltip title="Share" placement='bottom' open={tooltipOpen.rating} onMouseEnter={() => toolTipToggle('rating')} onMouseLeave={() => toolTipToggle('rating')} >
                        <IconButton>
                            <ShareIcon fontSize="large" id="share_icon" style={{ outline: 'none' }} />
                        </IconButton>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title="Add To Cart" placement='bottom' open={tooltipOpen.share} onMouseEnter={() => toolTipToggle('share')} onMouseLeave={() => toolTipToggle('share')} >
                        <IconButton>
                            <AddShoppingCartIcon fontSize="large" id="add_to_cart" style={{ outline: 'none' }} />
                        </IconButton>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title="Review" placement='bottom' open={tooltipOpen.review} onMouseEnter={() => toolTipToggle('review')} onMouseLeave={() => toolTipToggle('review')} >
                        <IconButton>
                            <ReviewsIcon fontSize="large" id="share_icon" style={{ outline: 'none' }} />
                        </IconButton>
                    </Tooltip>
                </div>
                {/* <ShareProductModal show={show} handleClose={hideModal} image={image} id={id} title={title} userid={currentUser.uid}>
                    <p>Modal</p>
                    <Tooltip placement="bottom-end" isOpen={tooltipOpenProductReview} target={`productreview${id}`} toggle={toggleProdutcReview}>
                        
                    </Tooltip>
                </ShareProductModal> */}
            </div>
        </div>
    )
}

export default Product;