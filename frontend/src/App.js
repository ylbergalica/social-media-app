import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'

import axios from 'axios';

function App() {
  const [res, setRes] = useState();

  useEffect(() => {
    const getData = async () => {
      return await axios.get('http://localhost:5000/api/posts');
    }

    getData().then(result => {
      setRes(result)
      console.log(result.data)
    })
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
