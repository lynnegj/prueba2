import React from 'react';
import { Link } from 'react-router-dom';


const Producto = ({ index, id, sku, name, description, price, stock, image, onDelete }) => (
    <tr>
        <th scope="row" className="align-middle">{index +1}</th>
        <td className="w-25 align-middle">
            {image && <img className="w-50" src={`http://localhost:5000/${image}`} alt={name} />} 
        </td>
        <td className="align-middle">{name}</td>
        <td className="align-middle">${price}</td>
        <td className="align-middle">{sku}</td>
        <td className="align-middle">{description}</td>
        <td className="align-middle">{stock}</td>
        <td className="align-middle">
            <Link to={`/productos/${id}/editar`} 
                className="btn btn-success mr-1"
                role="button"
                aria-pressed="true"
            >
                Editar 
            </Link>
            <button
            type="button"
            className="btn btn-danger"
            onClick={() => {onDelete(id); }}
            >
                Eliminar
            </button>
            </td>
    </tr>
);

export default Producto