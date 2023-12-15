import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const IngresoUsuario = ({ onIngresar }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setNombreUsuario(e.target.value);
  };

  const handleIngresar = () => {
    onIngresar(nombreUsuario);
    localStorage.setItem('nombreUsuario', nombreUsuario)
    // Recuperar la lista actual de usuarios del LocalStorage
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Agregar el nuevo usuario a la lista
    const nuevaListaUsuarios = [...usuariosGuardados, nombreUsuario];

    // Guardar la nueva lista de usuarios en el LocalStorage
    localStorage.setItem('usuarios', JSON.stringify(nuevaListaUsuarios));

    // Redirigir a la pantalla de elección de tema
    navigate('/elegir-tema');
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '300px', margin: '0 auto' }}>
      <h2>Ingresar nombre de usuario</h2>
      <TextField
        label="Nombre de usuario"
        variant="outlined"
        value={nombreUsuario}
        onChange={handleInputChange}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <Button
        variant="contained"
        onClick={handleIngresar}
        style={{ width: '100%' }}
      >
        Ingresar
      </Button>
    </div>
  );
};

export default IngresoUsuario;
