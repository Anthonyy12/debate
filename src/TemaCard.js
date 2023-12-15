import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const TemaCard = ({ titulo, descripcion, imagen, ruta }) => {
  return (
    <Card sx={{ maxWidth: 345, width: '100%', margin: '10px auto', textAlign: 'center' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={imagen}
        title={`Imagen de ${titulo}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {descripcion}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={ruta} size="small">
          Seleccionar
        </Button>
      </CardActions>
    </Card>
  );
};

export default TemaCard;
