import { AxiosResponse } from 'axios';
import { Form, Formik } from 'formik';
import qs from 'qs';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import axiosInstance from '../../../api/api-client';
import { getCountries } from '../../../api/common';
import Button from '../../../components/button';
import CheckboxField from '../../../components/form/checkbox-field';
import SelectField from '../../../components/form/select-field';
import TextField from '../../../components/form/text-field';
import useAsync from '../../../hooks/use-async';
import ilustration from './girl-with-laptop-light.png';

interface RegisterFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  country?: {
    id: number;
    name: string;
    countryCode: string;
    phoneCode: string;
  };
  password: string;
  repassword: string;
  agree?: boolean;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  countryId: string;
}
function Register() {
  const navigate = useNavigate();
  const registerApi = useAsync((values: RegisterPayload) => axiosInstance.post('/users', values), { skip: true });
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
            <h4 className="mb-2">Adventure starts here 🚀</h4>
            <p className="mb-4">Make your app management easy and fun!</p>

            <Formik<RegisterFormValues>
              initialValues={{
                name: '',
                email: '',
                password: '',
                repassword: '',
                phoneNumber: '',
                country: undefined,
                agree: undefined,
              }}
              validationSchema={Yup.object({
                email: Yup.string().label('Email').required().email('Invalid email address'),
                password: Yup.string().label('Password').required(),
                repassword: Yup.string()
                  .label('Password')
                  .required()
                  .oneOf([Yup.ref('password')], 'Passwords must match'),
                country: Yup.object().label('Country').required(),
                phoneNumber: Yup.string().label('Phone number').required(),
                agree: Yup.boolean().label('Privacy policy and terms').oneOf([true], 'You have to accept privacy policy and terms'),
              })}
              onSubmit={async (values, actions) => {
                const payload = {
                  ...values,
                  countryId: values.country?.id,
                  country: undefined,
                };

                const response = await registerApi.fetch(payload);
                if (response?.data) {
                  const params = new URLSearchParams();
                  params.append('name', values.name);
                  params.append('email', values.email);
                  navigate(`/users/verification/?${params.toString()}`);
                } else {
                  // alert(JSON.stringify(values, null, 2));
                  actions.setFieldError('email', 'Email already exists');
                }
              }}
            >
              {({ values, errors, handleSubmit }) => {
                const phoneCode = values.country?.phoneCode || '';
                return (
                  <Form className="mb-3" onSubmit={handleSubmit}>
                    <TextField id="name" name="name" label="Full name" placeholder="Enter your full name" />
                    <TextField id="email" name="email" label="Email" placeholder="Enter your email" />
                    <SelectField
                      name="country"
                      label="Country"
                      valueMapper={country => country}
                      remoteOptions={async () => {
                        const data = await getCountries();
                        return data.map(obj => ({
                          label: obj.name,
                          value: obj,
                        }));
                      }}
                    />
                    <TextField
                      id="phoneNUmber"
                      name="phoneNumber"
                      label="Phone Number"
                      placeholder={`${values.country?.phoneCode || '+381'}12345678`}
                      maskConfig={{ mask: `${phoneCode}00000000`, lazy: false }}
                      disabled={!values.country}
                    />
                    <TextField id="password" name="password" label="Password" placeholder="············" type="password" />
                    <TextField id="repassword" name="repassword" label="Confirm password" placeholder="············" type="password" />
                    <CheckboxField name="agree" label="I agree to privacy policy and terms" />
                    <Button loading={registerApi.loading} disabled={!values.agree || registerApi.loading} block type="submit">
                      Sign in
                    </Button>
                  </Form>
                );
              }}
            </Formik>

            <p className="text-center">
              <span>Already have an account?</span>
              <Link to="/login">
                <span>Sign in</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
