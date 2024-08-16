import { push, ref } from 'firebase/database';
import { useState } from 'react';
import { database, set } from './index.js';
import { useNavigate } from 'react-router-dom'; 

function AddPlayer() {
    const [title, setTitle] = useState("");
    const navigate = useNavigate(); 

    const handleAddDate = () => {
        try {
            const usersRef = ref(database, 'users');
            const newDataRef = push(usersRef);

            set(newDataRef, {
                title: title,
                points: 0
            }).then(() => {
                setTitle("");
                alert('Data added successfully!!');
            }).catch((error) => {
                console.log('Firebase error!', error);
            });
        } catch (error) {
            console.log('Firebase error!', error);
        }
    };

    const handleGoHome = () => {
        navigate('/'); 
    };

    return (
        <div>
            <h1 id="tableLabel">Saturday Games League</h1>
            <h2>Add new players</h2>
            <input
                type='text'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleAddDate}>Add player</button>
            <br />
            <button onClick={handleGoHome}>Return to Homepage</button>
        </div>
    );
}

export default AddPlayer;
