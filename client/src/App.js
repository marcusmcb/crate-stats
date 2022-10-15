import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CrateStats from './components/CrateStats'
import TestReport from './components/TestReport'
import PageSelect from './components/PageSelect'
import LiveReport from './components/LiveReport'

import './app.css'
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CrateStats />} />
        <Route path='/testreport' element={<TestReport />} />
        <Route path='/pageselect' element={<PageSelect />} />
        <Route path='/livereport' element={<LiveReport />} />        
      </Routes>
    </Router>
  );
}

export default App;
