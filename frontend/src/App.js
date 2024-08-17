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
      Hello
    </div>
  );
}

export default App;
