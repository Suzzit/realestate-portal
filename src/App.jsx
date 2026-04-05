import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RegistrationForm from './pages/registration'
import LoginPage from './pages/login';
import BrowsePage from './pages/browse.jsx';
import { AuthProvider } from './Authcontext.jsx';
import Navbar from './components/navbar.jsx';
import FavouritePage from './pages/favourites.jsx';
import ProfilePage from './pages/profile.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path='/browse' element={<BrowsePage />} />
      <Route path='/favourites' element={<FavouritePage />} />
      <Route path="profile/:userId" element={<ProfilePage />} />
    </Routes>
  </BrowserRouter>
  </AuthProvider>
)
