import React, { useEffect, useState } from 'react';
import {  Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axiosClient';

import Cliente from './Cliente'

const Clientes = () => {

  //Clientes es el estado
  //set clientes es la funcion para actualizar clientes
  const [clientes, setCliente] = useState([]);

  const getClientes = async () => {
    const response = await axiosClient.get('/customers');
    console.log(response.data);

  setCliente(response.data);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Un cliente no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
       deleteCliente(id);
      }
    });
  };

  const deleteCliente = (id) => {
    axiosClient.delete(`/customers/${id}`)
    .then(res => {
      if(res.status !== 200 ) {
        Swal.fire(
          'Eliminar Cliente',
          'Error al eliminar un cliente',
          'error'
      );
      } else {
        Swal.fire(
          'Eliminar Cliente',
          res.data.message,
          'success'
      );
        getClientes();
      }
    })
  };

  useEffect(() => {
    getClientes();
  }, [])

  const renderClientes = () => {
    return (
      <tbody>
        {
          clientes.map((cliente, index) => (
            <Cliente
            key={index}
            index = {index}
            id ={cliente._id}
            name = {cliente.name}
            lastname={cliente.lastname}
            email={cliente.email}
            phone={cliente.phone}
            onDelete={handleDelete}
            />
          ))
        }
      </tbody>
    );
  };

    return (
        <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Cliente</th>
      <th scope="col">Email</th>
      <th scope="col">Telefono</th>
      <th>
      <Link to="/clientes/nuevo" 
                className="btn btn-info mr-1"
                role="button"
                aria-pressed="true"
            >
                Nuevo Cliente 
            </Link>
      </th>
    </tr>
  </thead>
  {renderClientes()}
</table>
    )
};

export default Clientes;