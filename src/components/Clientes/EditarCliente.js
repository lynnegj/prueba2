import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import axiosClient from '../../config/axiosClient';

const EditarCliente = (props) => {
    // component state
    // localhost:3000/clientes/id
    const { id } = props.match.params;
    const [cliente, setCliente] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        setCliente({
            ...cliente, // copia del cliente actual
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // guardar cliente
        guardarCliente();
    };

    const guardarCliente = () => {
        axiosClient.put(`/customers/${id}`, cliente)
        .then(res => {
            console.log(res);

            if(res.data.code === 11000){
                Swal.fire(
                    'Editar Cliente',
                    `Ya existe un cliente con el email: ${cliente.email}`,
                    'error'
                );
            } else {
                Swal.fire(
                    'Editar Cliente',
                    res.data.message,
                    'success'
                );
                props.history.push('/clientes');
            }  
        });
    };


    useEffect(() => {
        const getCliente = () => {
            axiosClient.get(`/customers/${id}`)
            .then(res => {
                if(res.data.name) {
                    setCliente(res.data);
                } else {
                    alert('No se ha encontrado el cliente');
                }
            });

        };

        getCliente();
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
                    defaultValue={cliente.name}
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
                    defaultValue={cliente.lastname}
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
                    defaultValue={cliente.email}
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
                    defaultValue={cliente.phone}
                    onChange={handleChange}
                    required
                />
            </div>
            <button
                type="submit"
                className=" btn btn-primary"

            >Guardar Cliente</button>

        </form>
    );


};

export default withRouter(EditarCliente);