import React from 'react';
import '../../css/SidebarSocial.css';
import SidebarRow from './SidebarRow';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
// import {useAuth} from '../../contexts/AuthContext';
import goToChat from '../Header';
import goToHome from '../Header';
import goToMyBasket from '../Header';
import { Link } from 'react-router-dom';

function Sidebar() {
    // const {currentUser} = useAuth();
    const currentUser = {
        photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    displayName: 'John Doe'
    }
    const history = useNavigate();

    const goToUsers = () => {
        let path = `/users`;
        history(path);
    }
    return (
        <div className="sidebar__social">
            <Link to="/dashboard" style={{textDecoration: "none"}}>
                <SidebarRow src={currentUser.photoURL} title={currentUser.displayName} />
            </Link>
            <Link to="/" style={{textDecoration: "none"}}>
            <SidebarRow Icon={HomeIcon} title="Home" onClick={goToHome}/>
            </Link>
            <Link to="/users" style={{textDecoration: "none"}}>
            <SidebarRow Icon={PeopleIcon} title="Users" onClick={goToUsers}/>
            </Link>
            <Link to="/chat" style={{textDecoration: "none"}}>
            <SidebarRow Icon={ChatIcon} title="Chat" onClick={goToChat}/>
            </Link>
            <Link to="/checkout" style={{textDecoration: "none"}}>
            <SidebarRow Icon={ShoppingBasketIcon} title="My Basket" onClick={goToMyBasket}/>
            </Link>
            <SidebarRow Icon={ExpandMoreOutlinedIcon} title="More" />
        </div>
    )
}

export default Sidebar
