import React from 'react';
import{ Route, Switch } from 'react-router-dom';

import Clientes from './components/Clientes';
import AgregarCliente from './components/Clientes/AgregarCliente';
import EditarCliente from './components/Clientes/EditarCliente';

import Productos from './components/Productos';
import AgregarProducto from './components/Productos/AgregarProducto';
import EditarProducto from './components/Productos/EditarProducto';

import Proveedores from './components/Proveedores';
import AgregarProveedor from './components/Proveedores/AgregarProveedor';
import EditarProveedor from './components/Proveedores/EditarProveedor';



const Routes = () => (
    <Switch>
        <Route exact path="/" component={Clientes} />
        <Route exact path="/clientes" component={Clientes} />
        <Route exact path="/clientes/nuevo" component={AgregarCliente} />
        <Route exact path="/clientes/:id/editar" component={EditarCliente} />

        <Route exact path="/productos" component={Productos} />
        <Route exact path="/productos/nuevo" component={AgregarProducto} />
        <Route exact path="/productos/:id/editar" component={EditarProducto} />

        <Route exact path="/proveedores" component={Proveedores} />
        <Route exact path="/proveedores/nuevo" component={AgregarProveedor} />
        <Route exact path="/proveedores/:id/editar" component={EditarProveedor} />

    </Switch>
);

export default Routes;