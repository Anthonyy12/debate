import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Respuestas from './Respuestas';

// Crear un contexto para las preguntas
const PreguntasContext = React.createContext();

// Proveedor de contexto para envolver la aplicación
export const PreguntasProvider = ({ children }) => {
  const [preguntas, setPreguntas] = useState([]);
  const [bloquearBoton, setBloquearBoton] = useState(false);

  // Cargar preguntas desde el LocalStorage al montar el componente
  useEffect(() => {
    const preguntasGuardadas = JSON.parse(localStorage.getItem('preguntas')) || [];
    setPreguntas(preguntasGuardadas);
  }, []);

  // Función para agregar una nueva pregunta
  const agregarPregunta = (nuevaPregunta, usuario) => {
    const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario Anónimo';
    if (nuevaPregunta.trim() !== '') {
      const pregunta = {
        contenido: nuevaPregunta,
        usuario: nombreUsuario,
        fechaCreacion: new Date(),
        respuestas: [],
      };

      // Actualizar la lista de preguntas en el estado
      setPreguntas((prevPreguntas) => [...prevPreguntas, pregunta]);
      setBloquearBoton(true);

      let tiempo = 30;
      const intervalId = setInterval(() => {
        tiempo -= 1;

        // Verificar si se cumplen las condiciones para desbloquear el botón
        const ultimaPregunta = preguntas[preguntas.length - 1];
        const respuestasMinimas = 2;

        if (
          tiempo === 0 ||
          (ultimaPregunta &&
            ultimaPregunta.respuestas.length >= respuestasMinimas)
        ) {
          setBloquearBoton(false);
          clearInterval(intervalId);
        }
      }, 1000);

      // Actualizar la lista de preguntas en el LocalStorage
      localStorage.setItem(
        'preguntas',
        JSON.stringify([...preguntas, pregunta])
      );
    }
  };

  // Función para agregar una nueva respuesta a una pregunta
  const agregarRespuesta = (preguntaIndex, nuevaRespuesta) => {
    const preguntaActualizada = { ...preguntas[preguntaIndex] };
    preguntaActualizada.respuestas.push({
      contenido: nuevaRespuesta,
      usuario: localStorage.getItem('nombreUsuario') || 'Usuario Anónimo',
      fechaCreacion: new Date(),
    });

    const preguntasActualizadas = [...preguntas];
    preguntasActualizadas[preguntaIndex] = preguntaActualizada;

    setPreguntas(preguntasActualizadas);

    // Actualizar el LocalStorage con las respuestas
    localStorage.setItem('preguntas', JSON.stringify(preguntasActualizadas));
  };

  // Función para borrar el LocalStorage y regresar a la elección de temas
  const regresarATemas = () => {
    localStorage.removeItem('preguntas');
    window.location.href = '/elegir-tema';
  };

  return (
    <PreguntasContext.Provider
      value={{ preguntas, agregarPregunta, agregarRespuesta, regresarATemas }}
    >
      {children}
    </PreguntasContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de preguntas
export const usePreguntas = () => {
  return useContext(PreguntasContext);
};

const PreguntaCard = ({ pregunta, bloquearBoton }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardContent>
        <Typography variant="h6">Usuario: {pregunta.usuario}</Typography>
        <Typography variant="body1">Pregunta: {pregunta.contenido}</Typography>
        <Typography variant="body2" color="textSecondary">
          Fecha de Creación: {pregunta.fechaCreacion.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {bloquearBoton ? 'Botón bloqueado por 30 segundos' : ''}
        </Typography>
        <Divider style={{ margin: '15px 0' }} />
        <Respuestas pregunta={pregunta} />
      </CardContent>
    </Card>
  );
};

// Componente ListaPreguntas que consume el contexto
const ListaPreguntas = () => {
  const { preguntas, agregarPregunta, regresarATemas } = usePreguntas();
  const [nuevaPregunta, setNuevaPregunta] = useState('');
  const [bloquearBoton, setBloquearBoton] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(30);

  const handleAgregarPregunta = () => {
    agregarPregunta(nuevaPregunta);
    setNuevaPregunta('');
    setBloquearBoton(true);

    let tiempo = 30;
    setTiempoRestante(tiempo);

    const intervalId = setInterval(() => {
      tiempo -= 1;
      setTiempoRestante(tiempo);

      if (tiempo === 0 || preguntas.length > 0) {
        setBloquearBoton(false);
        clearInterval(intervalId);
      }
    }, 1000);
  };

  return (
    <div>
      <h2>Lista de Preguntas</h2>
      {preguntas.map((pregunta, index) => (
        <PreguntaCard
          key={index}
          pregunta={pregunta}
          bloquearBoton={bloquearBoton}
        />
      ))}
      <div>
        <TextField
          label="Nueva Pregunta"
          variant="outlined"
          value={nuevaPregunta}
          onChange={(e) => setNuevaPregunta(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button
          variant="contained"
          onClick={handleAgregarPregunta}
          style={{ width: '100%', marginTop: '10px' }}
          disabled={bloquearBoton}
        >
          Agregar Pregunta
        </Button>
        {bloquearBoton && <p>Tiempo restante: {tiempoRestante} segundos</p>}
      </div>
      <Button
        variant="outlined"
        onClick={regresarATemas}
        style={{ marginTop: '20px' }}
      >
        Regresar a Temas
      </Button>
    </div>
  );
};

export default ListaPreguntas;
