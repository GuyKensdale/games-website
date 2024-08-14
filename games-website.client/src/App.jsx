import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Submit from './Submit.jsx';
import Home from './homepage.jsx';
import AddPlayer from './Appplayer.jsx';


function App() {
   
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/submit" element={<Submit />} />
                <Route path="/addplayer" element={<AddPlayer/> }/>
            </Routes>
        </Router>
    );
}

export default App;
