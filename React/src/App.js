import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Tweets from './Tweets';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="App">
      <BrowserRouter>
        <NavLink activeClassName="active" className="links" to="/tweets">
          Tweets
        </NavLink>
        <Routes>
          <Route path="/tweets" element={<Tweets />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
