import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Popup from "./components/Popup";
import MnemonicPage from "./components/MnemonicPage";
import Dashboard from "./components/Dashboard";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Popup />} />
                <Route path="/mnemonic" element={<MnemonicPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
