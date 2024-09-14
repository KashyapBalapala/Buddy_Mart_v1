import React, { useState } from 'react';
import '../css/HeaderSocial.css';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddIcon from '@mui/icons-material/Add';
import ForumIcon from '@mui/icons-material/Forum';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';
import small_logo from '../assets/Black_Small_Logo.png';

function Header({ length, noRequests }) {
    const [tooltipOpen, setTooltipOpen] = useState({
        imageHome: false,
        home: false,
        social: false,
        users: false,
        sharedBasket: false,
        basket: false,
        surveyResults: false,
        notifications: false,
        chat: false,
        logOut: false,
    });

    const navigate = useNavigate();
    const currentUser = {
        photoURL: '',
        displayName: 'B Kashyap',
    };

    const toggleTooltip = (tooltipName) => () => {
        setTooltipOpen((prevState) => ({
            ...prevState,
            [tooltipName]: !prevState[tooltipName],
        }));
    };

    const handleSubmit = async () => {
        try {
            // Assume logout is a function that performs the logout operation
            await logout();
            navigate('/login');
        } catch {
            alert('Failed to log out');
        }
    };

    const logout = () => {
        return true; // Simulating successful logout
    };

    const goTo = (path) => () => {
        navigate(path);
    };

    return (
        <div className="header__social">
            <div className="header__left">
                <Tooltip title="Home" placement='bottom' open={tooltipOpen.imageHome} onMouseEnter={toggleTooltip('imageHome')} onMouseLeave={toggleTooltip('imageHome')}>
                    <img
                        src={small_logo}
                        alt="famista-logo"
                        onClick={goTo('/')}
                        style={{ cursor: 'pointer', height: '10vh' }}
                    />
                </Tooltip>
                <div className="header__input">
                    <SearchIcon />
                    <input style={{ 'border-radius': '100px' }} type="text" placeholder="Search BuddyMart" />
                </div>
            </div>
            <div className="header__middle">
                <Tooltip title="Home" placement="bottom" open={tooltipOpen.home} onMouseEnter={toggleTooltip('home')} onMouseLeave={toggleTooltip('home')}>
                    <div className="header__option header__option--active" onClick={goTo('/')}>
                        <HomeIcon fontSize="large" id="home" style={{ outline: 'none' }} />
                    </div>
                </Tooltip>

                <Tooltip title="Social" placement="bottom" open={tooltipOpen.social} onMouseEnter={toggleTooltip('social')} onMouseLeave={toggleTooltip('social')}>
                    <div className="header__option" onClick={goTo('/social')}>
                        <StorefrontOutlinedIcon fontSize="large" id="social" style={{ outline: 'none' }} />
                    </div>
                </Tooltip>

                <Tooltip title="Your Basket" placement="bottom" open={tooltipOpen.basket} onMouseEnter={toggleTooltip('basket')} onMouseLeave={toggleTooltip('basket')}>
                    <div className="header__option" onClick={goTo('/checkout')}>
                        <ShoppingBasketIcon fontSize="large" id="basket" style={{ outline: 'none' }} />
                        <span className="header_optionLineTwo header_basketCount">{length}</span>
                    </div>
                </Tooltip>

                <Tooltip title="Shared Basket" placement="bottom" open={tooltipOpen.sharedBasket} onMouseEnter={toggleTooltip('sharedBasket')} onMouseLeave={toggleTooltip('sharedBasket')}>
                    <div className="header__option" onClick={goTo('/baskets')}>
                        <img
                            src="https://img.icons8.com/material/80/000000/favorite-cart.png"
                            id="sharedBasket"
                            style={{ height: 32, width: 32, filter: 'brightness(0) invert(1)', outline: 'none' }}
                            alt="shared basket icon"
                        />
                    </div>
                </Tooltip>

                <Tooltip title="Users" placement="bottom" open={tooltipOpen.users} onMouseEnter={toggleTooltip('users')} onMouseLeave={toggleTooltip('users')}>
                    <div className="header__option" onClick={goTo('/users')}>
                        <SupervisedUserCircleIcon fontSize="large" id="users" style={{ outline: 'none' }} />
                    </div>
                </Tooltip>

                <Tooltip title="Survey Results" placement="bottom" open={tooltipOpen.surveyResults} onMouseEnter={toggleTooltip('surveyResults')} onMouseLeave={toggleTooltip('surveyResults')}>
                    <div className="header__option header__option--active" onClick={goTo('/surveyResults')}>
                        <AssignmentIcon fontSize="large" id="surveyResult" style={{ outline: 'none' }} />
                    </div>
                </Tooltip>
            </div>
            <div className="header__right">
                <div className="header__info">
                    <button
                        onClick={goTo('/dashboard')}
                        style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                    >
                        <Avatar src={currentUser.photoURL} />
                    </button>
                    <button
                        onClick={goTo('/dashboard')}
                        style={{ backgroundColor: 'transparent', border: 'none', color: 'black', cursor: 'pointer' }}
                    >
                        {currentUser.displayName}
                    </button>
                </div>
                <IconButton>
                    <div className="header__option2">
                        <AddIcon />
                    </div>
                </IconButton>
                <Tooltip title="Chat" placement="bottom" open={tooltipOpen.chat} onMouseEnter={toggleTooltip('chat')} onMouseLeave={toggleTooltip('chat')}>
                    <IconButton onClick={goTo('/chat')}>
                        <div className="header__option2">
                            <ForumIcon id="chat" style={{ outline: 'none' }} />
                        </div>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Friend Requests" placement="bottom" open={tooltipOpen.notifications} onMouseEnter={toggleTooltip('notifications')} onMouseLeave={toggleTooltip('notifications')}>
                    <IconButton onClick={goTo('/requests')}>
                        <div className="header__option2">
                            <NotificationsActiveIcon id="requests" style={{ outline: 'none' }} />
                            <sup>
                                <span
                                    style={{ fontSize: '12px', marginLeft: 0 }}
                                    className="header_optionLineTwo header_basketCount"
                                >
                                    {noRequests}
                                </span>
                            </sup>
                        </div>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Log Out" placement="bottom" open={tooltipOpen.logOut} onMouseEnter={toggleTooltip('logOut')} onMouseLeave={toggleTooltip('logOut')}>
                    <IconButton onClick={handleSubmit}>
                        <div className="header__option2">
                            <ExitToAppIcon id="logOut" style={{ outline: 'none' }} />
                        </div>
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}

export default Header;
