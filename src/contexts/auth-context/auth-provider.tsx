import React, { useCallback, useEffect, useRef } from 'react';

import axiosInstance from '../../api/api-client';
import authHelper from '../../api/auth-helper';
import useAsync from '../../hooks/use-async';
import { User } from '../../types/user/user.types';
import AuthContext from './auth-context';
import { IAuthContext } from './auth-context.types';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const didMount = useRef<boolean>(false);
  const userApi = useAsync<User>(() => axiosInstance.get<User>('/users/me'), { skip: true });
  const [user, setUser] = React.useState<User | undefined>();

  const fetchUser = useCallback(async () => {
    const accessToken = authHelper.getAccessToken();
    if (accessToken) {
      const response = await userApi.fetch();
      const tokenData = authHelper.decrypt(accessToken);
      if (response?.data && tokenData) {
        setUser({
          ambassadorId: tokenData.ambassadorId,
          companyId: tokenData.companyId,
          countryId: tokenData.countryId,
          id: tokenData.id,
          phoneNumber: tokenData.phoneNumber,
          type: tokenData.type,
          name: response.data.name,
          email: response.data.email,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      fetchUser();
    }
  }, []);

  const value: IAuthContext = React.useMemo(() => {
    return {
      user,
      setUser,
      fetchUser,
    };
  }, [fetchUser, user]);

  return <AuthContext.Provider value={value}>{userApi.loading ? 'Loading....' : children}</AuthContext.Provider>;
};

export default AuthProvider;
