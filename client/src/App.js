import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CrateStats from './components/CrateStats'
import TestReport from './components/TestReport';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CrateStats />} />
        <Route path='/testreport' element={<TestReport />} />
      </Routes>
    </Router>
  );
}

export default App;
