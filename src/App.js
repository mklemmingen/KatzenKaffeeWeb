import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pageModules/Header';
import Footer from './pageModules/Footer';
import Support from './pages/Support';
import Cafe from './pages/Cafe';
import LearningCorner from './pages/LearningCorner';
import Home from './pages/Home';
import Register from './pages/Register';
import Datenschutz from './pages/Datenschutz';
import Impressum from './pages/Impressum';
import ErrorPage from './pages/ErrorPage';
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
                    <Route path="/datenschutz" element={<Datenschutz />} />
                    <Route path="/impressum" element={<Impressum />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

