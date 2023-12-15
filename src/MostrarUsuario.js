import React from "react";

const MostrarUsuario = ({nombreUsuario}) => {
  return(
    <div>
      <h2>Has ingresado</h2>
      <p>Usuario: {nombreUsuario}</p>
    </div>
  )
}

export default MostrarUsuario