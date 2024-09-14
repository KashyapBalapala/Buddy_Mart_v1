import React, {useState,useEffect} from 'react';
import "../../css/Sidebar.css";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Avatar, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from "./SidebarChat";
// import db from '../../firebase';
// import {useAuth} from '../../contexts/AuthContext';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [groups, setGroups] = useState([]);
    // const {currentUser} = useAuth();

    const currentUser = {
        uid: 'user123',
        displayName: 'John Doe',
        photoURL: 'https://randomuser.me/api/portraits/men/1.jpg',
        email: 'john.doe@example.com'
      };
      
    var profilePhoto = "";
    if (currentUser)
        profilePhoto = currentUser.photoURL;

    useEffect(() => {
        // db.collection("users").doc(currentUser.uid).collection("friends")
        // .onSnapshot((snapshot) => 
        //     setRooms(snapshot.docs.map((doc) => ({
        //         id: doc.id,
        //         data: doc.data()
        //     })))
        // );
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        // db.collection('rooms').where("users", "array-contains", currentUser.uid)
        // .onSnapshot((snapshot) =>
        //     setGroups(snapshot.docs.map(doc => (
        //     {
        //         groupId: doc.id,
        //         groupData: doc.data()
        //     })))
        // )
    // eslint-disable-next-line
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={profilePhoto} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon style={{color: '#eff2f5'}} />
                    </IconButton>
                    <IconButton>
                        <ChatIcon style={{color: '#eff2f5'}} />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon style={{color: '#eff2f5'}} />
                    </IconButton>
                </div>
            </div> 
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room=> (
                    <SidebarChat key={room.id} id={room.id} name={room.data.friendName} profilePic={room.data.friendProfilePic} />
                ))}

                {groups.map(({groupId, groupData})=> (
                    <SidebarChat key={groupId} id={groupId} name={groupData.name} group={1} />
                ))}

            </div> 
        </div>
    )
}

export default Sidebar
