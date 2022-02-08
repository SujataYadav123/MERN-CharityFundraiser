import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import { SignIn, Register } from './components/system';
import './App.css';
import Fundraiser from './components/BodyComponent/Dashboard/Fundraiser';
import Cards from './components/BodyComponent/Dashboard/Cards';
import DirectDonate from './components/BodyComponent/Dashboard/DirectDonate';
import Dashboards from './components/BodyComponent/Dashboard/Dashboards';
import ChangePassword from './components/Header/ChangePassword';

// import Dashboard from './components/pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/fundraiser" element={<Fundraiser />} />
        <Route exact path="/cards" element={<Cards />} />
        <Route exact path="/directdonate" element={<DirectDonate />} />
        <Route exact path="/change_password" element={<ChangePassword />} />

        <Route exact path="/dashboard" element={<Dashboards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//<Route exact path="/" element={<SignIn />} />
//<Route exact path="/dashboard" element={<Dashboards />} />
