import "./App.css";
import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Dashboard from './pages/UserDashboard/Dashboard';
import BankTransfer from './pages/UserDashboard/BankTransfer';
import CashOut from './pages/UserDashboard/CashOut';
import Deposit from './pages/UserDashboard/Deposit';
import Login from './pages/Auth/Login';
import { Toaster } from 'react-hot-toast';
import CreateUser from './pages/AdminDashboard/CreateUser';
import AllUser from './pages/AdminDashboard/AllUser';
import EditUser from './pages/AdminDashboard/EditUser';
import VatToken from './pages/AdminDashboard/VatToken';

// Import pages

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        {/* User layout */}
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/send-money" element={<Dashboard />} />
        <Route exact path="/bank-transfer" element={<BankTransfer />} />
        <Route exact path="/cash-out" element={<CashOut />} />
        <Route exact path="/payment" element={<Dashboard />} />
        <Route exact path="/deposit" element={<Deposit />} />

        {/* Admin Layout */}
        <Route exact path="/admin/create-user" element={<CreateUser />} />
        <Route exact path="/admin/user-list" element={<AllUser />} />
        <Route exact path="/admin/user-list/:uuid" element={<EditUser />} />
        <Route exact path="/admin/vat-token" element={<VatToken />} />

        {/* Auth */}
        <Route exact path="/auth/login" element={<Login />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
