import { Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import axiosInstance from '../../../api/api-client';
import Button from '../../../components/button';
import TextField from '../../../components/form/text-field';
import useAsync from '../../../hooks/use-async';
import ilustration from './girl-unlock-password-light.png';

interface ForgotPasswordPayload {
  email: string;
}
function ForgotPassword() {
  const forgotPassword = useAsync((values: ForgotPasswordPayload) => axiosInstance.put('/users/forgot-password', values), { skip: true });

  if (forgotPassword.response) {
    return (
      <div className="container-xxl container-p-y">
        <div className="misc-wrapper">
          <h2 className="mb-2 mx-2">Reset link sent.</h2>
          <p className="mb-4 mx-2">Reset link sent to your email address</p>
          <Link to="/login" className="btn btn-primary">
            Go to login
          </Link>
          <div className="mt-3">
            <img src={ilustration} alt="page-misc-error-light" width="500" className="img-fluid" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="authentication-wrapper authentication-cover">
      <div className="authentication-inner row m-0">
        <div className="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5">
          <div className="w-100 d-flex justify-content-center">
            <img src={ilustration} className="img-fluid" alt="Login" width="700" />
          </div>
        </div>

        <div className="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-5 p-4">
          <div className="w-px-400 mx-auto">
            <div className="app-brand mb-5">
              <div className="app-brand-link">
                <span className="app-brand-logo demo"></span>
                <span className="app-brand-text demo text-body fw-bolder">Sneat</span>
              </div>
            </div>
            <h4 className="mb-2">Forgot Your Password? 🔒</h4>
            <p className="mb-4">Don't worry, we've got you covered. Enter your email address below, and we'll send you a link to reset your password.</p>

            <Formik<ForgotPasswordPayload>
              initialValues={{
                email: '',
              }}
              validationSchema={Yup.object({
                email: Yup.string().label('Email').required().email('Invalid email address'),
              })}
              onSubmit={async (values, actions) => {
                const response = await forgotPassword.fetch(values);
                if (!response?.data) {
                  actions.setFieldError('email', 'Invalid email address');
                }
              }}
            >
              {({ handleSubmit }) => {
                return (
                  <Form className="mb-3" onSubmit={handleSubmit}>
                    <TextField id="email" name="email" label="Email" placeholder="Enter your email" />
                    <Button loading={forgotPassword.loading} disabled={forgotPassword.loading} block type="submit">
                      Send reset link
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            <div className="text-center">
              <Link to="/login" className="d-flex align-items-center justify-content-center">
                <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
