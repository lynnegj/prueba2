import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import axiosClient from '../../config/axiosClient';


const EditarProducto = (props) => {
    const { id } = props.match.params;
    const [producto, setProducto] = useState({
        name: '',
        price: null,
        sku: null,
        description: '',
        stock: null,
        image: null
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
        formData.append('sku', producto.sku);
        formData.append('description', producto.description);
        formData.append('stock', producto.stock);
        formData.append('image', producto.image);

        guardarProducto(formData);
    };

    const guardarProducto = formData => {
        axiosClient.put(`/products/${producto._id}`, formData)
        .then(res => {
            if(res.status !== 200) {
                Swal.fire(
                    'Actualizar Producto',
                    'Error al actualizar el producto',
                    'error'
                );
            } else {
                Swal.fire(
                    'Actualizar producto',
                    res.data.message,
                    'success'
                );

                // redireccionar a productos
                props.history.push('/productos');
            }
        });
    };

    const canSave = () => {
        const { name,  price } = producto;
        return !name.length || !(price && price >= 0)
    };

    useEffect(() => {
        const getProducto = () => {
            axiosClient.get(`/products/${id}`)
            .then(res => {
                if (res.data.name) {
                    setProducto(res.data);
                } else {
                    Swal.fire(
                        'Editar Producto',
                        'No se ha encontrado el producto',
                        'error'
                    );
                }
            });
        };

        getProducto();
    }, [id]);

    return (
        <Fragment>
            <h2>Editar Producto</h2>
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
                            defaultValue={producto.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sku">Sku:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="sku"
                            placeholder="Ingresar sku"
                            defaultValue={producto.sku}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descripción:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            placeholder="Ingresar descripción"
                            defaultValue={producto.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock">Stock:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="stock"
                            placeholder="Ingresar stock"
                            defaultValue={producto.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            {producto.image && typeof producto.image === 'string' &&
                                <img 
                                className="w-75" 
                                src={`http://localhost:5000/${producto.image}`}
                                alt={producto.name}
                                />
                            }
                            </div>  
                            <div className="col-md-9">
                            <div className="form-group">
                                <label htmlFor="image">Imagen:</label>
                                <input
                                    type="file"
                                    name="image"
                                    className="form-control"
                                    onChange={handleImage}
                                />
                            </div>
                            
                        </div>

                    </div>
                    <button
                        type="submit"
                        className=" btn btn-primary"
                        disabled={canSave()}
                    >Actualizar Producto</button>
                </form>
        </Fragment>
    );
};

export default withRouter(EditarProducto);