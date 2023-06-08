import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import axiosInstance from '../../../api/api-client';
import useAsync from '../../../hooks/use-async';
import ilustration from './boy-with-rocket-light.png';
import './email-verification.css';

const EmailVerification = () => {
  const [values, setValues] = useState<{ name?: string | null; email?: string | null }>();
  const navigate = useNavigate();
  const params = useParams<{ token?: string }>();
  const verifyApi = useAsync<boolean>(() => axiosInstance.put(`/users/verify/${params.token}`), { skip: true });

  useEffect(() => {
    async function verify() {
      if (params.token) {
        const response = await verifyApi.fetch(params.token);
        if (response?.data) {
          setTimeout(() => {
            navigate('/login');
          }, 5000);
        } else {
          navigate('/not-found');
        }
      }
    }
    verify();
  }, []);

  useEffect(() => {
    if (!params.token) {
      const queryParams = new URLSearchParams(document.location.search);
      try {
        setValues({
          name: queryParams.get('name'),
          email: queryParams.get('email'),
        });
      } catch (e) {
        navigate('/not-found');
      }
    }
  }, []);

  if (params.token) {
    const title = verifyApi.loading
      ? 'We are verifying your email'
      : verifyApi.response
      ? 'Success. You will be redirected in few seconds'
      : 'Error while verification. Please try again';
    return (
      <div className="container-xxl container-p-y">
        <div className="misc-wrapper">
          <h2 className="mb-2 mx-2">{title}</h2>
          <p className="mb-4 mx-2">We're creating something awesome. Please subscribe to get notified when it's ready!</p>
          <Link to={verifyApi.loading ? '/login' : verifyApi.error ? '/register' : '/login'} className="btn btn-primary">
            {verifyApi.loading ? (
              <span className="spinner-border me-1" role="status" aria-hidden="true"></span>
            ) : (
              <div>{verifyApi.error ? 'Go to register' : 'Go to login'}</div>
            )}
          </Link>
          <div className="mt-3">
            <img src={ilustration} alt="page-misc-error-light" width="500" className="img-fluid" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-xxl container-p-y">
      <div className="misc-wrapper">
        <h2 className="mb-2 mx-2">Congratulations {values?.name}</h2>
        <p className="mb-4 mx-2">Check your email .... {values?.email} .... inbox....</p>
        <div className="mt-3">
          <img src={ilustration} alt="page-misc-error-light" width="500" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
