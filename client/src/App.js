import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/index';


function App() {
  const [readyRender, setReadyRender] = useState(false);


  return (
    <>
      { readyRender === true && (

        <div>
          <Router>
            <Route exact path="/" component={Home} />
          </Router>
        </div>

      )}

        <div>
          <p style={{textAlign: "center"}}>Loading...</p>
        </div>
      
    </>
  );
}

export default App;
