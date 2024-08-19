import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { database, ref, get } from './index.js';


import './App.css';
function App() {

    let navigate = useNavigate();
    const [users, setUsers] = useState([]);

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
                console.log("no data avalible")
            }

        }).catch((ex) => {
            console.error(ex.message);
        })
    }, [])
    return (
        <div>
            <h1 id="tabelLabel">Saturday Games League</h1>
            <h2>Current scores</h2>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) =>
                        <tr key={user.id}>
                            <td key={user.title}>{user.title}</td>
                            <td key={user.points}>{user.points}</td>
                        </tr>
                    )}


                </tbody>
            </table>
            <button className="submitButton" onClick={() => navigate("/submit")}>
                Submit results
            </button>
            <button className="submitButton" onClick={() => navigate("/addplayer")}>
                Add New Players
            </button>
        
        </div>
    );
}

export default App;


                            //dependencies update