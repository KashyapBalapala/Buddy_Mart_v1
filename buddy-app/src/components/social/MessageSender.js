import React, { useState } from 'react'
import "../../css/MessageSender.css"
import { Avatar } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { httpCreateNewPost } from '../../services/facade.service';

function MessageSender() {
    // const {currentUser} = useAuth();
    const currentUser = {
        uid: '66e16475863b37a31b18a136',
        displayName: 'John Doe',
        photoURL: 'https://randomuser.me/api/portraits/men/1.jpg',
        email: 'john.doe@example.com'
    };
    const [input, setInput] = useState('');
    const [image, setImage] = useState('');
    const [progress, setProgress] = useState(0);
    const [confirm, setImgUploadConfirm] = useState('');

    const uploadFileWithClick = () => {
        document.getElementsByClassName('messageSender__imageFile')[0].click()
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (image) {
            const post = {
                content: input,
                userId: currentUser.uid,
                image: image
            };
            httpCreateNewPost(post);
        } else {
            const post = {
                content: input,
                userId: currentUser.uid,
            };
            httpCreateNewPost(post);
        }

        setInput("");
        setImgUploadConfirm('');
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            setImgUploadConfirm('Image is added and will be displayed after posting!');
        }
    }

    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <Avatar src={currentUser.photoURL} />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} className="messageSender__input" placeholder={`What's on your mind `+ currentUser.displayName + `?`} />
                    <button onClick={handleSubmit} type="submit">
                        Hidden Submit
                    </button>
                    <h4>{confirm}</h4>
                </form>
            </div>
            <progress value={progress} max="100" className={`messageSender__progress ${progress && 'show'}`} />
            <div className="messageSender__bottom">
                <div className="messageSender__option">
                    <VideocamIcon style={{ color: "red" }} />
                    <h4 style={{color:"black"}}>Live Video</h4>
                </div>
                <div className="messageSender__option" onClick={uploadFileWithClick}>
                    <PhotoLibraryIcon style={{ color: "green" }} />
                    <input type="file" className="messageSender__imageFile" onChange={handleChange} />
                    <h4 style={{color:"black"}}>Photo/Video</h4>
                </div>
                <div className="messageSender__option">
                    <InsertEmoticonIcon style={{ color: "orange" }} />
                    <h4 style={{color:"black"}}>Feeling/Activity</h4>
                </div>
            </div>
        </div>
    )
}

export default MessageSender
