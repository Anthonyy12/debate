import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Respuestas = ({ pregunta }) => {
  const [nuevaRespuesta, setNuevaRespuesta] = useState('');
  const [respuestas, setRespuestas] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    // Obtener el nombre de usuario desde el localStorage
    const usuarioGuardado = localStorage.getItem('nombreUsuario') || 'Usuario Anónimo';
    setNombreUsuario(usuarioGuardado);
  }, []);

  const handleAgregarRespuesta = () => {
    if (nuevaRespuesta.trim() !== '') {
      const respuesta = {
        contenido: nuevaRespuesta,
        usuario: nombreUsuario,
        fechaCreacion: new Date(),
      };

      setRespuestas([...respuestas, respuesta]);
      setNuevaRespuesta('');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Respuestas:</h3>
      <ul>
        {respuestas.map((respuesta, index) => (
          <li key={index}>
            <p>{respuesta.usuario} - Respuesta: {respuesta.contenido} - Fecha: {respuesta.fechaCreacion.toLocaleString()}</p>
            <hr />
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          label="Nueva Respuesta"
          variant="outlined"
          value={nuevaRespuesta}
          onChange={(e) => setNuevaRespuesta(e.target.value)}
          style={{ marginBottom: '10px', width: '300px' }}
        />
        <Button
          variant="contained"
          onClick={handleAgregarRespuesta}
        >
          Enviar Respuesta
        </Button>
      </div>
    </div>
  )
};

export default Respuestas;
