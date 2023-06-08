import React from 'react';

import AuthContext from './auth-context';
import { IAuthContext } from './auth-context.types';

const useAuth = (): IAuthContext => {
  const authContext = React.useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};

export default useAuth;
