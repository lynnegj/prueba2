import React, {useState} from 'react';
import{ withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import axiosClient from '../../config/axiosClient';

const AgregarCliente = (props) => {
    //componente state 
    const [ cliente, setCliente] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
    });

    const handleChange = (e) => {
        setCliente({
            ...cliente, //copia del cliente actual
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //guardar cliente
        guardarCliente();
    };

    const guardarCliente = () => {
        axiosClient.post('/customers', cliente)
        .then(res => {
            console.log(res);
            if (res.data.code === 11000) {
                Swal.fire(
                    'Agregar Cliente',
                    `Ya existe un cliente con el email: ${cliente.email}`,
                    'error'
                  );
            } else {
                Swal.fire(
                    'Agregar Cliente',
                    res.data.message,
                    'success'
                );
                props.history.push('/clientes');
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
                defaultValue={cliente.name}
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
                defaultValue={cliente.lastname}
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
                defaultValue={cliente.email}
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
                defaultValue={cliente.phone}
                onChange={handleChange}
                required
                />
            </div>

            <button
            type="submit"
            className="btn-primary"
            >Guardar cliente</button>
        </form>
    );
};

export default withRouter(AgregarCliente);