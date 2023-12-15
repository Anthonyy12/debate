import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const PreguntasTema = ({ usuario, tema, onAgregarPregunta }) => {
  const [nuevaPregunta, setNuevaPregunta] = useState('');

  const handleInputChange = (e) => {
    setNuevaPregunta(e.target.value);
  };

  const handleAgregarNuevaPregunta = () => {
    if (nuevaPregunta.trim() === '') {
      // Evitar agregar preguntas vacías
      return;
    }

    const nuevaPreguntaObj = {
      pregunta: nuevaPregunta,
      usuario: usuario,
      fechaCreacion: new Date(),
    };

    onAgregarPregunta(tema, nuevaPreguntaObj);
    setNuevaPregunta('');
  };

  return (
    <div>
      <h3>Agregar Pregunta para {tema}</h3>
      <TextField
        label="Ingresa tu pregunta"
        variant="outlined"
        value={nuevaPregunta}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" onClick={handleAgregarNuevaPregunta}>
        Agregar Pregunta
      </Button>
    </div>
  );
};

export default PreguntasTema;