import React, {useState} from 'react';
import{ withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import axiosClient from '../../config/axiosClient';

const AgregarProveedor = (props) => {
    //componente state 
    const [ proveedor, setProveedor] = useState({
        name: '',
        lastname: '',
        company: '',
        adrress: '',
        phone: '',
        email: '',
    });

    const handleChange = (e) => {
        setProveedor({
            ...proveedor, //copia del proveedor actual
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //guardar proveedor
        guardarProveedor();
    };

    const guardarProveedor = () => {
        axiosClient.post('/providers', proveedor)
        .then(res => {
            console.log(res);
            if (res.data.code === 11000) {
                Swal.fire(
                    'Agregar Proveedor',
                    `Ya existe un proveedor con el email: ${proveedor.email}`,
                    'error'
                  );
            } else {
                Swal.fire(
                    'Agregar Proveedor',
                    res.data.message,
                    'success'
                );
                props.history.push('/proveedores');
            }
        });
    };
    return (
        <form
        onSubmit={handleSubmit}
        >
            <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Ingresar Nombre"
                defaultValue={proveedor.name}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="lastname">Apellidos:</label>
                <input
                type="text"
                className="form-control"
                name="lastname"
                placeholder="Ingresar Apellidos"
                defaultValue={proveedor.lastname}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="company">Compañia:</label>
                <input
                type="text"
                className="form-control"
                name="company"
                placeholder="Ingresar compañia"
                defaultValue={proveedor.phone}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="address">Direccion:</label>
                <input
                type="text"
                className="form-control"
                name="address"
                placeholder="Ingresar direccion"
                defaultValue={proveedor.address}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">Telefono:</label>
                <input
                type="text"
                className="form-control"
                name="phone"
                placeholder="Ingresar telefono"
                defaultValue={proveedor.phone}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">email:</label>
                <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Ingresar email"
                defaultValue={proveedor.email}
                onChange={handleChange}
                required
                />
            </div>

            

            <button
            type="submit"
            className="btn-primary"
            >Guardar Proveedor</button>
        </form>
    );
};

export default withRouter(AgregarProveedor);