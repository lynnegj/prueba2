import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <NavLink className="navbar-brand" to="/">Globeria Monse</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <NavLink className="nav-item nav-link" to="/clientes">Clientes</NavLink>
      <NavLink className="nav-item nav-link" to="/productos">Productos</NavLink>
      <NavLink className="nav-item nav-link" to="/proveedores">Proveedores</NavLink>
    </div>
  </div>
</nav>
);

export default Navbar;