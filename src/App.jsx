import './App.css'

import Navbar from './components/navbar/navbar';

import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './UserContext';
import AnimatedRoutes from './animatedRoutes';
import CityFilter from './components/cityFilter/cityFilter';

function App() {

  // Para colocar o site em manutenção, enquanto está sendo desenvolvido
  const maintenance = false

  if (maintenance) {
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
          <Navbar />
          <main>
            <CityFilter />
            <AnimatedRoutes />
          </main>
        </UserProvider>
      </BrowserRouter>

    </div>
  )
}

export default App