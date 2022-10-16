import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CrateStats from './components/CrateStats'
import TestReport from './components/TestReport'
import PageSelect from './components/PageSelect'
import LiveReport from './components/LiveReport'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
