import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import App from './Homepage/App';
import Play from './Game/Play';
import Game from './Game/Games';
import Create from './ImageHandler/Mint';

function Jigsaw() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/games/:id" element={<Play />} />
                <Route path="/games" element={<Game />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </Router>
    )
}

export default Jigsaw;