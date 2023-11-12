import './App.css'

import Navbar from './components/navbar/navbar';

import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './UserContext';
import AnimatedRoutes from './animatedRoutes';
import CityFilter from './components/cityFilter/cityFilter';

function App() {

  // Para colocar o site em manutenção, enquanto está sendo desenvolvido
  const maintenance = false

  if(maintenance){
    return (
      <div className="App">
        <h1>Site is under maintenance</h1>
        <p>Please come back later</p>
      </div>
    )
  }
  
  

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