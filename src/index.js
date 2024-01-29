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
import { Toaster } from 'react-hot-toast';
import Landing from './pages/others/Landing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <Router>
      <Routes>
        {/* <Route element={<ProtectedOne />}> */}
        <Route path='*' element={<App />} />
        <Route path='/' element={<Index />} />
        <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}`} element={<Landing />} />
        {/* </Route> */}
        <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/admin/login`} element={<Login />} />
        <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/admin/register`} element={<Register />} />
      </Routes>
    </Router>
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={100}
    />
  </Provider>
);
reportWebVitals();
