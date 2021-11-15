import React from 'react';
import WorkersPage from './Components/WorkersPage';
import ProfilePage from './Components/ProfilePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<WorkersPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
