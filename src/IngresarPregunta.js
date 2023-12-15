import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const IngresarPregunta = ({ usuario, onAgregarPregunta }) => {
  const [pregunta, setPregunta] = useState('');

  const handleInputChange = (e) => {
    setPregunta(e.target.value);
  };

  const handleAgregarPregunta = () => {
    const fechaCreacion = new Date();
    onAgregarPregunta({
      usuario,
      pregunta,
      fechaCreacion,
    });

    // Limpia el input después de agregar la pregunta
    setPregunta('');
  };

  return (
    <div>
      <h2>Agregar Pregunta</h2>
      <TextField
        label="Pregunta"
        variant="outlined"
        value={pregunta}
        onChange={handleInputChange}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <Button variant="contained" onClick={handleAgregarPregunta}>
        Agregar Pregunta
      </Button>
    </div>
  );
};

export default IngresarPregunta;