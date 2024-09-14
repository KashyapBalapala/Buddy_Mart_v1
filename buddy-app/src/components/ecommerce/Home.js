import React, { useState, useEffect, useCallback } from "react";
import "../../css/Home.css";
// import Product from "./Product.js";
// import {useAuth} from '../../contexts/AuthContext';
import Header from "../Header.js";
import Product from "./Product.js";
import { httpGetAllProducts } from "../../services/facade.service.js";
// import db from '../../firebase';

function Home() {
    // const {currentUser} = useAuth();
    const [length, setLength] = useState(0);
    const [requests, setRequests] = useState(0); 
    const [currentUser, setCurrentUser] = useState(0);
    const [products, setProducts] = useState([]);

    // setLength(2);
    // useEffect(() => {
    //     if (currentUser) {
    //         db.collection("users").doc(currentUser.uid).get().then(docc => {
    //             const data = docc.data();
    //             setLength(data.noItems);
    //         })
    //         db.collection("users").doc(currentUser.uid).collection("friendRequests").get().then(snapshot => {
    //           setRequests(snapshot.size);
    //       })
    //     }
    // })

    useEffect(() => {
        console.log('Component mounted or updated');
        return () => console.log('Component unmounted');
    }, []);
    

    const getProducts = useCallback(async () => {
        const fetchedProducts = await httpGetAllProducts();
        setProducts(fetchedProducts);
    }, [])

    useEffect(() => {
        console.log('Effect triggered');
        getProducts();
    }, [getProducts]);

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    }

    const rows = chunkArray(products, 3);

    return (
        <div>
        <Header length={length} noRequests={requests}/>
        <div className="home">
        <div className="home_container">
            <img
            className="home_image"
            src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/4/4/7ab2bdef-5673-4cf5-a308-61ca66f4bd871617537128691-AAY_Desk_Banner.jpg"
            alt=""
            />

            <div>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="home_row row">
                {row.map(product => (
                    <Product
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        rating={product.rating}
                        image={product.image}
                        quantity={product.quantity}
                        userId={currentUser.uid}
                        setLength = {setLength}
                    />
                ))}
                </div>
            ))}
            </div>

            {/* <div className="home_row row">
            <Product
                id="12321341"
                title="H&M Summer Long Dress, Easy to maintain and comfortable to carry"
                price={1999}
                rating={5}
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxaXnUdilhYcwlS_xbsMktRgMEhJWah0RaPA&usqp=CAU"
                quantity={0}
                userId={currentUser.uid}
                setLength = {setLength}
            />
            <Product
                id="49538094"
                title="Tokyo Talkies Green Solid A line Dress, perfect for nightouts and parties"
                price={1299}
                rating={4}
                image="https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/30192022/2024/JULY/12/4jbHvB5L_c049745a6962467fb15c8fc94dd1a782.jpg"
                quantity={0}
                userId={currentUser.uid}
                setLength = {setLength}
            />
            <Product
                id="4903850"
                title="Libas White Kurta set, embroidered kurta with comforatable matchin trouser"
                price={999}
                rating={3}
                image="https://images-na.ssl-images-amazon.com/images/I/61SFGwq262L._UY550_.jpg"
                quantity={0}
                userId={currentUser.uid}
                setLength = {setLength}
            />
            </div>
            <div className="home_row row">
            <Product
                id="123213411"
                title="Maniac Men's Full sleeve Round Neck Printed Navy Cotton T shirt"
                price={1499}
                rating={5}
                image="https://guysworld.in/wp-content/uploads/2019/03/910wbkVL4vL._UL1500_.jpg"
                quantity={0}
                userId={currentUser.uid}
                setLength = {setLength}
            />
            <Product
                id="495380941"
                title="Classic Dotted Pattern Cotton Leisure Mens Shirt, Blue Coloured"
                price={899}
                rating={4}
                image="https://assetscdn1.paytm.com/images/catalog/product/A/AP/APPDEZANO-MEN-BDEZA115490847DEEC85/1608742345930_0..jpg?imwidth=282&impolicy=hq"
                quantity={0}
                userId={currentUser.uid}
                setLength = {setLength}
            />
            <Product
                id="49038501"
                title="Monte Carlo Yellow Full Sleeved T-Shirt Perfect for Casual Wear"
                price={799}
                rating={3}
                image="https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/23920800/2023/10/30/750ac894-5cd9-4889-b292-cf61e1cbebce1698665823985-Monte-Carlo-Men-Sweaters-2891698665823697-1.jpg"
                quantity={0}
                userId={currentUser.uid}
                setLength = {setLength}
            />
            </div>
            <div className="home_row row">
            <Product
                id="23445930"
                title="Women Extra Stretch Black Panther Sports Wear, sweat-proof, high durability and low maintanence"
                price={1999}
                rating={5}
                image="https://n3.sdlcdn.com/imgs/j/i/r/CHKOKKO-Women-Active-Wear-Yoga-SDL158692533-1-59f69.jpeg"
                quantity={0}
                userId={currentUser.uid}
                setLength = {setLength}
            />
            <Product
                id="3254354345"
                title="Raymond Formal Dress, Fine Stitch and supreme quality"
                price={999}
                rating={4}
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKtgCEq3fC9ikBrxoqE7ynHSbl33GAWUnKkw&usqp=CAU"
                quantity={0}
                userId={currentUser.uid}
                setLength = {setLength}
            />
            <Product
                id="90829332"
                title="Women Flared Jeans by levis, Awesome fit and great comfort" 
                price={2499}
                rating={4}
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFGHrlJxvbThcm9ReqK98a3BQ5sOuz89kcw&usqp=CAU  "
                quantity={0}
                userId={currentUser.uid}
                setLength = {setLength}
            />
            </div>
            <div className="home_row row">
            <Product
                id="234459301"
                title="Premium Quality Leather Navy Blue Four Pocket Jacket, Lightweight"
                price={2599}
                rating={5}
                image="https://thumbs.dreamstime.com/b/fashion-clothes-short-sleeve-shirt-jacket-jeans-mens-photos-made-white-background-fashion-clothes-short-sleeve-shirt-jacket-148909681.jpg"
                quantity={0}
                userId={currentUser.uid}
                setLength = {setLength}
            />
            <Product
                id="32543543451"
                title="Deca Dev Mens Long Sleeve Autumn Winter Casual Sweatshirt"
                price={1099}
                rating={4}
                image="https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/19836760/2022/9/26/a3e7d7fc-17d6-4e4f-a49a-80d191c603bf1664184914793DennisLingoMenKhakiHoodedSweatshirt1.jpg"
                quantity={0}
                userId={currentUser.uid}
                setLength = {setLength}
            />
            <Product
                id="908293321"
                title="Peter England Formal Set for Meeting, Formal dinners and Important events"
                price={2199}
                rating={4}
                image="https://static.toiimg.com/photo/msid-80789269,resizemode-4/80789269.cms"
                quantity={0}
                userId={currentUser.uid}
                setLength = {setLength}
            />
            </div> */}
            
        </div>
        </div>
        </div>
    );
}

export default Home;