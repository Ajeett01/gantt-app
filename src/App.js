import React, { useState } from 'react'
import GanttChart from './Gantt1';
import LoginPage from './Login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './Login';
import Navbar from './componenets/Navbar';

const App = () => {

  const [one, setOne] = useState(false)
  return (
    <div>
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/gantt" element={<GanttChart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App


