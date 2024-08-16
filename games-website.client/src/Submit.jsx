import React, { useEffect, useState } from 'react';
import { database, ref, get, set } from './index.js';
import { useNavigate } from 'react-router-dom'; 

function SubmitPage() {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([{ id: '', points: '' }]);
    const [successMessage, setSuccessMessage] = useState(''); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const usersRef = ref(database, 'users');
        get(usersRef).then((snapshot) => {
            if (snapshot.exists()) {
                const usersArray = Object.entries(snapshot.val()).map(([id, data]) => ({
                    id,
                    ...data,
                }));
                setUsers(usersArray);
            } else {
                console.log("No data available");
            }
        }).catch((ex) => {
            console.error(ex.message);
        });
    }, []);

    const handleUserChange = (index) => (event) => {
        const userId = event.target.value;
        setSelectedUsers(prevUsers => {
            const newUsers = [...prevUsers];
            newUsers[index] = { ...newUsers[index], id: userId };
            return newUsers;
        });
    };

    const handlePointsChange = (index) => (event) => {
        const points = event.target.value;
        setSelectedUsers(prevUsers => {
            const newUsers = [...prevUsers];
            newUsers[index] = { ...newUsers[index], points };
            return newUsers;
        });
    };

    const handleAddUser = () => {
        setSelectedUsers(prevUsers => [...prevUsers, { id: '', points: '' }]);
    };

    const handleSave = () => {
        const updatePromises = selectedUsers.map(selected => {
            const user = users.find(u => u.id === selected.id);
            if (user) {
                const inputPoints = parseInt(selected.points || 0, 10);
                const currentPoints = parseInt(user.points, 10);
                const updatedPoints = currentPoints + inputPoints;

                const updatedUser = { ...user, points: updatedPoints };
                const userRef = ref(database, `users/${user.id}`);
                return set(userRef, updatedUser);
            }
            return Promise.resolve(); 
        });

        Promise.all(updatePromises).then(() => {
            setSuccessMessage('Points updated successfully for all selected users!');
        }).catch((ex) => {
            console.error('Failed to update points:', ex.message);
            setSuccessMessage('Failed to update points.');
        });
    };

    const handleGoHome = () => {
        navigate('/'); 
    };

    return (
        <div>
            <h1 id="tableLabel">Saturday Games League</h1>
            <h2>Submit new results</h2>

            {selectedUsers.map((selected, index) => (
                <div key={index}>
                    <h3>Select player {index + 1}</h3>
                    <select value={selected.id} onChange={handleUserChange(index)}>
                        <option value="">Select a player</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.title}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Enter points"
                        value={selected.points}
                        onChange={handlePointsChange(index)}
                    />
                </div>
            ))}

            <button onClick={handleAddUser}>Add Another Player</button>
            <br />
            <button onClick={handleSave}>Save Points</button>

   
            {successMessage && (
                <div>
                    <p>{successMessage}</p>
                    <button onClick={handleGoHome}>Return to Homepage</button>
                    
                </div>
            )}
        </div>
    );
}

export default SubmitPage;
