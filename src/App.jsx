import './App.css'

import Navbar from './components/navbar/navbar';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './UserContext';

import Inicio from './screens/inicio/inicio';
import Associados from './screens/associados/associados';
import Eventos from './screens/eventos/eventos';
import Municipios from './screens/municipios/municipios';
import Atrativos from './screens/atrativos/atrativos';
import Evento from './screens/evento/evento';
import Associado from './screens/associado/associado';
import Municipio from './screens/municipio/municipio';
import Atrativo from './screens/atrativo/atrativo';

function App() {

  return (
    <div className="App">
      
    <BrowserRouter>
    <UserProvider>
      <Navbar/>
      <main>
      <Routes>
        <Route path='/' element={<Inicio/>}/>
        <Route path='/inicio' element={<Inicio/>}/>
        <Route path='/associados' element={<Associados/>}/>
        <Route path='/eventos' element={<Eventos/>}/>
        <Route path='/municipios' element={<Municipios/>}/>
        <Route path='/atrativos' element={<Atrativos/>}/>
        <Route path='/evento/:id' element={<Evento/>}/>
        <Route path='/associado/:id' element={<Associado/>}/>
        <Route path='/municipio/:id' element={<Municipio/>}/>
        <Route path='/atrativo/:id' element={<Atrativo/>}/>
      </Routes>
      </main>
    </UserProvider>
    </BrowserRouter>
    </div>
  )
}

export default App