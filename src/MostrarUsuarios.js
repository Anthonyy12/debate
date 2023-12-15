import React from "react";

const MostrarUsuarios = ({usuarios, onRegresar}) => {
  return(
    <div>
      <h2>Lista de Usuarios que han ingresado</h2>
      <ul>
        {usuarios.map((usuario, index) => (
          <li key={index}>{usuario}</li>
        ))}
      </ul>
      <button onClick={onRegresar}>Salir</button>
    </div>
  )
}

export default MostrarUsuarios