import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import axiosClient from '../../config/axiosClient';


const AgregarProducto = (props) => {
    const [producto, setProducto] = useState({
        name: '',
        price: '',
        sku: '',
        description: '',
        stock: '',
        image: ''
    });

    const handleChange = (e) => {
        setProducto({
            ...producto, // copia del producto actual
            [e.target.name]: e.target.value
        });
    };

    const handleImage = (e) => {
        setProducto({
            ...producto,
            image: e.target.files[0]
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', producto.name);
        formData.append('price', producto.price);
        formData.append('description', producto.description);
        formData.append('sku', producto.sku);
        formData.append('stock', producto.stock);
        formData.append('image', producto.image);

        guardarProducto(formData);
    };

    const guardarProducto = formData => {
        axiosClient.post('/products', formData)
        .then(res => {
            if(res.status !== 200) {
                Swal.fire(
                    'Agregar Producto',
                    'Error al agregar el producto',
                    'error'
                );
            } else {
                Swal.fire(
                    'Agregar producto',
                    res.data.message,
                    'success'
                );

                // redireccionar a productos
                props.history.push('/productos');
            }
        });
    };

    const canSave = () => {
        const { name, price } = producto;
        return !name.length || !(price && price >= 0);
    };

    return (
        <Fragment>
            <h2>Nuevo Producto</h2>
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
                            defaultValue={producto.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Precio:</label>
                        <input
                            type="number"
                            step="1"
                            min="0"
                            className="form-control"
                            name="price"
                            placeholder="Ingresar Precio"
                            defaultValue={producto.precio}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sku">Sku:</label>
                        <input
                            type="texto"
                            className="form-control"
                            name="sku"
                            placeholder="Ingresar sku"
                            defaultValue={producto.sku}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descripcion:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            placeholder="Ingresar descripcion"
                            defaultValue={producto.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock">Stock:</label>
                        <input
                            type="number"
                            step="1"
                            min="0"
                            className="form-control"
                            name="price"
                            placeholder="Ingresar stock"
                            defaultValue={producto.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Imagen:</label>
                        <input
                            type="file"
                            name="description"
                            className="form-control"
                            onChange={handleImage}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className=" btn btn-primary"
                        disabled={canSave()}
                    >Guardar Producto</button>



                </form>
        </Fragment>
    );
};

export default withRouter(AgregarProducto);