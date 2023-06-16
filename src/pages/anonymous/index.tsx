import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '../common/not-found';
import PrivacyPolicy from '../common/privacy-policy';
import TermsAndCondition from '../common/terms-and-condition';
import './authentication-wrapper.css';
import EmailVerification from './email-verification';
import ForgotPassword from './forgot-password/forgot-password';
import Login from './login/login';
import Register from './register/register';
import ResetPassword from './reset-password/reset-password';

const Anonymous: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users/verification/:token?" element={<EmailVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/users/update-password/:code" element={<ResetPassword />} />
      <Route path="/terms-and-condition" element={<TermsAndCondition />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      {/*<Route path="*" element={<Navigate to="/" replace />} />*/}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Anonymous;
