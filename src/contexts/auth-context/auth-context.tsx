import React from 'react';

import { User } from '../../types/user/user.types';
import { IAuthContext } from './auth-context.types';

const AuthContext = React.createContext<IAuthContext>({
  user: undefined,
  setUser(user: User): void {},
  fetchUser(): void {},
});

export default AuthContext;
