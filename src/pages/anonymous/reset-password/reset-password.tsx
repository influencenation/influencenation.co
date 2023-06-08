import { Form, Formik } from 'formik';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import axiosInstance from '../../../api/api-client';
import Button from '../../../components/button';
import TextField from '../../../components/form/text-field';
import useAsync from '../../../hooks/use-async';
import ilustration from './boy-with-laptop-light.png';

interface ResetPasswordFormValues {
  password: string;
  repassword: string;
}

interface ResetPasswordPayload {
  code: string;
  password: string;
}
function ResetPassword() {
  const params = useParams<{ code: string }>();
  const resetPassword = useAsync((values: ResetPasswordPayload) => axiosInstance.put('/users/update-password', values), { skip: true });

  if (resetPassword.response) {
    return (
      <div className="container-xxl container-p-y">
        <div className="misc-wrapper">
          <h2 className="mb-2 mx-2">Success. New password set.</h2>
          <p className="mb-4 mx-2">Go to login page and login with your new password</p>
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
            <h4 className="mb-2">Reset Password 🔒</h4>
            <p className="mb-4">Enter your new password</p>
            <Formik<ResetPasswordFormValues>
              initialValues={{
                password: '',
                repassword: '',
              }}
              validationSchema={Yup.object({
                password: Yup.string().label('Password').required(),
                repassword: Yup.string()
                  .label('Password')
                  .required()
                  .oneOf([Yup.ref('password')], 'Passwords must match'),
              })}
              onSubmit={(values, actions) => {
                resetPassword.fetch({ code: params.code as string, password: values.password });
              }}
            >
              {({ handleSubmit }) => {
                console.log(resetPassword.error);
                return (
                  <Form className="mb-3" onSubmit={handleSubmit}>
                    {resetPassword.error && (
                      <div className="alert alert-danger" role="alert">
                        {resetPassword.error}
                      </div>
                    )}
                    <TextField id="password" name="password" label="Password" placeholder="············" type="password" />
                    <TextField id="repassword" name="repassword" label="Confirm password" placeholder="············" type="password" />
                    <Button loading={resetPassword.loading} disabled={resetPassword.loading} block type="submit">
                      Set new password
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

export default ResetPassword;
