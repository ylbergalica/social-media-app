import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'

function App() {
  const [res, setRes] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:5000");
      return await res.json();
    }

    getData().then(result => {
      setRes(result)
    })
  }, [])

  return (
    <div>
      Hello
      {res?.data}
    </div>
  );
}

export default App;
