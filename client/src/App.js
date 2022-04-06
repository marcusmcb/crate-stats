import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CrateStats from './components/CrateStats'

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CrateStats />} />
      </Routes>
    </Router>
  );
}

export default App;
