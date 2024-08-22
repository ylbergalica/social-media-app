import React from 'react';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { Route, Routes } from 'react-router-dom';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Users from './components/Users/Users';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path='/users' element={<PrivateRoute />}>
          <Route path="/users" element={<Users />} />
        </Route>
        <Route path='/profile' element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
