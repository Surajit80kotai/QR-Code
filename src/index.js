import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Index from './pages/Index';
// import ProtectedOne from './routes/Private/ProtectedOne';
import { Provider } from 'react-redux';
import { Store } from './services/store/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <Router>
      <Routes>
        {/* <Route element={<ProtectedOne />}> */}
        <Route path='*' element={<App />} />
        <Route path='/' element={<Index />} />
        {/* </Route> */}
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin/register' element={<Register />} />
      </Routes>
    </Router>
  </Provider>
);
reportWebVitals();
