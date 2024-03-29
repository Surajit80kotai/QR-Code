import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
import Index from './pages/Index';
import ProtectedOne from './routes/Private/ProtectedOne';
import { Provider } from 'react-redux';
import { Store } from './services/store/Store';
import { Toaster } from 'react-hot-toast';
import UserFeedbackForm from './pages/others/UserFeedbackForm';
import ThankYou from './pages/others/ThankYou';
import Expired from './pages/others/Expired';
import CongratsPage from './pages/others/CongratsPage';
import ParticipationThankYou from './pages/others/ParticipationThankYou';
import AccessError from './pages/others/AccessError';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <Router>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route element={<ProtectedOne />}>
          <Route path='*' element={<App />} />
        </Route>
        <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/fd/:uuid?`} element={<UserFeedbackForm />} />
        <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/congrats/:uuid?`} element={<CongratsPage />} />
        <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/thankyou`} element={<ThankYou />} />
        <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/participation/thankyou`} element={<ParticipationThankYou />} />
        <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/expired`} element={<Expired />} />
        <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/admin/login`} element={<Login />} />
        {/* <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/admin/register`} element={<Register />} /> */}
        <Route path={`${process.env.REACT_APP_BASE_URL_PREFIX}/access/error`} element={<AccessError />} />
      </Routes>
    </Router>
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={10}
    />
  </Provider>
);
reportWebVitals();
