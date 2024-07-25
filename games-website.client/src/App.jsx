import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';


let navigate = useNavigate();
const routeChange = () => {
    let path = `submit`;
    navigate(submit);
}
function App() {
    function submitButtonPress() {
        console.log('hello world')
    }
    return (
        <div>
            <h1 id="tabelLabel">Saturday Games League</h1>
            <h2>Current scores</h2>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Points</th>
                </tr>
                <tr>
                    <td>Anom</td>
                    <td>19</td>
                </tr>
                <tr>
                    <td>Megha</td>
                    <td>19</td>
                </tr>
                <tr>
                    <td>Subham</td>
                    <td>25</td>
                </tr>
            </table>
            <button className="submitButton" onClick={submitButtonPress()}>Submit results</button>
            
            <h3>Money towards next game!</h3>
            <p>£££</p>
            
        </div>
    );
}

export default App;