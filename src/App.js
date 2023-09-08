import React, { useState } from 'react'
import GanttChart from './Gantt1';
import LoginPage from './Login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './Login';

const App = () => {

  const [one, setOne] = useState(false)
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/gantt" element={<GanttChart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App


