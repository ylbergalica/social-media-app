import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'

import axios from 'axios';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { Route, Routes } from 'react-router-dom';

import Login from './components/Login/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<PrivateRoute />}>
          <Route path="/" element={<></>} />
        </Route>
        <Route path='/users' element={<PrivateRoute />}>
          <Route path="/users" element={<></>} />
        </Route>
        <Route path='/profile' element={<PrivateRoute />}>
          <Route path="/profile" element={<></>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
