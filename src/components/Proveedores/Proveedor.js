import React from 'react';
import { Link } from 'react-router-dom';

const Proveedor = ({ index, id, name, lastname, company, address, phone, email, onDelete }) => (
    <tr>
        <th scope="row">{index +1}</th>
        <td>{`${name} ${lastname}`}</td>
        <td>{company}</td>
        <td>{address}</td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>
            <Link to={`/proveedores/${id}/editar`} 
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

export default Proveedor;
