import { AxiosResponse } from 'axios';
import { Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import axiosInstance from '../../../api/api-client';
import authHelper from '../../../api/auth-helper';
import Button from '../../../components/button';
import CheckboxField from '../../../components/form/checkbox-field';
import TextField from '../../../components/form/text-field';
import useAuth from '../../../contexts/auth-context/use-auth';
import useAsync from '../../../hooks/use-async';
import ilustration from './boy-with-rocket-light.png';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const auth = useAuth();
  const loginApi = useAsync<any>((values: LoginFormValues) => axiosInstance.post<{ accessToken: string; refreshToken: string }>('/auth/access-token', values), {
    skip: true,
  });
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
            <h4 className="mb-2">Welcome to Sneat! 👋</h4>
            <p className="mb-4">Please sign-in to your account and start the adventure</p>
            <Formik
              enableReinitialize
              initialValues={{
                email: 'tkaldzija+12331321@gmail.com',
                password: 'taretare',
              }}
              validationSchema={Yup.object({
                email: Yup.string().label('Email').required().email('Invalid email address'),
                password: Yup.string().label('Password').required(),
              })}
              onSubmit={async (values, actions) => {
                const response = await loginApi.fetch(values);
                if (response?.data) {
                  authHelper.setTokens(response.data);
                  auth.fetchUser();
                } else {
                  actions.setFieldError('email', 'Invalid email address');
                }
              }}
            >
              {({ handleSubmit }) => {
                return (
                  <Form className="mb-3" onSubmit={handleSubmit}>
                    <TextField id="email" name="email" label="Email" placeholder="Enter your email" />
                    <TextField
                      classes={{ group: 'position-relative' }}
                      id="password"
                      name="password"
                      label="Password"
                      placeholder="············"
                      type="password"
                    >
                      <div className="position-absolute top-0 end-0">
                        <Link to="/forgot-password">
                          <small>Forgot password?</small>
                        </Link>
                      </div>
                    </TextField>
                    <CheckboxField name="remember-me" label="Remember me" />
                    <Button loading={loginApi.loading} type="submit" disabled={loginApi.loading}>
                      Sign in
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            <p className="text-center">
              <span>New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
