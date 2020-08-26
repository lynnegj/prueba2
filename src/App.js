import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './layout/Navbar';
import Routes from './Routes';

function App() {
  return (
    <Router>
   <div className='container-fluid'>
     <Navbar/>
     <Routes />
   </div>
   </Router>
  );
}

export default App;
