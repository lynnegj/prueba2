import React, { useEffect, useState } from 'react';
import {  Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axiosClient';

import Proveedor from './Proveedor'

const Proveedores = () => {

  //Proveedores es el estado
  //set proveedores es la funcion para actualizar proveedores
  const [proveedores, setProveedor] = useState([]);

  const getProveedores = async () => {
    const response = await axiosClient.get('/providers');
    console.log(response.data);

  setProveedor(response.data);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Un proveedor no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
       deleteProveedor(id);
      }
    });
  };

  const deleteProveedor = (id) => {
    axiosClient.delete(`/providers/${id}`)
    .then(res => {
      if(res.status !== 200 ) {
        Swal.fire(
          'Eliminar proveedor',
          'Error al eliminar un proveedor',
          'error'
      );
      } else {
        Swal.fire(
          'Eliminar Proveedor',
          res.data.message,
          'success'
      );
        getProveedores();
      }
    })
  };

  useEffect(() => {
    getProveedores();
  }, [])

  const renderProveedores = () => {
    return (
      <tbody>
        {
          proveedores.map((proveedor, index) => (
            <Proveedor
            key={index}
            index = {index}
            id ={proveedor._id}
            name = {proveedor.name}
            lastname={proveedor.lastname}
            company={proveedor.company}
            address={proveedor.address}
            phone={proveedor.phone}
            email={proveedor.email}
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
      <th scope="col">Proveedor</th>
      <th scope="col">Compañia</th>
      <th scope="col">Direccion</th>
      <th scope="col">Telefono</th>
      <th scope="col">Email</th>

      <th>
      <Link to="/proveedores/nuevo" 
                className="btn btn-info mr-1"
                role="button"
                aria-pressed="true"
            >
                Nuevo Proveedor 
            </Link>
      </th>
    </tr>
  </thead>
  {renderProveedores()}
</table>
    )
};

export default Proveedores;