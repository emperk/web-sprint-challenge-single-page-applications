// import React from "react";

// const App = () => {
//   return (
//     <>
//       <h1>Lambda Eats</h1>
//       <p>You can remove this code and create your own header</p>
//     </>
//   );
// };
// export default App;

import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

// import components for different routes

// import data

function fetchStock() {
  return Promise.resolve({ success: true, data })
}

export default function App(props) {
  const [stock, setStock] = useState([])

  useEffect(() => {
    fetchStock().then(res => setStock(res.data))
  }, [])

  return (
    <div className='App'>
      <nav>
        <h1>Lambda Eats</h1>
        <div className='nav-links'>
          /* LINKS GO HERE */
        </div>
      </nav>

      <Switch>
        /* ROUTES GO HERE */
      </Switch>
    </div>
  )
}
