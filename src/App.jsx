import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Connexion from './pages/Connexion.jsx'
import Inscription from './pages/Inscription.jsx'
import Recherche from './pages/Recherche.jsx'
import Publier from './pages/Publier.jsx'
import AnnonceDetail from './pages/AnnonceDetail.jsx'
import Admin from './pages/Admin.jsx'
import Profile from './pages/Profile.jsx'
import { ProtectedRoute, AdminRoute } from './routes/Guards.jsx'

import CursorTrail from './components/CursorTrail.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <CursorTrail count={20} size={26} color="#ffffff" lerp={0.3} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/recherche" element={<Recherche />} />
        <Route path="/publier" element={<ProtectedRoute><Publier /></ProtectedRoute>} />
        <Route path="/annonce/:id" element={<AnnonceDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
