import './App.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IngresoUsuario from './IngresoUsuario';
import ElegirTema from './ElegirTema';
import Tema1 from './components/Tema1';
import Tema2 from './components/Tema2';
import Tema3 from './components/Tema3';
import { PreguntasProvider } from './components/ListaPreguntas';

function App() {
  const [usuario, setUsuario] = useState('');

  const handleIngresarUsuario = (nombreUsuario) => {
    setUsuario(nombreUsuario);
  };

  return (
    
    <PreguntasProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<IngresoUsuario onIngresar={handleIngresarUsuario} />}
          />
          <Route path="/elegir-tema" element={<ElegirTema />} />
          <Route path="/tema1" element={<Tema1 />} />
          <Route path="/tema2" element={<Tema2 />} />
          <Route path="/tema3" element={<Tema3 />} />
        </Routes>
      </div>
    </Router>
    </PreguntasProvider>
    
  );
}

export default App;
