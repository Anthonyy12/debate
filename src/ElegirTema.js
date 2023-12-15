import React from 'react';
import { Link } from 'react-router-dom';
import TemaCard from './TemaCard';
import { Button } from '@mui/material';

const ElegirTema = () => {
  const temas = [
    {
      titulo: 'Fortnite Forum',
      descripcion: 'Sumérgete en el vibrante universo de Fortnite en este foro dedicado al popular juego de batalla real. Comparte estrategias, consejos de construcción y las últimas novedades sobre eventos y skins. Únete a la comunidad para discutir tácticas, intercambiar experiencias y conectarte con jugadores apasionados de Fortnite de todo el mundo.',
      imagen: 'https://cdn2.unrealengine.com/blade-2560x1440-2560x1440-d4e556fb8166.jpg',
      ruta: '/tema1',
    },
    {
      titulo: 'Rocket League Forum',
      descripcion: 'Comparte tus mejores jugadas, busca compañeros de equipo, y discute las últimas actualizaciones y expansiones. Conéctate con una comunidad dedicada que comparte tu amor por los coches propulsados por cohetes y las emocionantes partidas de fútbol aéreo.',
      imagen: 'https://rocketleague.media.zestyio.com/Puma_Art_90v2j0_hv89327.jpg?width=1920&optimize=high',
      ruta: '/tema2',
    },
    {
      titulo: 'Call of Duty: MW3 Forum',
      descripcion: 'Comparte anécdotas de épicas batallas en el modo multijugador, discute estrategias en el modo campaña y encuentra compañeros de equipo para enfrentarte a desafíos cooperativos. Únete a la comunidad para recordar los momentos icónicos de MW3 y estar al tanto de cualquier noticia relacionada con este clásico de los juegos de disparos.',
      imagen: 'https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/mw3/meta/reveal/jpt-reveal-meta.jpg',
      ruta: '/tema3',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: '20px' }}>
      <h2>Elige un Tema</h2>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        {temas.map((tema, index) => (
          <TemaCard
            key={index}
            titulo={tema.titulo}
            descripcion={tema.descripcion}
            imagen={tema.imagen}
            ruta={tema.ruta}
          />
        ))}
      </div>
      <Link to="/">
        <Button variant='contained' color="secondary" style={{ marginTop: '20px' }}>Regresar a Ingresar Usuario</Button>
      </Link>
    </div>
  );
};

export default ElegirTema;
