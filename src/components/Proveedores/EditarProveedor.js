import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import axiosClient from '../../config/axiosClient';

const EditarProveedor = (props) => {
    // component state
    // localhost:3000/proveedores/id
    const { id } = props.match.params;
    const [proveedor, setProveedor] = useState({
        name: '',
        lastname: '',
        company: '',
        addres: '',
        phone: '',
        email: ''
    });

    const handleChange = (e) => {
        setProveedor({
            ...proveedor, // copia del proveedor actual
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // guardar proveedor
        guardarProveedor();
    };

    const guardarProveedor = () => {
        axiosClient.put(`/providers/${id}`, proveedor)
        .then(res => {
            console.log(res);

            if(res.data.code === 11000){
                Swal.fire(
                    'Editar Proveedor',
                    `Ya existe un proveedor con el email: ${proveedor.email}`,
                    'error'
                );
            } else {
                Swal.fire(
                    'Editar Proveedor',
                    res.data.message,
                    'success'
                );
                props.history.push('/proveedores');
            }  
        });
    };


    useEffect(() => {
        const getProveedor = () => {
            axiosClient.get(`/providers/${id}`)
            .then(res => {
                if(res.data.name) {
                    setProveedor(res.data);
                } else {
                    alert('No se ha encontrado el Proveedor');
                }
            });

        };

        getProveedor();
    }, [id]);

    return (
        <form 
            onSubmit={handleSubmit}
        >
            <div className="form-group">
                <label htmlFor="form-group">Nombre:</label>
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
                <label htmlFor="form-group">Apellidos:</label>
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
                <label htmlFor="form-group">Compañia:</label>
                <input
                    type="text"
                    className="form-control"
                    name="company"
                    placeholder="Ingresar Compañia"
                    defaultValue={proveedor.company}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="form-group">Direccion:</label>
                <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Ingresar Direccion"
                    defaultValue={proveedor.address}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="form-group">Teléfono:</label>
                <input
                    type="phone"
                    className="form-control"
                    name="phone"
                    placeholder="Ingresar Teléfono"
                    defaultValue={proveedor.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="form-group">Email:</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Ingresar Email"
                    defaultValue={proveedor.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <button
                type="submit"
                className=" btn btn-primary"

            >Guardar Proveedor</button>

        </form>
    );


};

export default withRouter(EditarProveedor);