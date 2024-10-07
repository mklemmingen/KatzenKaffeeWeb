import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer'; // Assuming you have a Footer component
import Support from './Support'; // Your Support page component
import Cafe from './Cafe'; // Your Cafe page component
import LearningCorner from './LearningCorner'; // Your Learning Corner page component
import Home from './Home'; // Assuming you have a Home component
import Register from './Register';
import './App.css'

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/support" element={<Support />} />
                    <Route path="/cafe" element={<Cafe />} />
                    <Route path="/learning-corner" element={<LearningCorner />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

