import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CrateStats from './pages/CrateStats'
import PlaylistReport from './pages/PlaylistReport'
import PageSelect from './pages/PageSelect'
import LiveReport from './pages/LiveReport'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PageSelect />} />
        <Route path='/playlistreport' element={<PlaylistReport />} />        
        <Route path='/livereport' element={<LiveReport />} />        
      </Routes>
    </Router>
  );
}

export default App;
