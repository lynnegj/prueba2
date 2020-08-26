import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Producto from './Producto';

import axiosClient from '../../config/axiosClient';

const Productos = () => {
    // componets state
    const [products, setProductos] = useState([]);

    const renderProductos = () => (
        <tbody>
            {products.map((producto, index) =>(
                <Producto 
                  key={index}
                  index={index}
                  id={producto._id}
                  sku={producto.sku}
                  name={producto.name}
                  description={producto.description}
                  price={producto.price}
                  stock={producto.stock}
                  image={producto.image}
                  onDelete={handleDeleteProduct}
                />
            ))}
        </tbody>
    );

    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "¡Un producto no se puede recuperar!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!'
          }).then((result) => {
            if (result.value) {
                deleteProduct(id);
            }
        });
    };
    const deleteProduct = (id) => {
        axiosClient.delete(`/products/${id}`)
        .then(res => {
            if(res.status !== 200 ) {
                Swal.fire(
                    'Eliminar Producto',
                    'Error al eliminar el producto',
                    'error'
                );
            } else {
                Swal.fire(
                    'Eliminar producto',
                    res.data.message,
                    'success'
                );
                getProductos();
            }
        });
    };
    // lllamada a la api
    const getProductos = () => {
        axiosClient.get('/products')
        .then(res => {
            // actualizar state
            console.log(res.data);

            setProductos(res.data);
        });
    };

    useEffect(() => {
        getProductos();
    }, []);

    return (
        <table className="table table-striped">
        <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Producto</th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Sku</th>
                <th scope="col">Descripción</th>
                <th scope="col">Stock</th>
                <th>
                <Link to="/productos/nuevo" 
                className="btn btn-info mr-1"
                role="button"
                aria-pressed="true"
            >
                Nuevo Producto
            </Link>
                </th>
            </tr>
        </thead>
      {renderProductos()}
     </table>
    );
};

export default Productos;