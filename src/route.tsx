import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import App from './Dashboard/App';
import Game from './Game/Play';
import Create from './ImageHandler/Mint';

function Jigsaw() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/game" element={<Game />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </Router>
    )
}

export default Jigsaw;