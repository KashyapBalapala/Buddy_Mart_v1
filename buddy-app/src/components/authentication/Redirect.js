import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '../ecommerce/Home';

const Redirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const user = params.get('user');
        
        if (user) {
            localStorage.setItem('user', user);
            console.log('User data stored in session storage:', user);
        }
        navigate('/');  
  }, [navigate]);
    // useEffect(() => {
    //     // Check for user data in the URL and store it in localStorage
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const userData = urlParams.get('user');
        
    //     if (userData) {
    //       // Store user data in localStorage
    //       localStorage.setItem('user', userData);
          
    //       // Redirect to the home page or dashboard
    //       navigate('/');
    //     }
        
    //     // If already logged in, redirect to dashboard
    //     const isUserLoggedIn = localStorage.getItem('user');
    //     if (isUserLoggedIn) {
    //       navigate('/');
    //     }
    //   }, [navigate]);

      // return <Home />;
};

export default Redirect;