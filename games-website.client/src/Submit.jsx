import React from 'react';
import { push, ref } from 'firebase/database'
import { useState, } from 'react'
import { database, set } from './index.js'

function SubmitPage() {
    const [title, setTitle] = useState("");
    const handleAddDate = () => {
        try {
            const usersRef = ref(database, 'users')
            const newDataRef = push(usersRef);

          set(newDataRef, {
                title: title,
            });
            setTitle("");
            alert('Data added successfully!!');
        } catch (error) {
            console.log('firebase eror!', error)
        }
    }
    return (
        <div>
            <h1 id="tabelLabel">Saturday Games League</h1>
            <h2>Add new players </h2>
            <input
                type='text'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}></input>
            <button onClick={handleAddDate}>Add player</button>
            <h3>Money towards next game!</h3>
            <p>£££</p>

        </div>
    );
}

export default SubmitPage;