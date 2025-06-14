import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
//import GuestRequestForm from './pages/GuestRequestForm';
import FollowUp from './pages/FollowUp';
import Archivio from './pages/Archivio';
import Login from './pages/Login';
import Statistiche from './pages/Statistiche';
import Notificatore from './components/Notificatore';

function App() {
  const isLoggedIn = localStorage.getItem('guest_service_operator');

  return (
    <HashRouter>
      <Notificatore />
      <Routes>
        {/* Login sempre accessibile */}
        <Route path="/" element={<Login />} />

        {/* Se non loggato, redirect alla login */}
        {!isLoggedIn && <Route path="*" element={<Navigate to="/" />} />}

        {/* Se loggato, accesso alle pagine */}
        {isLoggedIn && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/follow-up" element={<FollowUp />} />
            <Route path="/archivio" element={<Archivio />} />
            <Route path="/statistiche" element={<Statistiche />} />
            </>
        )}
      </Routes>
    </HashRouter>
  );
}

export default App;
