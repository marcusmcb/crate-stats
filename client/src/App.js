import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import SeratoPlaylistReport from './pages/PlaylistReports/Serato/SeratoPlaylistReport'
import PageSelect from './pages/PageSelect/PageSelect'
import LiveReport from './pages/LiveReport/SeratoLiveReport'
import RekordboxPlaylistReport from './pages/PlaylistReports/Rekordbox/RekordboxPlaylistReport'
import TraktorPlaylistReport from './pages/PlaylistReports/Traktor/TraktorPlaylistReport'
import Playlists from './pages/Playlists/Playlists'
import SignIn from './pages/SignIn/SignIn'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PageSelect />} />
        <Route path='/playlistreport' element={<SeratoPlaylistReport />} />
        <Route path='/livereport' element={<LiveReport />} />
        <Route path='/rekordbox' element={<RekordboxPlaylistReport />} />
        <Route path='/traktor' element={<TraktorPlaylistReport />} />
        <Route path='/playlists' element={<Playlists />} />
        <Route path='/signin' element={<SignIn/>} />
      </Routes>
    </Router>
  )
}

export default App
