// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Navbar from './components/navbar/navbar';
import CityFilter from './components/cityFilter/cityFilter';
import Inicio from './screens/inicio/inicio';
import Associados from './screens/associados/associados';
import Eventos from './screens/eventos/eventos';
import Municipios from './screens/municipios/municipios';
import Atrativos from './screens/atrativos/atrativos';
import Evento from './screens/evento/evento';
import Associado from './screens/associado/associado';
import Municipio from './screens/municipio/municipio';
import Atrativo from './screens/atrativo/atrativo';
import SplashScreen from './components/splashScreen/splashScreen';
import './App.css';
import OfflineScreen from './components/offlineScreen/offlineScreen';

function App() {
  const maintenance = false;
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplashScreen(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (maintenance) {
    return (
      <div className="App">
        <h1>Site is under maintenance</h1>
        <p>Please come back later</p>
      </div>
    );
  }

  if(!isOnline){
    return <OfflineScreen/>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <Navbar />
          <main style={{ position: 'relative' }}>
            <CityFilter />
            {showSplashScreen && <SplashScreen />}
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/associados" element={<Associados />} />
              <Route path="/eventos" element={<Eventos />} />
              <Route path="/municipios" element={<Municipios />} />
              <Route path="/atrativos" element={<Atrativos />} />
              <Route path="/evento/:id" element={<Evento />} />
              <Route path="/associado/:id" element={<Associado />} />
              <Route path="/municipio/:id" element={<Municipio />} />
              <Route path="/atrativo/:id" element={<Atrativo />} />
            </Routes>
          </main>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
